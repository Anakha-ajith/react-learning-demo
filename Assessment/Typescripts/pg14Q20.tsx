type User = {
  id: number;
  name: string;
  email: string;
};

type Admin = {
  id: number;
  adminName: string;
  permissions: string[];
};

function processUserData(data: (User | Admin)[]): string[] {
  const results: string[] = [];

  for (let i = 0; i < data.length; i++) {
    const entry = data[i];

    if (isUser(entry)) {
      results.push(`User: ${entry.name} - ${entry.email}`);
    } else if (isAdmin(entry)) {
      results.push(
        `Admin: ${entry.adminName} - ${entry.permissions.length} permissions`
      );
    } else {
      results.push("Unknown type");
    }
  }

  return results;
}

function isUser(obj: User | Admin): obj is User {
  return "email" in obj;
}

function isAdmin(obj: User | Admin): obj is Admin {
  return "adminName" in obj && "permissions" in obj;
}

const testData: (User | Admin)[] = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, adminName: "Alice", permissions: ["read", "write"] },
  { id: 3, name: "Bob", email: "bob@example.com" },
];

const output = processUserData(testData);
output.forEach((item) => console.log(item));