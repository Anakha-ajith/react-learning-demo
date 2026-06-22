import {
 BrowserRouter,
 Routes,
 Route,
} from "react-router-dom";

import EmployeeList from "./pages/EmployeeList";
import Login from "./pages/Login";
import AddEmployee from "./pages/AddEmployee";

function App() {
 return (
  <BrowserRouter>
   <Routes>

    <Route
      path="/"
      element={<Login />}
    />

    <Route
      path="/employees"
      element={<EmployeeList />}
    />

    <Route
      path="/add"
      element={<AddEmployee />}
    />

   </Routes>
  </BrowserRouter>
 );
}

export default App;