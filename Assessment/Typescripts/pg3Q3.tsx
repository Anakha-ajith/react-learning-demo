import React from "react";

interface User {
  username: string;
  email: string;
}

interface Admin {
  adminId: number;
  department: string;
}

function getUserInfo(data: User | Admin | null): string {
  if (data === null) {
    throw new Error("Data is null");
  }

  if ("username" in data && "email" in data) {
    return `User: ${data.username}, Email: ${data.email}`;
  }

  if ("adminId" in data && "department" in data) {
    return `Admin ID: ${data.adminId}, Department: ${data.department}`;
  }

  throw new Error("Invalid object");
}

const DisplayInfo = ({ data }: { data: User | Admin | null }) => {
  try {
    const info = getUserInfo(data);

    return (
      <div>
        <h3>{info}</h3>
      </div>
    );
  } catch (error: any) {
    return <h3>{error.message}</h3>;
  }
};

export default function App() {
  const user: User = {
    username: "Alice",
    email: "alice@gmail.com",
  };

 
  return <DisplayInfo data={user} />;
}