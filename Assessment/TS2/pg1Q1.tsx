import React, { useState, useEffect, useMemo } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  // Fetch users from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  // Memoize filtered and sorted users
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [users, search]);

  return (
    <div>
      <h2>User Profiles</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;