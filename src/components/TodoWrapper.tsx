import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import ConfirmationModal from "../components/ConfirmationModal";
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

  // State for confirmation modal
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    type: 'delete' | 'clear' | null;
    id?: string;
  }>({ isOpen: false, type: null });

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

  // Actual delete logic
  const performDelete = useCallback((id: string) => {
    setTodos((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      saveTodos(updated);
      return updated;
    });
  }, []);

  // Wrapper to trigger modal
  const deleteTodo = useCallback((id: string) => {
    setConfirmationModal({ isOpen: true, type: 'delete', id });
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

  // Actual clear logic
  const performClear = useCallback(() => {
    setTodos([]);
    saveTodos([]);
  }, []);

  // Wrapper to trigger modal
  const clearTodos = useCallback(() => {
    setConfirmationModal({ isOpen: true, type: 'clear' });
  }, []);

  // Handle modal confirmation
  const handleConfirm = useCallback(() => {
    if (confirmationModal.type === 'delete' && confirmationModal.id) {
      performDelete(confirmationModal.id);
    } else if (confirmationModal.type === 'clear') {
      performClear();
    }
    setConfirmationModal({ isOpen: false, type: null });
  }, [confirmationModal, performDelete, performClear]);

  const handleCancel = useCallback(() => {
    setConfirmationModal({ isOpen: false, type: null });
  }, []);

  // Derived value: count of completed todos
  const completedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              My Tasks
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your daily goals and functionality
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            {/* Profile Button */}
            <button
              onClick={() => navigate("/profile")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Profile
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats & Content */}
        <div className="space-y-6">
          {/* Completion Status Pill */}
          {todos.length > 0 && (
            <div className="flex justify-end">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${completedCount === todos.length ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                {completedCount} / {todos.length} Completed
              </span>
            </div>
          )}

          {/* Main Components */}
          <div className="space-y-6">
            <TodoInput addTodo={addTodo} clearTodos={clearTodos} />
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          </div>
        </div>

        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={handleCancel}
          onConfirm={handleConfirm}
          title={confirmationModal.type === 'delete' ? "Delete Task?" : "Clear All Tasks?"}
          message={
            confirmationModal.type === 'delete'
              ? "Are you sure you want to delete this task? This action cannot be undone."
              : "Are you sure you want to clear all tasks? This action cannot be undone."
          }
          confirmJson={{
            label: confirmationModal.type === 'delete' ? "Delete" : "Clear All",
            variant: "danger"
          }}
        />
      </div>
    </div>
  );
}
