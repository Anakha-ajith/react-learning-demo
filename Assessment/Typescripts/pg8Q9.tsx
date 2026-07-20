type Admin = {
  role: "admin";
  permissions: string[];
};

type Guest = {
  role: "guest";
  permissions: [];
};

type Premium = {
  role: "premium";
  permissions: string[];
};

type User = Admin | Guest | Premium;

// Type Guard for Admin
function isAdmin(user: User): user is Admin {
  return (
    user.role === "admin" &&
    Array.isArray(user.permissions)
  );
}

// Type Guard for Premium
function isPremium(user: User): user is Premium {
  return (
    user.role === "premium" &&
    Array.isArray(user.permissions)
  );
}

// Permission Checker
function hasPermission(
  user: User,
  requiredPermission: string
): boolean {

  if (isAdmin(user)) {
    const admin= user as Admin
    return admin.permissions.includes(requiredPermission);
  }

  if (isPremium(user)) {
    return user.permissions.includes(requiredPermission);
  }

  // Guest has no permissions
  return false;
}

// Test
const testUser: User = {
  role: "premium",
  permissions: ["read", "write"],
};

console.log(hasPermission(testUser, "read"));    // true
console.log(hasPermission(testUser, "delete"));  // false