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
      <li className="flex flex-wrap justify-between items-start gap-2 px-3 py-2 mt-2 rounded-lg border bg-white hover:shadow-sm transition">
        <div className="flex gap-2 items-center flex-1 min-w-0">
          <input
            type="checkbox"
            className="w-4 h-4 accent-pink-600"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />

          <span
            className={
              (todo.completed ? "line-through text-gray-500 " : "") +
              "whitespace-pre-wrap break-all flex-1 min-w-0"
            }
          >
            {todo.text}
          </span>
        </div>

        <div className="basis-full sm:basis-auto w-full sm:w-auto flex flex-row gap-2 mt-2 sm:mt-0">
          <ActionButton variant="primary" onClick={() => setIsEditing(true)}>
            Edit
          </ActionButton>

          <ActionButton variant="danger" onClick={() => deleteTodo(todo.id)}>
            Delete
          </ActionButton>
        </div>
      </li>

      {isEditing && (
        <Modal title="Edit Todo" onClose={() => setIsEditing(false)}>
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 w-full rounded mb-4 resize-none"
            rows={3}
          />

          <div className="flex justify-end gap-2">
            <ActionButton variant="danger" onClick={() => setIsEditing(false)}>
              Cancel
            </ActionButton>

            <ActionButton variant="primary" onClick={handleSave}>
              Save
            </ActionButton>
          </div>
        </Modal>
      )}
    </>
  );
}
