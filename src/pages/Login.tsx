import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [err, setErr] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loginUser(form.email, form.password);
      navigate("/todos");
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-3">Login</h2>

      <form onSubmit={submit} className="space-y-3">
        {err && <p className="text-red-500">{err}</p>}

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

        <button className="bg-blue-600 text-white px-3 py-2 rounded w-full">
          Login
        </button>
      </form>

      <button
        className="text-blue-600 mt-3"
        onClick={() => navigate("/signup")}
      >
        Create an account
      </button>
    </div>
  );
}
