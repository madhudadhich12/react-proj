# Zustand Migration: Global Auth State

This document explains how Zustand was implemented for authentication state management, replacing the previous React Context-based approach. It also lists all code changes made for the migration.

---

## Why Zustand?
- **Simpler API:** No need for Provider wrappers or custom hooks.
- **Selective subscriptions:** Components only re-render when the specific state they use changes.
- **Centralized logic:** State and actions live together, easier to test and maintain.
- **Persistence:** Can be extended with middleware for localStorage, etc.

---

## Implementation Steps

### 1. Create the Zustand Store
A new file was added:

**src/stores/authStore.ts**
```ts
import create from "zustand";
import { SessionUser, getSessionUser, login, signup, logout } from "../services/authService";

type AuthState = {
  user: SessionUser | null;
  isAuthenticated: boolean;
  setUser: (user: SessionUser | null) => void;
  loginUser: (email: string, password: string) => void;
  signupUser: (data: any) => void;
  logoutUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  const session = getSessionUser();
  return {
    user: session,
    isAuthenticated: !!session,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    loginUser: (email, password) => {
      login(email, password);
      const s = getSessionUser();
      set({ user: s, isAuthenticated: true });
    },
    signupUser: (data) => {
      signup(data);
      const s = getSessionUser();
      set({ user: s, isAuthenticated: true });
    },
    logoutUser: () => {
      logout();
      set({ user: null, isAuthenticated: false });
    },
  };
});

// Selectors for better TypeScript inference
export const selectUser = (s: AuthState) => s.user;
export const selectIsAuthenticated = (s: AuthState) => s.isAuthenticated;
export const selectLoginUser = (s: AuthState) => s.loginUser;
export const selectSignupUser = (s: AuthState) => s.signupUser;
export const selectLogoutUser = (s: AuthState) => s.logoutUser;
```

### 2. Update Component Imports and Usage
All components/pages that previously used `useAuth` or `AuthProvider` were updated to use `useAuthStore` and selectors:

- **src/App.tsx**
  - Replaced `useAuth` with `useAuthStore(selectIsAuthenticated)`
- **src/pages/Profile.tsx**
  - Replaced `useAuth` with `useAuthStore(selectUser)`
- **src/components/TodoWrapper.tsx**
  - Replaced `useAuth` with `useAuthStore(selectUser)` and `useAuthStore(selectLogoutUser)`
- **src/pages/Signup.tsx**
  - Replaced `useAuth` with `useAuthStore(selectSignupUser)`
- **src/components/ProtectedRoute.tsx**
  - Replaced `useAuth` with `useAuthStore(selectIsAuthenticated)`
- **src/pages/Login.tsx**
  - Replaced `useAuth` with `useAuthStore(selectLoginUser)`
- **src/main.tsx**
  - Removed `AuthProvider` wrapper from the app root

### 3. Remove Context Provider
- The `<AuthProvider>` wrapper was removed from `src/main.tsx`.
- No need for custom hooks or context error handling.

---

## Summary of Changes
- Added: `src/stores/authStore.ts` (Zustand store)
- Updated: All components/pages to use `useAuthStore` and selectors
- Removed: `<AuthProvider>` from app root
- No changes to the underlying service logic (`authService.tsx`)

---

## How to Use
- Import the store and selector:
  ```ts
  import { useAuthStore, selectUser } from "../stores/authStore";
  const user = useAuthStore(selectUser);
  ```
- Call actions directly:
  ```ts
  const loginUser = useAuthStore(selectLoginUser);
  loginUser(email, password);
  ```

---

## Notes
- The migration keeps all existing functionality and error handling the same.
- For larger apps, you can split stores or add middleware for persistence/devtools.
- Install Zustand: `npm install zustand`
