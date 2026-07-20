// Request Interface
interface UserRequest {
  userId: number;
  email: string;
  age: number;
  validated?: boolean;
  user?: User;
}

// User Interface
interface User {
  userId: number;
  email: string;
  age: number;
}

// Validation Middleware
function validateRequest(req: UserRequest): void {
  try {
    // Validate User ID
    if (req.userId <= 0) {
      throw new Error("User ID must be a positive number");
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.email)) {
      throw new Error("Invalid email format");
    }

    // Validate Age
    if (req.age < 18 || req.age > 120) {
      throw new Error("Age must be between 18 and 120");
    }

    // Attach validated data
    req.validated = true;
    req.user = {
      userId: req.userId,
      email: req.email,
      age: req.age,
    };

    console.log("Validation Successful");
    console.log(req);

  } catch (error) {
    console.error("Validation Error:", (error as Error).message);
  }
}

// Sample Request
const request: UserRequest = {
  userId: 1,
  email: "john@gmail.com",
  age: 25,
};

// Call Middleware
validateRequest(request);