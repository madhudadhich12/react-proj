import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import MadhuButton from "../components/MadhuButton";
import { isValidEmail } from "../utils/validation";

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

    if (!isValidEmail(form.email)) {
      setErr("Please enter a valid email address");
      return;
    }

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
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-6">
            {/* Show login error (if any) */}
            {err && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-sm text-red-700">
                <p>{err}</p>
              </div>
            )}

            <div className="rounded-md shadow-sm space-y-4">
              {/* Email input */}
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="text" // Changed from implicit to explicit text for clarity, original didn't have type
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
                Sign in
              </button>
            </div>
          </form>

          <div className="flex flex-row gap-2 mt-4 text-center">
            Don't have an account?
            {/* Create account link */}
            <button
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
              onClick={() => navigate("/signup")}
            >
              Create one
            </button>

          </div>

          <div className="flex justify-center gap-2 mt-4 text-center">
            {/* Dummy button - kept for functionality but styled discreetly */}
            <button
              className="flex justify-center items-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => navigate("/dummy")}
            >
              Test Dummy Route
            </button>
          </div>

        </div>
      </div >



    </>
  );
}
