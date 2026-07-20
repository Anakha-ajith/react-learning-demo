// User Interface
interface User {
  id: number;
  name: string;
  role: string;
}

// Validate Input
async function validateInput(userId: number): Promise<void> {
  if (userId <= 0) {
    throw new Error("Invalid User ID");
  }
}

// Fetch User (Simulated Database)
async function fetchUser(userId: number): Promise<User> {
  return {
    id: userId,
    name: "John",
    role: "admin",
  };
}

// Check Permissions
async function checkPermission(user: User): Promise<void> {
  if (user.role !== "admin") {
    throw new Error("Access Denied");
  }
}

// Send Response
function sendResponse(user: User): void {
  console.log("Login Successful");
  console.log(user);
}

// Main Function
async function authenticateUser(userId: number): Promise<void> {
  try {
    await validateInput(userId);

    const user = await fetchUser(userId);

    await checkPermission(user);

    sendResponse(user);

  } catch (error) {
    console.error("Error:", (error as Error).message);
  }
}

// Function Call
authenticateUser(1);