import React, { useMemo } from 'react';

interface User {
  id: number;
  name: string;
  department: string;
}

interface GroupedUsers {
  [department: string]: User[];
}

// Function to group users by department
function groupUsersByDepartment(users: User[]): GroupedUsers {
  return users.reduce((groups: GroupedUsers, user: User) => {
    if (!groups[user.department]) {
      groups[user.department] = [];
    }
    groups[user.department].push(user);
    return groups;
  }, {});
}

// React component
const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  const groupedUsers = useMemo(() => {
    return groupUsersByDepartment(users);
  }, [users]);

  return (
    <div>
      {Object.entries(groupedUsers).map(([department, users]) => (
        <div key={department}>
          <h3>{department}</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserList;