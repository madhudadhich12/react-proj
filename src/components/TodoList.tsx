import TodoItem from "./TodoItem";
import { Todo } from "../type/todo";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, newText: string) => void;
};

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  updateTodo,
}: TodoListProps) {
  if (todos.length === 0)
    return (
      <p className="text-center mt-6 text-gray-400 italic">
        No todos yet — add your first task 😊
      </p>
    );

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
