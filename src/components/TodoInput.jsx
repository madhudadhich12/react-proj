import { useState } from "react";

function TodoInput(props) {
  const [text, setText] = useState("");

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
        onChange={(e) => {
          console.log("Input changed", e.target.value);
          setText(e.target.value);
        }}
        placeholder="Enter todo…"
      />
      <button type="submit" className="border px-3">Add</button>
    </form>
  );
}

export default TodoInput;
