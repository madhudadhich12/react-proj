export type Todo = {
  id: string;
  userId: string;
  text: string;
  completed: boolean;
};

export function createTodo(text: string, userId: string): Todo {
  return { id: Date.now().toString(), userId, text, completed: false };
}
