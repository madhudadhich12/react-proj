import { useState, useRef } from "react";

function TodoInput(props) {
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

    props.addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        className="border p-2 flex-1"
        value={text}
        onChange={handleChange}
        placeholder="Enter todo…"
      />
      <button type="submit" className="border px-3">Add</button>
    </form>
  );
}

export default TodoInput;
