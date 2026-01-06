import { createContext, useContext, useState, useEffect } from "react";
import { getSessionUser, login, signup, logout, SessionUser } from "../services/authService";

type AuthContextType = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => void;
  signupUser: (data: any) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    const sessionUser = getSessionUser();
    setUser(sessionUser);
    setIsAuthenticated(!!sessionUser);
  }, []);

  const loginUser = (email: string, password: string) => {
    login(email, password);
    const sessionUser = getSessionUser()
    setUser(sessionUser);
    setIsAuthenticated(true);
  };

  const signupUser = (data: any) => {
    signup(data);
    const sessionUser = getSessionUser();
    setUser(sessionUser);
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  }; 
  return (
    <AuthContext.Provider value={{ user,isAuthenticated, loginUser, signupUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
