import { useState, useEffect, useContext, useRef, lazy, Suspense } from "react";
import "./App.css";
import { ThemeContext } from "./context/ThemeContext";
// code spliting
const User = lazy(() => import("./components/User"));
const Todo = lazy(() => import("./components/Todo"));
const Login = lazy(() => import("./components/Login"));

function App() {
  const [count, setCount] = useState(0);

  // Controlled Component State
  const [name, setName] = useState("");

  // Uncontrolled Component Ref
  const inputRef = useRef(null);

  useEffect(() => {
    console.log("mounted");
  }, []);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleUncontrolledSubmit = () => {
    alert(`Uncontrolled Input Value: ${inputRef.current.value}`);
  };

  return (
    <div className={`app ${theme}`}>
      <section id="center">
        <h2>Current Theme: {theme}</h2>
        <Suspense fallback={<p>Loading User...</p>}>
          <User name="react practice section" />
        </Suspense>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <button type="button" className="counter" onClick={() => setCount(0)}>
          Reset
        </button>
        <button type="button" className="counter" onClick={toggleTheme}>
          Toggle Theme
        </button>
        <hr />
        {/* ==========================
            CONTROLLED COMPONENT
           ========================== */}
        <h2>Controlled Component</h2>
        <p>
          React state controls the input value using
          <b> value </b> and
          <b> onChange </b>.
        </p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Current Value: {name}</p>
        <hr />
        {/* ==========================
            UNCONTROLLED COMPONENT
           ========================== */}
        <h2>Uncontrolled Component</h2>
        <p>
          DOM controls the input value. React accesses it using
          <b> useRef </b>.
        </p>
        <input type="text" placeholder="Enter your name" ref={inputRef} />
        <button
          type="button"
          className="counter"
          onClick={handleUncontrolledSubmit}
        >
          Show Value
        </button>
        <hr />
        <Suspense fallback={<p>Loading Todo...</p>}>
          <Todo />
        </Suspense>
        <hr />
        {/* ==========================
            Accessibility
           ========================== */}
        <p>
          Accessibility (A11y) is the practice of building applications that can
          be used by everyone, including users with visual, hearing, motor, or
          cognitive disabilities. It involves semantic HTML, keyboard
          navigation, ARIA attributes, proper labels, and screen-reader support.
        </p>
        <Suspense fallback={<p>Loading Login...</p>}>
          <Login />
        </Suspense>
      </section>
    </div>
  );
}

export default App;
