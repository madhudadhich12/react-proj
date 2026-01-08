

import { useState, useRef } from "react";
import ActionButton from "./ActionButton";
import { Todo } from "../type/todo";

interface TodoInputProps {
  addTodo: (text: string) => void,
  clearTodos: () => void
}

function TodoInput({ addTodo, clearTodos }: TodoInputProps) {
  const [text, setText] = useState("");
  const typingTimeout = useRef<any>(null);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setText(value);

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      console.log("Debounced value", value);
    }, 500);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-inner"
    >
      {/* Input */}
      <input
        className="w-full sm:flex-1 px-4 py-3 border border-gray-200 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   outline-none transition-all duration-200 bg-white placeholder-gray-400
                   text-gray-900 text-base shadow-sm"
        value={text}
        onChange={handleChange}
        placeholder="What needs to be done?"
      />

      {/* Button group */}
      <div className="flex flex-row gap-2 w-full sm:w-auto">
        <ActionButton
          type="submit"
          variant="primary"
          className="flex-1 sm:flex-none w-full sm:w-auto justify-center"
        >
          Add Task
        </ActionButton>

        <ActionButton
          variant="secondary"
          onClick={clearTodos}
          className="flex-1 sm:flex-none w-full sm:w-auto justify-center"
        >
          Clear
        </ActionButton>
      </div>
    </form>
  );
}

export default TodoInput;
