import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { Todo } from "../type/todo";

import { useAuthStore } from "../stores/authStore";
import {
  loadTodosByUser,
  saveTodoForUser,
  saveTodos,
} from "../services/todoService";

// TodoWrapper - top-level UI for the user's todo list
// - Loads the current user's todos on mount (via user from the auth store)
// - Provides handlers for adding, toggling, deleting, updating and clearing todos
// - Persists todos using the todoService helpers
export default function TodoWrapper() {
  const navigate = useNavigate();
  // Get current user and logout function from auth store
  const user = useAuthStore((s) => s.user);
  const logoutUser = useAuthStore((s) => s.logoutUser);

  // Local state of todos for this user
  const [todos, setTodos] = useState<Todo[]>([]);

  // When `user` changes (login/logout), load that user's todos from storage
  useEffect(() => {
    if (user) {
      const loaded = loadTodosByUser(user.id);
      setTodos(loaded);
    }
  }, [user]);

  // Log the user out and navigate back to login page
  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  // Add a new todo for the current user
  // - creates a Todo object, persists it, and updates local state
  const addTodo = useCallback(
    (text: string) => {
      if (!user) return; // guard: do nothing if no user

      const todo: Todo = {
        id: Date.now().toString(),
        userId: user.id,
        text,
        completed: false,
      };

      // Persist new todo for the user and append it to state
      saveTodoForUser(todo);
      setTodos((prev) => [...prev, todo]);
    },
    [user]
  );

  // Toggle completion for a todo, persist the updated list
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      saveTodos(updated);
      return updated;
    });
  }, []);

  // Delete a todo by id and persist the updated list
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      saveTodos(updated);
      return updated;
    });
  }, []);

  // Update the text of a todo and persist
  const updateTodo = useCallback((id: string, newText: string) => {
    setTodos((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      );
      saveTodos(updated);
      return updated;
    });
  }, []);

  // Clear all todos (state + persisted storage)
  const clearTodos = useCallback(() => {
    setTodos([]);
    saveTodos([]);
  }, []);

  // Derived value: count of completed todos
  const completedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos]
  );

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 md:px-8 bg-gray-50 flex justify-center bg-gradient-to-b from-rose-50 via-orange-50 to-amber-50">
      <div className="w-full max-w-2xl">
        {/* Header with Logout and Profile buttons */}
        <div className="flex justify-between items-center mb-2 mt-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            ToDo List
          </h1>

          <div className="flex items-center gap-2">
            {/* Navigate to user profile */}
            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
            >
              Profile
            </button>

            {/* Log out the current user */}
            <button
              onClick={handleLogout}
              className="bg-gray-700 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Show completed count only when there are todos */}
        {todos.length > 0 && (
          <p className="text-center text-gray-500 mt-1 text-xs sm:text-sm">
            Completed: {completedCount}
          </p>
        )}

        {/* Input form to add todos and a button to clear all todos */}
        <TodoInput addTodo={addTodo} clearTodos={clearTodos} />

        {/* List of todos with handlers passed down */}
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
