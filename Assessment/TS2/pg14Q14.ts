interface ApiUser {
  userId?: string;
  fullName: string;
  status?: string;
}

interface TransformedUser {
  id: string;
  displayName: string;
  isActive: boolean;
}

function transformUserData(apiUsers: ApiUser[]): TransformedUser[] {
  const transformed: TransformedUser[] = [];

  for (const user of apiUsers) {
    // Skip users with missing userId
    if (!user.userId) {
      continue;
    }

    const transformedUser: TransformedUser = {
      id: user.userId,
      displayName: user.fullName,
      isActive: user.status === "active",
    };

    transformed.push(transformedUser);
  }

  return transformed;
}

// Test case
const apiResponse: ApiUser[] = [
  { userId: "1", fullName: "John Doe", status: "active" },
  { userId: undefined, fullName: "Jane Smith", status: "inactive" },
  { userId: "3", fullName: "Bob Wilson" },
  { userId: "4", fullName: "Alice Brown", status: "active" }
];

const result = transformUserData(apiResponse);
console.log(result);