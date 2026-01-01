import { useState } from "react";

function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleSave = () => {
    if (!text.trim()) return;
    updateTodo(todo.id, text);
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between mt-2">
      <div className="flex items-center gap-2">
        {/* Checkbox Toggle */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />

        {/* Editing Mode */}
        {isEditing ? (
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            className="border p-1"
            onKeyDown={e => e.key === "Enter" && handleSave()}
          />
        ) : (
          <span className={todo.completed ? "line-through text-gray-500" : ""}>
            {todo.text}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}

        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
}

export default TodoItem;
