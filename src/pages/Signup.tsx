import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Shape of the signup form data managed in component state
type SignupForm = {
  name: string;
  email: string;
  password: string;
};

// Signup page component
// - Manages local form state (name/email/password)
// - Calls `signupUser` from auth context when the form is submitted
// - Generates a user id with `crypto.randomUUID()` to include in the user object
// - Navigates to `/todos` on successful signup and displays an error message on failure
export default function Signup() {
  // Auth context helper used to register a new user
  const { signupUser } = useAuth();
  // Router navigation helper
  const navigate = useNavigate();

  // Local form state
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });

  // Error message to display when signup fails
  const [err, setErr] = useState<string>("");

  // Form submit handler: prevent default, attempt signup, then navigate or set error.
  // Note: current `signupUser` is used directly (keeps existing synchronous/throwing behavior).
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Attach a generated id to the form payload and call signup
      signupUser({ ...form, id: crypto.randomUUID() });
      // On success, go to the todos page
      navigate("/todos");
    } catch (error) {
      // If an Error was thrown, show its message; otherwise, show a generic message
      setErr(error instanceof Error ? error.message : "Signup failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-3">Signup</h2>

      <form onSubmit={submit} className="space-y-3">
        {/* Show signup error (if any) */}
        {err && <p className="text-red-500">{err}</p>}

        {/* Name input — updates `form.name` on change */}
        <input
          className="border p-2 w-full"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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
        <button className="bg-green-600 text-white px-3 py-2 rounded w-full">
          Create Account
        </button>
      </form>

      {/* Link-style button to go to the login page */}
      <button
        className="text-blue-600 mt-3"
        onClick={() => navigate("/login")}
      >
        Already have an account? Login
      </button>
    </div>
  );
}
