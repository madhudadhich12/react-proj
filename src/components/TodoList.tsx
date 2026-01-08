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
      <div className="text-center py-12 px-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
        <div className="text-4xl mb-3">📝</div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new task above!
        </p>
      </div>
    );

  // Render a list of TodoItem components, providing the necessary handlers
  return (
    <ul role="list" className="space-y-3">
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
