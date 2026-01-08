import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

// Profile page
// - Reads the current `user` from the auth store and displays user info (name, email, id)
// - Provides a simple "Back" button that navigates to the todos list
// - If there is no user (not authenticated), it returns an early placeholder
export default function Profile() {
  // Get authenticated user from store
  const user = useAuthStore((s) => s.user);
  // Router navigation helper (used by the Back button)
  const navigate = useNavigate();

  // Guard: if no user is available, show a centered placeholder message
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No user data found.</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Helper to get initials
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header with Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/todos")}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="mr-2">←</span> Back to Dashboard
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header / Banner area */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          <div className="relative px-6 pb-6">
            {/* Avatar - positioned to overlap banner */}
            <div className="absolute -top-12 left-6 sm:left-10">
              <div className="h-24 w-24 rounded-full bg-white p-1 shadow-md">
                <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-3xl font-bold">
                  {initials}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="pt-16 sm:pl-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <span className="mt-2 sm:mt-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active ID: {user.id}
                </span>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Information
                </h3>
                <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-semibold">{user.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-semibold">{user.email}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Account ID</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">{user.id}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
