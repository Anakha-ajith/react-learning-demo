import { useState } from "react";

function useTodo() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((data) => {
        data.id === id ? { ...data, completed: !data.completed } : data;
      }),
    );
  };

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
  };
}

export default useTodo;
