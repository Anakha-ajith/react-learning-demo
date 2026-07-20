// Generic function with constraints
function transformData<T extends object | string | number, U>(
  data: T,
  transform: (value: T) => U
): U | string {

  const result = transform(data);

  // Validation
  if (result === null || result === undefined) {
    return "Error: Result is null or undefined";
  }

  if (typeof result === "string" && result.length === 0) {
    return "Error: Empty string";
  }

  if (typeof result === "number" && result <= 0) {
    return "Error: Number must be greater than 0";
  }

  return result;
}

// Examples

// String
const names = transformData("alice", str => str.toUpperCase());
console.log(names);

// Number
const num = transformData(10, n => n * 2);
console.log(num);

// Custom Object
interface User {
  name: string;
  age: number;
}

const user: User = {
    name: "John", age: 20,
    type: "user",
    email: ""
};

const result = transformData(user, u => ({
  ...u,
  age: u.age + 1
}));

console.log(result);