import React from "react";

// User Types
interface Admin {
  name: string;
  adminId: number;
}

interface Moderator {
  name: string;
  section: string;
}

interface Guest {
  name: string;
}

type User = Admin | Moderator | Guest | null;

// Type Guards
function isAdmin(user: any): user is Admin {
  return user && "adminId" in user;
}

function isModerator(user: any): user is Moderator {
  return user && "section" in user;
}

function isGuest(user: any): user is Guest {
  return user && "name" in user && !("adminId" in user) && !("section" in user);
}

// React Component
const UserPanel = ({ user }: { user: User }) => {
  if (user === null) {
    return <h3>No user found</h3>;
  }

  if (isAdmin(user)) {
    return (
      <div>
        <h2>Admin: {user.name}</h2>
        <button>Manage Users</button>
      </div>
    );
  }

  if (isModerator(user)) {
    return (
      <div>
        <h2>Moderator: {user.name}</h2>
        <button>Moderate Posts</button>
      </div>
    );
  }

  if (isGuest(user)) {
    return (
      <div>
        <h2>Guest: {user.name}</h2>
        <button>Sign Up</button>
      </div>
    );
  }

  return <h3>Invalid User</h3>;
};

// Example
export default function App() {
  const user: User = {
    name: "Alice",
    adminId: 101,
  };

  return <UserPanel user={user} />;
}