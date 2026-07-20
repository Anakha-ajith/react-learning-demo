import React, { useState } from "react";
import { useAuthValidation } from "./useAuthValidation";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    isValid,
    errors,
    resetValidation,
  } = useAuthValidation(email, password);

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {errors.password && <p>{errors.password}</p>}

      <button disabled={!isValid}>
        Login
      </button>

      <button onClick={resetValidation}>
        Reset Validation
      </button>
    </div>
  );
}

export default LoginForm;