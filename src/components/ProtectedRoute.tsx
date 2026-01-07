/*import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

// Props for the ProtectedRoute component. The `children` are the
// React elements that should be shown when the user is authenticated.
type ProtectedRouteProps = {
  children: ReactNode;
};

/**
 * ProtectedRoute
 * - Reads authentication state from the app's auth store via `useAuthStore()`.
 * - If `isAuthenticated` is true, renders the provided `children`.
 * - If false, redirects the user to the `/login` route using `<Navigate />`.
 
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Grab the `isAuthenticated` flag from the auth store
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  //console.log("user", isAuthenticated);
  
  // Conditional render: show protected UI when authenticated; else redirect to login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
*/
