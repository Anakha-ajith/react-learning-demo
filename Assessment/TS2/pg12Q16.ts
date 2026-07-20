interface UserRequest {
  name?: string;
  email?: string;
  age?: number;
}

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationSuccess {
  success: true;
  data: {
    name: string;
    email: string;
    age: number;
  };
}

interface ValidationFailure {
  success: false;
  errors: ValidationError[];
}

type ValidationResult = ValidationSuccess | ValidationFailure;

function validateRequest(
  input: UserRequest | null | undefined
): ValidationResult {
  const errors: ValidationError[] = [];

  // Handle null/undefined input
  if (!input) {
    return {
      success: false,
      errors: [
        {
          field: "request",
          message: "Request data is required."
        }
      ]
    };
  }

  // Name validation
  if (
    typeof input.name !== "string" ||
    input.name.trim().length === 0
  ) {
    errors.push({
      field: "name",
      message: "Name must be a non-empty string."
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    typeof input.email !== "string" ||
    !emailRegex.test(input.email)
  ) {
    errors.push({
      field: "email",
      message: "Email format is invalid."
    });
  }

  // Age validation
  if (
    typeof input.age !== "number" ||
    isNaN(input.age) ||
    input.age < 18 ||
    input.age > 120
  ) {
    errors.push({
      field: "age",
      message: "Age must be a number between 18 and 120."
    });
  }

  // Return validation errors
  if (errors.length > 0) {
    return {
      success: false,
      errors
    };
  }

  // Success response
  return {
    success: true,
    data: {
      name: input.name!.trim(),
      email: input.email!,
      age: input.age!
    }
  };
}

// Example Usage
console.log(
  validateRequest({
    name: "John Doe",
    email: "john@example.com",
    age: 25
  })
);

console.log(
  validateRequest({
    name: "",
    email: "johnexample.com",
    age: 15
  })
);

console.log(validateRequest(null));