function validateAndTransformFormData(formData: FormData | null): APIPayload {
  if (!formData) {
    throw new Error("Form data cannot be null");
  }

  const name = formData.name?.trim();
  if (!name) {
    throw new Error("Name is required");
  }

  const email = formData.email?.trim();
  if (!email) {
    throw new Error("Email is required");
  }

  if (formData.age < 18 || formData.age > 100) {
    throw new Error("Age must be between 18 and 100");
  }

  return {
    name,
    email,
    age: formData.age,
    tags: formData.tags && formData.tags.length > 0
      ? formData.tags.map(tag => tag.trim())
      : undefined,
    bio: formData.bio?.trim() || ""
  };
}