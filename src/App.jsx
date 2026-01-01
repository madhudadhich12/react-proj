import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";
import { createTodo } from "./type/todo.js";
import { loadTodos, saveTodos } from "./services/todoService.js";

function App() {
  const [todos, setTodos] = useState([]);


  // Load values on mount
  useEffect(() => {
       const loaded = loadTodos();
       console.log("loaded from storage on mount", loaded);
       setTodos(loaded);
  }, []);

  const addTodo = (text) => {
    const newTodo = createTodo(text);
    setTodos(prev => {
      const updated = [...prev, newTodo];
      saveTodos(updated);
      return updated;
  });    
  };

  const toggleTodo = (id) => {
    setTodos(prev => {
     const updated =  prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos(updated);
      return updated;
  });
  };

  const deleteTodo = (id) => {
    setTodos(prev => {
      const updated = prev.filter(todo => todo.id !== id);
      saveTodos(updated);
      return updated;
  });
  };

  const updateTodo = (id, newText) => {
    setTodos(prev => {
      const updated = prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
      saveTodos(updated);
      return updated;
  });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded bg-white">
      <h1 className="text-2xl font-bold text-center">Todo App</h1>

      <TodoInput addTodo={addTodo} />

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
