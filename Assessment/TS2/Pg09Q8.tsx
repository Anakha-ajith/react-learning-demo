import React, { useState, useEffect, JSX } from "react";

interface User {
  id: number;
  name?: string;
  email?: string;
  age?: number;
}

interface UserListProps {
  data: User[] | null | undefined;
}

const UserList: React.FC<UserListProps> = ({ data }) => {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (data == null) {
      setError("No user data available.");
    } else if (data.length === 0) {
      setError("User list is empty.");
    } else {
      setError("");
    }
  }, [data]);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidAge = (age: any): boolean => {
    return (
      typeof age === "number" &&
      !isNaN(age) &&
      age >= 0
    );
  };

  const renderUserItem = (user: User): JSX.Element => {
    const name =
      user.name && user.name.trim() !== ""
        ? user.name
        : "Name not available";

    const email =
      user.email && isValidEmail(user.email)
        ? user.email
        : "Invalid email";

    const age =
      isValidAge(user.age)
        ? user.age
        : "Invalid age";

    return (
      <li key={user.id}>
        <strong>{name}</strong>
        <br />
        Email: {email}
        <br />
        Age: {age}
      </li>
    );
  };

  return (
    <div className="user-list">
      {error && <div className="error">{error}</div>}

      {!error && (
        <ul>
          {data?.map((user) => renderUserItem(user))}
        </ul>
      )}
    </div>
  );
};

export default UserList;