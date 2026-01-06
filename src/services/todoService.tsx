import { getItem, setItem, removeItem } from "../storage/localStorage";
import { Todo } from "../type/todo";

// Storage key used for persisting the todos array
const TODOS_KEY = "todos";

function getAllTodos(): Todo[] {
  return getItem<Todo[]>(TODOS_KEY) ?? [];
}

// Return todos belonging to a specific user (filtered by `userId`).
// Safe to call when no todos exist — returns [] in that case.
export function loadTodosByUser(userId: string): Todo[] {
  return getAllTodos().filter((t) => t.userId === userId);
}

// Append a single todo to the persisted list for all users.
// This reads the current list, pushes the new todo, and writes it back.
export function saveTodoForUser(todo: Todo): void {
  const all = getAllTodos();
  all.push(todo);
  setItem(TODOS_KEY, all);
}

// Replace the entire persisted todos list with `updatedTodos`.
// Useful for bulk updates (toggle, delete, edit) where we compute a new list
// and persist it in one go.
export function saveTodos(updatedTodos: Todo[]): void {
  setItem(TODOS_KEY, updatedTodos);
}

// Remove the persisted todos key entirely (used for clearing all todos).
export function clearTodos(): void {
  removeItem(TODOS_KEY);
}
