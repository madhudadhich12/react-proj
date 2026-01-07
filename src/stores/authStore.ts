import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  SessionUser,
  getSessionUser,
  login,
  signup,
  logout,
} from "../services/authService";

type AuthState = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => void;
  signupUser: (data: any) => void;
  logoutUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools((set) => {
    const session = getSessionUser();

    return {
      user: session,
      isAuthenticated: !!session,

      loginUser: (email, password) => {
        login(email, password);
        const s = getSessionUser();

        set(
          { user: s, isAuthenticated: true },
          false,
          "auth/loginUser"
        );
      },

      signupUser: (data) => {
        signup(data);
        const s = getSessionUser();

        set(
          { user: s, isAuthenticated: true },
          false,
          "auth/signupUser"
        );
      },

      logoutUser: () => {
        logout();

        set(
          { user: null, isAuthenticated: false },
          false,
          "auth/logoutUser"
        );
      },
    };
  })
);
