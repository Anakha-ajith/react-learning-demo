import React, { useState } from "react";

const initialProducts = [
  { id: 1, name: "Laptop", price: 50000, stock: 10 },
  { id: 2, name: "Mouse", price: 500, stock: 3 },
  { id: 3, name: "Keyboard", price: 1500, stock: 8 },
];

function ProductList() {
  const [products, setProducts] = useState(initialProducts);

  // Simulate inventory update
  const updateInventory = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === 1
          ? { ...product, stock: 2 } // Stock drops below 5
          : product
      )
    );
  };

  return (
    <div>
      <button onClick={updateInventory}>Update Inventory</button>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            backgroundColor: product.stock < 5 ? "lightcoral" : "white",
            padding: "10px",
            margin: "5px",
            border: "1px solid black",
          }}
        >
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;