import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { isValidEmail } from "../utils/validation";

// Shape of the signup form data managed in component state
type SignupForm = {
  name: string;
  email: string;
  password: string;
};


export default function Signup() {
  // Auth store helper used to register a new user
  const signupUser = useAuthStore((s) => s.signupUser);
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

    if (!isValidEmail(form.email)) {
      setErr("Please enter a valid email address");
      return;
    }

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us to start managing your tasks
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 space-y-6">
          {/* Show signup error (if any) */}
          {err && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-sm text-red-700">
              <p>{err}</p>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            {/* Name input */}
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Email input */}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email" // Changed from implicit text to email for validation
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}
