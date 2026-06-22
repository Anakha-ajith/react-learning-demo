import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/actions/employeeActions";

import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch<any>(addEmployee(employee));

    navigate("/employees");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Name"
          value={employee.name}
          onChange={(e) =>
            setEmployee({
              ...employee,
              name: e.target.value,
            })
          }
        />

        <br />

        <input
          placeholder="Email"
          value={employee.email}
          onChange={(e) =>
            setEmployee({
              ...employee,
              email: e.target.value,
            })
          }
        />

        <br />

        <input
          placeholder="Department"
          value={employee.department}
          onChange={(e) =>
            setEmployee({
              ...employee,
              department: e.target.value,
            })
          }
        />

        <br />

        <button type="submit">Add Employee</button>
      </div>
    </form>
  );
}

export default AddEmployee;
