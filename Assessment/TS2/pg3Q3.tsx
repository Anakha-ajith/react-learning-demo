import React, { useEffect, useState } from "react";

// Raw API Response
interface ApiUser {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  lastLogin?: string;
}

// Transformed User
interface UserProfile {
  id: number;
  name: string;
  email: string;
  accountAge: number;
  createdDate: string;
  lastLogin: string;
  status: string;
}

const UserProfileComponent: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Simulated API Response
    const apiData: ApiUser = {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      createdAt: "2024-07-01T10:00:00Z",
      lastLogin: "2025-07-10T09:00:00Z",
    };

    const transformedUser = transformUser(apiData);
    setUser(transformedUser);
  }, []);

  // Transform Function
  const transformUser = (data: ApiUser): UserProfile => {
    const created = data.createdAt ? new Date(data.createdAt) : new Date();
    const login = data.lastLogin ? new Date(data.lastLogin) : new Date();

    const today = new Date();

    const accountAge = Math.floor(
      (today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
    );

    const daysSinceLogin = Math.floor(
      (today.getTime() - login.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      accountAge,
      createdDate: created.toLocaleDateString(),
      lastLogin: login.toLocaleDateString(),
      status: daysSinceLogin <= 30 ? "Active" : "Inactive",
    };
  };

  return (
    <div>
      {user && (
        <>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Account Age: {user.accountAge} days</p>
          <p>Created: {user.createdDate}</p>
          <p>Last Login: {user.lastLogin}</p>
          <p>Status: {user.status}</p>
        </>
      )}
    </div>
  );
};

export default UserProfileComponent;