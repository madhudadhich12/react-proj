import TodoItem from "./TodoItem.jsx";

function TodoList({ todos, toggleTodo, deleteTodo, updateTodo }) {
  if (todos.length === 0)
    return <p className="text-center mt-4 text-gray-500">No todos yet</p>;

  return (
    <ul className="mt-4">
      {todos.map(todo => (
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

export default TodoList;
