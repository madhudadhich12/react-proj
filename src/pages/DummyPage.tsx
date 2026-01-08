import { useState } from "react";

type User = { id: number; name: string };
type Post = { id: number; title: string };

const Card = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="border rounded-xl p-4 shadow-sm bg-white space-y-2">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
    <div className="pt-2">{children}</div>
  </div>
);

const fetchJson = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

export default function DummyPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [settledResult, setSettledResult] = useState("");
  const [raceResult, setRaceResult] = useState("");
  const [anyResult, setAnyResult] = useState("");

  const [loadingAll, setLoadingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const btn =
    "px-3 py-1 text-sm rounded text-white w-full sm:w-auto";

  // 🟢 Reusable compact output box
  const resultBox =
    "mt-2 text-xs bg-gray-100 p-2 rounded max-h-40 overflow-auto whitespace-pre-wrap break-words";

  // --- Promise.all (waits for BOTH) ---
  const loadUsersAndPosts = async () => {
    try {
      setLoadingAll(true);
      setError(null);

      const [u, p] = await Promise.all([
        fetchJson<User[]>("https://jsonplaceholder.typicode.com/users"),
        fetchJson<Post[]>("https://jsonplaceholder.typicode.com/posts"),
      ]);

      setUsers(u);
      setPosts(p);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoadingAll(false);
    }
  };

  // --- Promise.allSettled ---
  const runAllSettled = async () => {
    const results = await Promise.allSettled([
      fetchJson<User>("https://jsonplaceholder.typicode.com/users/1"),
      fetchJson<Post>("https://jsonplaceholder.typicode.com/bad-endpoint"),
    ]);
    setSettledResult(JSON.stringify(results, null, 2));
  };

  // --- Promise.race ---
  const runRace = async () => {
    const winner = await Promise.race([
      fetchJson("https://jsonplaceholder.typicode.com/users/1"),
      fetchJson("https://jsonplaceholder.typicode.com/posts/1"),
    ]);
    setRaceResult(JSON.stringify(winner, null, 2));
  };

  // --- Promise.any ---
  const runAny = async () => {
    const result = await Promise.any([
      fetchJson("https://jsonplaceholder.typicode.com/bad-url"),
      fetchJson("https://jsonplaceholder.typicode.com/posts/1"),
    ]);
    setAnyResult(JSON.stringify(result, null, 2));
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

      {/* Promise.all */}
      <Card
        title="Promise.all"
        description="Runs requests in parallel and waits for BOTH to finish."
      >
        <button
          onClick={loadUsersAndPosts}
          disabled={loadingAll}
          className={`${btn} bg-orange-500`}
        >
          {loadingAll ? "Loading…" : "Load Users + Posts"}
        </button>

        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}

        {(users.length > 0 || posts.length > 0) && (
          <div className="mt-2 text-sm space-y-1">
            <div>Users: {users.length} • Posts: {posts.length}</div>

            {/* small preview instead of huge JSON */}
            <pre className={resultBox}>
              {JSON.stringify(
                {
                  firstUser: users[0]?.name,
                  firstPost: posts[0]?.title,
                },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </Card>

      {/* Promise.allSettled */}
      <Card
        title="Promise.allSettled"
        description="Returns results of ALL promises, even if some fail."
      >
        <button onClick={runAllSettled} className={`${btn} bg-blue-500`}>
          Run allSettled
        </button>

        {settledResult && (
          <pre className={resultBox}>{settledResult}</pre>
        )}
      </Card>

      {/* Promise.race */}
      <Card
        title="Promise.race"
        description="Returns whichever request finishes FIRST."
      >
        <button onClick={runRace} className={`${btn} bg-green-500`}>
          Run race
        </button>

        {raceResult && (
          <pre className={resultBox}>{raceResult}</pre>
        )}
      </Card>

      {/* Promise.any */}
      <Card
        title="Promise.any"
        description="Resolves with the FIRST successful promise."
      >
        <button onClick={runAny} className={`${btn} bg-purple-500`}>
          Run any
        </button>

        {anyResult && (
          <pre className={resultBox}>{anyResult}</pre>
        )}
      </Card>
    </div>
  );
}
