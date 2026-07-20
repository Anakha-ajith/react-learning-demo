interface TransformConfig<T, K extends keyof T> {
  key: K;
  transform?: (value: T[K]) => unknown;
}

function transformData<T, K extends keyof T>(
  data: T,
  config: TransformConfig<T, K>[]
): Record<string, unknown> {

  const result: Record<string, unknown> = {};

  for (const item of config) {

    const value = data[item.key];

    // Handle missing or null values
    if (value == null) {
      result[String(item.key)] = null;
      continue;
    }

    // Apply transformation if provided
    result[String(item.key)] = item.transform
      ? item.transform(value)
      : value;
  }

  return result;
}

// User Interface
interface User {
  id: number;
  name: string;
  profile?: {
    email: string;
    age: number;
  };
}

const u: User = {
  id: 1,
  name: "John",
  profile: {
    email: "john@example.com",
    age: 30
  }
};

const config: TransformConfig<User, keyof User>[] = [
  {
    key: "id",
    transform: (v) => v * 2
  },
  {
    key: "name"
  },
  {
    key: "profile",
    transform: (v) => v?.email ?? "No Email"
  }
];

const transformed = transformData(u, config);

console.log(transformed);