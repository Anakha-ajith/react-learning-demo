interface User {
  id: number;
  name: string;
  email?: string;
  profile?: {
    age: number;
    country: string;
  };
}

// Type Guard
function isUser(data: unknown): data is User {
  // Must be an object and not null
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const user = data as User;

  // Required properties
  if (typeof user.id !== "number") return false;
  if (typeof user.name !== "string") return false;

  // Optional email
  if (user.email !== undefined && typeof user.email !== "string") {
    return false;
  }

  // Optional profile
  if (user.profile !== undefined) {
    if (
      typeof user.profile !== "object" ||
      user.profile === null ||
      typeof user.profile.age !== "number" ||
      typeof user.profile.country !== "string"
    ) {
      return false;
    }
  }

  return true;
}

function processUserData(rawData: unknown): string {
  if (!isUser(rawData)) {
    return "Invalid user data";
  }

  let result = `User: ${rawData.name}`;

  if (rawData.email) {
    result += ` | Email: ${rawData.email}`;
  }

  if (rawData.profile) {
    result += ` | Age: ${rawData.profile.age}`;
    result += ` | Country: ${rawData.profile.country}`;
  }

  return result;
}

// Test
const testData = {
  id: 1,
  name: "John",
  profile: {
    age: 30,
    country: "USA",
  },
};

console.log(processUserData(testData));