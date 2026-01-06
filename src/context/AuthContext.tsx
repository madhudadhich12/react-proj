/**
 * AuthContext.tsx
 *
 * Centralized authentication context for the app.
 *
 * Responsibilities:
 * - Initialize auth state from persistent storage (via authService)
 * - Provide `user` and `isAuthenticated` to components via React Context
 * - Expose actions: `loginUser`, `signupUser`, `logoutUser` that call the
 *   underlying auth service and update local context state
 *
 * Notes / Implementation details:
 * - Persistence is handled in `src/services/authService.tsx` (using localStorage)
 * - Actions here call synchronous service functions and then re-read the session
 *   to update the `user` state. Caller components (pages) handle errors via try/catch.
 * - Consider making the API async and returning Promises if you plan to add
 *   remote auth or show loading/error states inside the context.
 */

import { createContext, useContext, useState, useEffect } from "react";
import { getSessionUser, login, signup, logout, SessionUser } from "../services/authService";

type AuthContextType = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => void;
  signupUser: (data: any) => void;
  logoutUser: () => void;
};

// Create context with a nullable default — consumers must be inside provider
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component that holds auth state and action implementations
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // `user` stores the SessionUser object returned by the auth service
  const [user, setUser] = useState<SessionUser | null>(null);
  // `isAuthenticated` is a convenience boolean that mirrors whether `user` is set
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // On mount, read any persisted session and initialize state. This keeps
  // the auth session across page refreshes.
  useEffect(() => {
    const sessionUser = getSessionUser();
    setUser(sessionUser);
    setIsAuthenticated(!!sessionUser);
  }, []);

  // Attempt to log the user in using the auth service. The service will set
  // the session (persisting to localStorage); we then re-read the session and
  // update the context state accordingly. Errors thrown by `login()` bubble
  // to the caller so components can present meaningful error messages.
  const loginUser = (email: string, password: string) => {
    login(email, password);
    const sessionUser = getSessionUser()
    setUser(sessionUser);
    setIsAuthenticated(true);
  };

  // Register a new user, persist session, and update context state.
  // `data` should include at minimum `id`, `name`, `email`, `password` as
  // expected by the underlying service.
  const signupUser = (data: any) => {
    signup(data);
    const sessionUser = getSessionUser();
    setUser(sessionUser);
    setIsAuthenticated(true);
  };

  // Clear session via the service and reset local state to signed-out.
  const logoutUser = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  }; 

  // Note: consider memoizing the value object with `useMemo` if consumers
  // experience unnecessary re-renders. Kept simple for this small app.
  return (
    <AuthContext.Provider value={{ user,isAuthenticated, loginUser, signupUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming auth context. Throws a clear error when used
// outside the provider to make mistakes obvious during development.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
