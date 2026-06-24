import "./App.css";
import SearchUsers from "./components/SearchUsers";

function App() {
  return (
    <div className="app">
      <h1>Debounced User Search</h1>

      <SearchUsers />
    </div>
  );
}

export default App;