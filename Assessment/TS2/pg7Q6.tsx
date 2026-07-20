import React, { useState, useEffect } from "react";

interface Address {
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address?: Address;
}

interface UserProfile {
  userId: number;
  fullName: string;
  email: string;
  city: string;
  zipcode: string;
}

const UserProfileComponent: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);

  useEffect(() => {
    const transformUsers = (users: User[]): UserProfile[] => {
      return users.map((user) => ({
        userId: user.id,
        fullName: user.name,
        email: user.email,
        city: user.address?.city ?? "",
        zipcode: user.address?.zipcode ?? "",
      }));
    };

    const mockUsers: User[] = [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        address: {
          city: "New York",
          zipcode: "10001",
        },
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
      },
      {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@example.com",
        address: {
          city: "Boston",
          zipcode: "02101",
        },
      },
    ];

    const transformed = transformUsers(mockUsers);
    setProfiles(transformed);
  }, []);

  return (
    <div>
      <h1>User Profiles</h1>

      {profiles.length === 0 ? (
        <p>No profiles available</p>
      ) : (
        <ul>
          {profiles.map((profile) => (
            <li key={profile.userId}>
              {profile.fullName} - {profile.email} - {profile.city} -{" "}
              {profile.zipcode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfileComponent;