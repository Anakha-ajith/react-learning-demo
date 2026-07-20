import { useState, useEffect, useCallback } from "react";

export function useAuthValidation(email, password) {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);

  const validate = useCallback(() => {
    const emailValue = (email ?? "").trim();
    const passwordValue = password ?? "";

    const newErrors = {
      email: "",
      password: "",
    };

    // Email Validation
    if (!emailValue) {
      newErrors.email = "Email is required";
    } else if (emailValue.length < 5) {
      newErrors.email = "Email must be at least 5 characters";
    } else if (!emailValue.includes("@")) {
      newErrors.email = "Email must contain @";
    }

    // Password Validation
    if (!passwordValue) {
      newErrors.password = "Password is required";
    } else if (passwordValue.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(passwordValue)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(passwordValue)) {
      newErrors.password =
        "Password must contain at least one number";
    }

    setErrors(newErrors);

    const formValid =
      newErrors.email === "" &&
      newErrors.password === "";

    setIsValid(formValid);
  }, [email, password]);

  useEffect(() => {
    validate();
  }, [validate]);

  const resetValidation = useCallback(() => {
    setErrors({
      email: "",
      password: "",
    });
    setIsValid(false);
  }, []);

  return {
    isValid,
    errors,
    resetValidation,
  };
}