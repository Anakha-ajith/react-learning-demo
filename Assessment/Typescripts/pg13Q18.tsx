type ValidationResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };

interface Constraints {
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: RegExp;
  isRequired?: boolean;
}

function validateInput<T extends string | number | boolean>(
  input: unknown,
  type: T extends string
    ? "string"
    : T extends number
    ? "number"
    : "boolean",
  constraints?: Constraints
): ValidationResult<T> {
  // Required validation
  if (
    constraints?.isRequired &&
    (input === null || input === undefined || input === "")
  ) {
    return { success: false, error: "Value is required" };
  }

  // Type validation
  if (typeof input !== type) {
    return {
      success: false,
      error: `Expected ${type}, got ${typeof input}`,
    };
  }

  // String validation
  if (type === "string") {
    const value = input as string;

    if (
      constraints?.minLength !== undefined &&
      value.length < constraints.minLength
    ) {
      return { success: false, error: "Minimum length not met" };
    }

    if (
      constraints?.maxLength !== undefined &&
      value.length > constraints.maxLength
    ) {
      return { success: false, error: "Maximum length exceeded" };
    }

    if (
      constraints?.pattern &&
      !constraints.pattern.test(value)
    ) {
      return { success: false, error: "Pattern mismatch" };
    }
  }

  // Number validation
  if (type === "number") {
    const value = input as number;

    if (
      constraints?.minValue !== undefined &&
      value < constraints.minValue
    ) {
      return { success: false, error: "Value is below minimum" };
    }

    if (
      constraints?.maxValue !== undefined &&
      value > constraints.maxValue
    ) {
      return { success: false, error: "Value exceeds maximum" };
    }
  }

  // Boolean requires no extra validation
  return {
    success: true,
    value: input as T,
  };
}