import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export default function Signup() {
  const { signupUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signupUser({ ...form, id: crypto.randomUUID() });
      navigate("/todos");
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Signup failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-3">Signup</h2>

      <form onSubmit={submit} className="space-y-3">
        {err && <p className="text-red-500">{err}</p>}

        <input
          className="border p-2 w-full"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-600 text-white px-3 py-2 rounded w-full">
          Create Account
        </button>
      </form>

      <button
        className="text-blue-600 mt-3"
        onClick={() => navigate("/login")}
      >
        Already have an account? Login
      </button>
    </div>
  );
}
