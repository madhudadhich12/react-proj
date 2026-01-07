import { getItem, setItem, removeItem } from "../storage/localStorage";

// Keys used for persistence in localStorage
const USERS_KEY = "users";
const SESSION_KEY = "sessionUser";

// Full user record (stored in `users`). This includes password for local validation
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// Session user (subset of `User`) saved to `sessionUser` when logged in
export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

// Read the array of users from storage. Returns empty array when none found.
export function getUsers(): User[] {
  return getItem<User[]>(USERS_KEY) ?? [];
}

// Replace the persisted users array with the given one.
export function saveUsers(users: User[]): void {
  setItem(USERS_KEY, users);
}

// Register a new user and automatically create a session for them.
// Throws an Error when a user with the same email already exists.
export function signup(user: User): void {
  const users = getUsers();

  // Prevent duplicate emails
  if (users.some(u => u.email === user.email)) {
    throw new Error("User exists");
  }

  // Persist the new user and update the users list
  users.push(user);
  saveUsers(users);

  // Create a session record (omitting the password)
  const session: SessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  // Persist the session (user is now signed in)
  setItem(SESSION_KEY, session);
}

// Validate credentials against stored users and set session when valid.
// Throws an Error when credentials are invalid.
export function login(email: string, password: string): void {
  const users = getUsers();

  // Find a user with matching email and password
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Persist the session (omit password)
  const session: SessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  setItem(SESSION_KEY, session);
}

// Clear the current session (log out)
export function logout(): void {
  removeItem(SESSION_KEY);
}

// Return the currently persisted session user, or null if none
export function getSessionUser(): SessionUser | null {
  return getItem<SessionUser>(SESSION_KEY);
}
