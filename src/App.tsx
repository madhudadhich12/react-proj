/**
 * App.tsx
 *
 * Application routing definitions and simple auth-based redirects.
 * Uses `useAuth()` to check `isAuthenticated` and conditionally render
 * pages or `Navigate` redirects.
 *
 * Notes:
 * - Public routes: `/login`, `/signup` (both redirect to `/todos` if already authenticated)
 * - Protected routes: `/todos`, `/profile` (redirect to `/login` when not authenticated)
 * - Root `/` redirects based on authentication status
 * - A `ProtectedRoute` component exists in the codebase and can be used to centralize guarding logic
 */

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";

import TodoWrapper from "./components/TodoWrapper";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

export default function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Routes>
      {/* Login page: if already signed in, redirect to /todos */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/todos" replace /> : <Login />
        }
      />

      {/* Signup page: if already signed in, redirect to /todos */}
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/todos" replace /> : <Signup />
        }
      />

      {/* Todos page: protected — only accessible when authenticated */}
      <Route
        path="/todos"
        element={
          isAuthenticated ? (
            <TodoWrapper />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Profile page: protected — only accessible when authenticated */}
      <Route
        path="/profile"
        element={
          isAuthenticated ? (
            <Profile />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Root path: redirect to /todos for authenticated users, otherwise to /login */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/todos" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Fallback: redirect unknown paths to root */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
