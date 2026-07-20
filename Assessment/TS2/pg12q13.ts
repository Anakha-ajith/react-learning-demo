import express, { Request, Response } from "express";

interface User {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
}

const app = express();
app.use(express.json());

let users: User[] = [];
let nextId = 1;

app.post("/register", (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    // Check duplicate email
    const userExists = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      return res.status(409).json({
        error: "User already exists",
      });
    }

    // Simulated database limit/error
    if (users.length >= 100) {
      throw new Error("User limit exceeded");
    }

    const newUser: User = {
      id: nextId++,
      email,
      password,
      createdAt: new Date(),
    };

    users.push(newUser);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: newUser.id,
    });
  } catch (error) {
    console.error("Registration failed:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});