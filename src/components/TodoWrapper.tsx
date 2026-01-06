import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { Todo } from "../type/todo";

import { useAuth } from "../context/AuthContext";
import {
  loadTodosByUser,
  saveTodoForUser,
  saveTodos,
} from "../services/todoService";

export default function TodoWrapper() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (user) {
      const loaded = loadTodosByUser(user.id);
      setTodos(loaded);
    }
  }, [user]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const addTodo = useCallback(
    (text: string) => {
      if (!user) return;

      const todo: Todo = {
        id: Date.now().toString(),
        userId: user.id,
        text,
        completed: false,
      };

      saveTodoForUser(todo);
      setTodos((prev) => [...prev, todo]);
    },
    [user]
  );

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      saveTodos(updated);
      return updated;
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      saveTodos(updated);
      return updated;
    });
  }, []);

  const updateTodo = useCallback((id: string, newText: string) => {
    setTodos((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      );
      saveTodos(updated);
      return updated;
    });
  }, []);

  const clearTodos = useCallback(() => {
    setTodos([]);
    saveTodos([]);
  }, []);

  const completedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos]
  );

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 md:px-8 bg-gray-50 flex justify-center bg-gradient-to-b from-rose-50 via-orange-50 to-amber-50">
      <div className="w-full max-w-2xl">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-2 mt-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            ToDo List
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="bg-gray-700 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        </div>

        {todos.length > 0 && (
          <p className="text-center text-gray-500 mt-1 text-xs sm:text-sm">
            Completed: {completedCount}
          </p>
        )}

        <TodoInput addTodo={addTodo} clearTodos={clearTodos} />

        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
}
