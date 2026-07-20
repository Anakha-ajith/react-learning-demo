function validateAndRegisterUser(user) {
  const { email, password, age } = user || {};

  // Email Validation
  if (typeof email !== "string" || email.trim() === "") {
    throw new Error("Email must be a non-empty string");
  }

  if (!email.includes("@")) {
    throw new Error("Email must contain '@'");
  }

  // Password Validation
  if (typeof password !== "string" || password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  // Age Validation
  if (typeof age !== "number" || age < 18 || age > 120) {
    throw new Error("Age must be between 18 and 120");
  }

  return {
    success: true,
    userId: "USER_" + Date.now(),
  };
}

module.exports = {
  validateAndRegisterUser,
};