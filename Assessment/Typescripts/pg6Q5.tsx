import React from "react";

type User = {
  id: number;
  name: string;
  isActive: boolean;
};

// User Type Guard
const isUser = (data: unknown): data is User => {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    typeof (data as User).id === "number" &&
    "name" in data &&
    typeof (data as User).name === "string" &&
    "isActive" in data &&
    typeof (data as User).isActive === "boolean"
  );
};

// String Type Guard
const isString = (data: unknown): data is string => {
  return typeof data === "string";
};

// Number Type Guard
const isNumber = (data: unknown): data is number => {
  return typeof data === "number";
};

// Boolean Type Guard
const isBoolean = (data: unknown): data is boolean => {
  return typeof data === "boolean";
};

// Process Data
const processData = (
  input: string | number | boolean | User
): string => {
  if (isString(input)) {
    return `String: ${input.toUpperCase()}`;
  }

  if (isNumber(input)) {
    return `Number: ${input * 2}`;
  }

  if (isBoolean(input)) {
    return `Boolean: ${input}`;
  }

  if (isUser(input)) {
    return `User: ${input.name} (ID: ${input.id})`;
  }

  return "Unknown";
};

const DataProcessor: React.FC<{
  data: string | number | boolean | User;
}> = ({ data }) => {
  const result = processData(data);

  if (isUser(data)) {
    const userStatus = data.isActive ? "Active" : "Inactive";

    return (
      <div>
        {result} - Status: {userStatus}
      </div>
    );
  }

  return <div>{result}</div>;
};

export default DataProcessor;