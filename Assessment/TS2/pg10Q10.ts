interface ApiUser {
  name: string;
  email: string;
  preferences?: {
    language?: string;
    theme?: string;
  };
}

interface FormUser {
  name: string;
  email: string;
  language: string;
  theme: string;
}

function transformUserData(apiUsers: ApiUser[]): FormUser[] {
  return apiUsers.map((user) => ({
    name: user.name,
    email: user.email,
    language: user.preferences?.language ?? "en",
    theme: user.preferences?.theme ?? "light",
  }));
}

const mockData: ApiUser[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    preferences: {
      language: "en",
      theme: "dark",
    },
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
  },
];

const result = transformUserData(mockData);
console.log(result);