import TodoItem from "./TodoItem";
import { Todo } from "../type/todo";

// Props for the TodoList component
type TodoListProps = {
  // Array of todos to render
  todos: Todo[];
  // Handler to toggle a todo's completed state by id
  toggleTodo: (id: string) => void;
  // Handler to delete a todo by id
  deleteTodo: (id: string) => void;
  // Handler to update a todo's text by id
  updateTodo: (id: string, newText: string) => void;
};

/**
 * TodoList
 * - Renders a friendly message when there are no todos.
 * - Otherwise maps over `todos` and renders a `TodoItem` for each.
 * - Passes the provided handlers down to each `TodoItem` so items can
 *   toggle, delete or update themselves.
 */
export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  updateTodo,
}: TodoListProps) {
  // If there are no todos, show a helpful empty state message
  if (todos.length === 0)
    return (
      <p className="text-center mt-6 text-gray-400 italic">
        No todos yet — add your first task 😊
      </p>
    );

  // Render a list of TodoItem components, providing the necessary handlers
  return (
    <ul className="mt-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
}
