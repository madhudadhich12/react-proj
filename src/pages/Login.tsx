import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

// Shape of the login form data managed in component state
type LoginForm = {
  email: string;
  password: string;
};

// Login page component
// - Manages local form state (email/password)
// - Calls `loginUser` from auth store when the form is submitted
// - Navigates to `/todos` on successful login, and shows an error message on failure
export default function Login() {
  // auth helper from store provides `loginUser` (performs authentication)
  const loginUser = useAuthStore((s) => s.loginUser);
  // router navigation helper
  const navigate = useNavigate();

  // Local form state
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  // Error message to display when login fails
  const [err, setErr] = useState<string>("");

  // Form submit handler: prevent default, attempt login, then navigate or set error.
  // Note: current `loginUser` is used directly (keeps existing synchronous/throwing behavior).
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Attempt to log in with provided credentials
      // (preserves current behavior: if `loginUser` throws, we catch and display the error)
      loginUser(form.email, form.password);
      // On success, go to the todos page
      navigate("/todos");
    } catch (error) {
      // If an Error was thrown, show its message; otherwise, show a generic message
      setErr(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-3">Login</h2>

      <form onSubmit={submit} className="space-y-3">
        {/* Show login error (if any) */}
        {err && <p className="text-red-500">{err}</p>}

        {/* Email input — updates `form.email` on change */}
        <input
          className="border p-2 w-full"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password input — updates `form.password` on change */}
        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Submit button — triggers `onSubmit` above */}
        <button className="bg-blue-600 text-white px-3 py-2 rounded w-full">
          Login
        </button>
      </form>

      {/* Link-style button to go to the signup page */}
      <button
        className="text-blue-600 mt-3"
        onClick={() => navigate("/signup")}
      >
        Create an account
      </button>

      <button
        className="bg-green-600 text-white px-3 py-2"
        onClick={() => navigate("/dummy")}>
          Dummy
      </button>
    </div>
  );
}
