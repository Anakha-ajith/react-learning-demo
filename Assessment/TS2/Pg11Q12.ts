interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Fetch user from API
async function fetchUserData(userId: number): Promise<User> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user. Status: ${response.status}`);
  }

  const data = await response.json();

  // Convert API response into User interface
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    // jsonplaceholder doesn't provide age, so use a default value
    age: data.age ?? 18,
  };
}

// Validate user
function validateUser(user: User): ValidationResult {
  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!user.name.trim()) {
    errors.push("Name is required.");
  }

  if (!emailRegex.test(user.email)) {
    errors.push("Invalid email address.");
  }

  if (typeof user.age !== "number" || user.age < 0) {
    errors.push("Age must be a non-negative number.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Transform user
function transformUserData(user: User): User {
  return {
    ...user,
    name: user.name.trim(),
    email: user.email.toLowerCase(),
  };
}

// Pipeline
async function processUserPipeline(userId: number): Promise<User | null> {
  try {
    const user = await fetchUserData(userId);

    const validation = validateUser(user);

    if (!validation.isValid) {
      console.error("Validation Errors:", validation.errors);
      return null;
    }

    const transformedUser = transformUserData(user);

    console.log("Processed User:", transformedUser);

    return transformedUser;
  } catch (error) {
    console.error("Pipeline Error:", error);
    return null;
  }
}

// Example
processUserPipeline(1);