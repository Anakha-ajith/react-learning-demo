
const { validateAndRegisterUser } = require("./userService");

describe("validateAndRegisterUser", () => {
  const validUser = {
    email: "john@example.com",
    password: "Password1",
    age: 25,
  };

  describe("Successful Registration", () => {
    test("should register a valid user successfully", () => {
      const result = validateAndRegisterUser(validUser);

      expect(result).toEqual({
        success: true,
        userId: expect.any(String),
      });
    });
  });

  describe("Email Validation", () => {
    test("should throw error when email is null", () => {
      expect(() =>
        validateAndRegisterUser({
          ...validUser,
          email: null,
        })
      ).toThrow("Email must be a non-empty string");
    });

    test("should throw error when email is undefined", () => {
      expect(() =>
        validateAndRegisterUser({
          password: "Password1",
          age: 25,
        })
      ).toThrow("Email must be a non-empty string");
    });

    test("should throw error when email is empty", () => {
      expect(() =>
        validateAndRegisterUser({
          ...validUser,
          email: "",
        })
      ).toThrow("Email must be a non-empty string");
    });

    test("should throw error for invalid email format", () => {
      expect(() =>
        validateAndRegisterUser({
          ...validUser,
          email: "johnexample.com",
        })
      ).toThrow("Email must contain '@'");
    });

    test("should throw error when email is not a string", () => {
      expect(() =>
        validateAndRegisterUser({
          ...validUser,
          email: 12345,
        })
      ).toThrow("Email must be a non-empty string");
    });
  });

  describe("Password Validation", () => {
    test("should throw error when password is null", () => {
      expect(() =>
        validateAndRegisterUser({
          ...validUser,
          password: null,
        })
      ).toThrow("Password must be at least 8 characters long");
    });

    test("should throw error when password is undefined", () => {
      expect(() =>
        validateAndRegisterUser({
          email: "john@example.com",
          age: 25,
        })
      ).toThrow("Password must be at least 8 characters long");
    });

    test("should throw error when password is empty", () => {
      expect(() =>
        validateAndRegisterUser({
          ...validUser,
          password: "",
        })
      ).toThrow("Password must be at least 8 characters long");
    });

    test("should throw error when password is too short", () => {
      expect(() =>
        validateAndRegisterUser({
          ...validUser,
          password: "Pass12",
        })
      ).toThrow("Password must be at least 8 characters long");
    });
  });

  describe("Age Validation", () => {
    test("should throw error when age is null", () => {
      expect(() =>
        validateAndRegisterUser({
          ...validUser,
          age: null,
        })
      ).toThrow("Age must be between 18 and 120");
    });

    test("should throw error when age is undefined", () => {
      expect(() =>
        validateAndRegisterUser({
          email: "john@example.com",
          password: "Password1",
        })
      ).toThrow("Age must be between 18 and 120");
    });

    test("should throw error when age is below 18", () => {
      expect(() =>
        validateAndRegisterUser({
          ...validUser,
          age: 17,
        })
      ).toThrow("Age must be between 18 and 120");
    });

    test("should throw error when age is above 120", () => {
      expect(() =>
        validateAndRegisterUser({
          ...validUser,
          age: 121,
        })
      ).toThrow("Age must be between 18 and 120");
    });

    test("should throw error when age is not a number", () => {
      expect(() =>
        validateAndRegisterUser({
          ...validUser,
          age: "25",
        })
      ).toThrow("Age must be between 18 and 120");
    });
  });

  describe("Boundary Values", () => {
    test("should accept age 18", () => {
      const result = validateAndRegisterUser({
        ...validUser,
        age: 18,
      });

      expect(result.success).toBe(true);
      expect(result.userId).toEqual(expect.any(String));
    });

    test("should accept age 120", () => {
      const result = validateAndRegisterUser({
        ...validUser,
        age: 120,
      });

      expect(result.success).toBe(true);
      expect(result.userId).toEqual(expect.any(String));
    });

    test("should accept password with exactly 8 characters", () => {
      const result = validateAndRegisterUser({
        ...validUser,
        password: "Pass1234",
      });

      expect(result.success).toBe(true);
    });
  });
});