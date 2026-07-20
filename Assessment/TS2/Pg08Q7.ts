import express, { Request, Response } from "express";

interface User {
  id: number;
  name: string;
  email: string;
}

function validateUser(
  user: User | null | undefined
): { valid: boolean; message: string } {
  if (!user) {
    return {
      valid: false,
      message: "User is null or undefined",
    };
  }

  if (user.id === null || user.id === undefined || isNaN(user.id)) {
    return {
      valid: false,
      message: "User ID is required",
    };
  }

  if (!user.name || user.name.trim() === "") {
    return {
      valid: false,
      message: "User name is required and cannot be empty",
    };
  }

  if (!user.email || user.email.trim() === "") {
    return {
      valid: false,
      message: "Email is required",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(user.email)) {
    return {
      valid: false,
      message: "Invalid email format",
    };
  }

  return {
    valid: true,
    message: "User validation passed",
  };
}

const app = express();

app.use(express.json());

app.post("/user", (req: Request, res: Response) => {
  try {
    const userData: User = req.body;

    const validation = validateUser(userData);

    if (validation.valid) {
      return res.status(200).json({
        success: true,
        data: userData,
      });
    }

    return res.status(400).json({
      success: false,
      error: validation.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});