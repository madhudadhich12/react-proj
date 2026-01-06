import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No user data.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 md:px-8 bg-gray-50 flex justify-center bg-gradient-to-b from-rose-50 via-orange-50 to-amber-50">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4 mt-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Profile</h1>
          <button
            onClick={() => navigate("/todos")}
            className="bg-gray-700 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800"
          >
            Back
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-sm font-medium text-gray-500">Name</h2>
            <p className="text-lg font-semibold text-gray-800">{user.name}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-sm font-medium text-gray-500">Email</h2>
            <p className="text-lg font-semibold text-gray-800">{user.email}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">User ID</h2>
            <p className="text-sm text-gray-600">{user.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
