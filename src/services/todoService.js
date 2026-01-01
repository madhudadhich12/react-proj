import { getItem, setItem, removeItem } from "../storage/localStorage";
const TODOS_KEY = "todos";
export const loadTodos = () =>{
    return getItem(TODOS_KEY) ?? [];
};
export const saveTodos = (todos) => {
    console.log("Saving to storage:", todos);
    setItem(TODOS_KEY, todos);
};
export const clearTodos = () => {
    removeItem(TODOS_KEY);
};