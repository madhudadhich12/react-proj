import { getItem, setItem, removeItem } from "../storage/localStorage";

const USERS_KEY = "users";
const SESSION_KEY = "sessionUser";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

export function getUsers(): User[] {
  return getItem<User[]>(USERS_KEY) ?? [];
}

export function saveUsers(users: User[]): void {
  setItem(USERS_KEY, users);
}

export function signup(user: User): void {
  const users = getUsers();
  if (users.some(u => u.email === user.email)) {
    throw new Error("User exists");
  }

  users.push(user);
  saveUsers(users);

  const session: SessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  setItem(SESSION_KEY, session);
}

export function login(email: string, password: string): void {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const session: SessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  setItem(SESSION_KEY, session);
}

export function logout(): void {
  removeItem(SESSION_KEY);
}

export function getSessionUser(): SessionUser | null {
  return getItem<SessionUser>(SESSION_KEY);
}
