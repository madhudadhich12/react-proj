/*import { useState, useRef } from "react";
import ActionButton from "./ActionButton";

function TodoInput({addTodo, clearTodos}) {
  const [text, setText] = useState("");
  const typingTimeout = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      console.log("Debounced value", value);
      //if we were to make a API call we coud have added here.
      
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mt-4">
      <input
        className="
        w-full sm:flex-1
        px-3 py-2 sm:py-2
        border rounded-lg
        focus:ring-2 focus:ring-blue-400 focus:border-blue-400
        outline-none transition bg-gray-50
        text-sm sm:text-base"
        value={text}
        onChange={handleChange}
        placeholder="Enter todo…"
      />
     <ActionButton type="submit" variant="primary">
        Add
      </ActionButton>

      <ActionButton variant="danger" onClick={clearTodos}>
        Clear All
      </ActionButton>
    </form> 
  );
}

export default TodoInput;
*/

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
      className="flex flex-col sm:flex-row gap-2 mt-4"
    >
      {/* Input */}
      <input
        className="w-full sm:flex-1 px-3 py-2 border rounded-lg
                   focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                   outline-none transition bg-gray-50"
        value={text}
        onChange={handleChange}
        placeholder="Enter todo…"
      />

      {/* Button group */}
      <div className="flex flex-row gap-2 w-full sm:w-auto">
        <ActionButton
          type="submit"
          variant="primary"
          className="flex-1 sm:flex-none"
        >
          Add
        </ActionButton>

        <ActionButton
          variant="danger"
          onClick={clearTodos}
          className="flex-1 sm:flex-none"
        >
          Clear All
        </ActionButton>
      </div>
    </form>
  );
}

export default TodoInput;
