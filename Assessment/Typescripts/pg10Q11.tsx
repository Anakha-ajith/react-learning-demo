import React, { useState } from "react";

type UserResponse =
  | { id: number; name: string }
  | { error: string };

type ProductResponse =
  | { productId: number; title: string; price: number }
  | { message: string };

type ApiResponse = UserResponse | ProductResponse;

// ---------- Type Guards ----------
const isUserSuccess = (
  data: UserResponse
): data is { id: number; name: string } => {
  return (
    "id" in data &&
    typeof data.id === "number" &&
    "name" in data &&
    typeof data.name === "string"
  );
};

const isProductSuccess = (
  data: ProductResponse
): data is { productId: number; title: string; price: number } => {
  return (
    "productId" in data &&
    typeof data.productId === "number" &&
    "title" in data &&
    typeof data.title === "string" &&
    "price" in data &&
    typeof data.price === "number"
  );
};

const isUserResponse = (data: ApiResponse): data is UserResponse => {
  return "id" in data || "error" in data;
};

const isProductResponse = (data: ApiResponse): data is ProductResponse => {
  return "productId" in data || "message" in data;
};

interface ComponentProps {
  data: ApiResponse;
}

export const DataProcessor: React.FC<ComponentProps> = ({ data }) => {
  const [result, setResult] = useState<string>("");

  const handleUserData = (userData: UserResponse): void => {
    if (isUserSuccess(userData)) {
      setResult(`User: ${userData.name} (ID: ${userData.id})`);
    } else {
      setResult(`User Error: ${userData.error}`);
    }
  };

  const handleProductData = (productData: ProductResponse): void => {
    if (isProductSuccess(productData)) {
      setResult(
        `Product: ${productData.title} - $${productData.price}`
      );
    } else {
      setResult(`Product Message: ${productData.message}`);
    }
  };

  const processData = (): void => {
    if (isUserResponse(data)) {
      handleUserData(data);
    } else if (isProductResponse(data)) {
      handleProductData(data);
    } else {
      setResult("Unknown response");
    }
  };

  return (
    <div>
      <button onClick={processData}>Process</button>
      <p>{result}</p>
    </div>
  );
};