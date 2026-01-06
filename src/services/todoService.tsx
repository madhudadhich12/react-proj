import { getItem, setItem, removeItem } from "../storage/localStorage";
import { Todo } from "../type/todo";

const TODOS_KEY = "todos";

//console.log("todoService exports loaded");

function getAllTodos(): Todo[] {
  return getItem<Todo[]>(TODOS_KEY) ?? [];
}

export function loadTodosByUser(userId: string): Todo[] {
  return getAllTodos().filter(t => t.userId === userId);
}

export function saveTodoForUser(todo: Todo): void {
  const all = getAllTodos();
  all.push(todo);
  setItem(TODOS_KEY, all);
}

export function saveTodos(updatedTodos: Todo[]): void {
  setItem(TODOS_KEY, updatedTodos);
}

export function clearTodos(): void {
  removeItem(TODOS_KEY);
}
