/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchEmployees } from "../redux/actions/employeeActions";

function EmployeeList() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const employees = useSelector(
    (state: any) => state.employeeState.employees
  );

  useEffect(() => {
    dispatch<any>(fetchEmployees());
  }, [dispatch]);

  const filteredEmployees = employees.filter((employee: any) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employees</h2>

      {/* Search + Add Button */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
          }}
        />

        <Link to="/add">
          <button
            style={{
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Add Employee
          </button>
        </Link>
      </div>

      {/* Employee List */}
      {filteredEmployees.length > 0 ? (
        filteredEmployees.map((emp: any) => (
          <div
            key={emp.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
            }}
          >
            <h4>{emp.name}</h4>
            <p>{emp.email}</p>
          </div>
        ))
      ) : (
        <p>No employees found</p>
      )}
    </div>
  );
}

export default EmployeeList;