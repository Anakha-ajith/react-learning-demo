import { useState } from "react";
import useTodo from "../hooks/useTodo";

function Todo() {
  const [input, setInput] = useState("");

  const { todos, addTodo, removeTodo, toggleTodo } = useTodo();

  const handleAdd = () => {
    if (!input.trim()) return;

    addTodo(input);
    setInput("");
  };

  return (
    <div>
      <h2>Todo List Using Custom Hook</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter todo"
      />

      <button style={{ marginLeft: "1rem" }} onClick={handleAdd}>
        Add Todo
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
                color: todo.completed ? "green" : "red",
              }}
            >
              {todo.text}
            </span>

            <button
              style={{ marginLeft: "1rem" }}
              onClick={() => removeTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
