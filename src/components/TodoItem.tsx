import { useState, useRef, useEffect } from "react";
import ActionButton from "./ActionButton";
import Modal from "./Modal";
import { Todo } from "../type/todo";

type TodoItemProps = {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, newText: string) => void;
};

export default function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  updateTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(todo.text);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (!text.trim()) return;
    updateTodo(todo.id, text);
    setIsEditing(false);
  };

  return (
    <>
      <li className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 mb-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200">
        <div className="flex items-start gap-3 flex-1 w-full">
          <input
            type="checkbox"
            className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer accent-blue-600 transition-colors"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />

          <span
            className={`text-base flex-1 break-words transition-colors duration-200 ${todo.completed
              ? "text-gray-400 line-through decoration-gray-300"
              : "text-gray-700 font-medium"
              }`}
          >
            {todo.text}
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto opacity-100 transition-opacity duration-200">
          <ActionButton variant="primary" onClick={() => setIsEditing(true)} className="hover:bg-red-100">
            Edit
          </ActionButton>

          <ActionButton variant="danger" onClick={() => deleteTodo(todo.id)}>
            Delete
          </ActionButton>
        </div>
      </li>

      {isEditing && (
        <Modal title="Edit Task" onClose={() => setIsEditing(false)}>
          <div className="mt-2">
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-400 sm:text-sm"
              rows={4}
              placeholder="What needs to be done?"
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <ActionButton variant="danger" onClick={() => setIsEditing(false)}>
              Cancel
            </ActionButton>

            <ActionButton variant="primary" onClick={handleSave}>
              Save Changes
            </ActionButton>
          </div>
        </Modal>
      )}
    </>
  );
}
