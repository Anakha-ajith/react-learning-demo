import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

const InventoryDashboard = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", category: "Electronics", quantity: 10, price: 999 },
    { id: 2, name: "Mouse", category: "Electronics", quantity: 50, price: 29 },
    { id: 3, name: "Desk", category: "Furniture", quantity: 5, price: 299 },
    { id: 4, name: "Chair", category: "Furniture", quantity: 15, price: 199 },
  ]);

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const domMeasurements = useRef({});
  const batchReadQueue = useRef([]);
  const batchWriteQueue = useRef([]);

  // Cache DOM measurements
  const scheduleRead = useCallback((key, readFn) => {
    batchReadQueue.current.push(() => {
      domMeasurements.current[key] = readFn();
    });
  }, []);

  // Queue DOM writes
  const scheduleWrite = useCallback((key, writeFn) => {
    batchWriteQueue.current.push(() => {
      writeFn(domMeasurements.current[key]);
    });
  }, []);

  // Execute all reads first, then writes
  const flushBatches = useCallback(() => {
    batchReadQueue.current.forEach((fn) => fn());
    batchReadQueue.current = [];

    requestAnimationFrame(() => {
      batchWriteQueue.current.forEach((fn) => fn());
      batchWriteQueue.current = [];
    });
  }, []);

  // Update inventory
  const handleInventoryUpdate = useCallback(
    (id, qty) => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === Number(id)
            ? { ...p, quantity: Number(qty) }
            : p
        )
      );
    },
    []
  );

const groupProductsByCategory = useCallback(() => {
  const groups = {};

  products.forEach((product) => {
    if (!groups[product.category]) {
      groups[product.category] = {
        products: [],
        total: 0,
      };
    }

    groups[product.category].products.push(product);
    groups[product.category].total += product.quantity;
  });

  return groups;
}, [products]);

const groupedProducts = groupProductsByCategory();
  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    handleInventoryUpdate(productId, quantity);

    scheduleRead("dashboard", () => {
      const el = document.getElementById("dashboard");
      return el ? el.offsetHeight : 0;
    });

    scheduleWrite("dashboard", (height) => {
      console.log("Dashboard Height:", height);
    });

    flushBatches();

    setProductId("");
    setQuantity("");
  };

  return (
    <div
      id="dashboard"
      className="dashboard"
      style={{ padding: "20px" }}
    >
      <h1>Inventory Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Product Id"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          type="number"
          placeholder="New Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button type="submit">
          Update Inventory
        </button>
      </form>

      <hr />

      {Object.keys(groupedProducts).map((category) => (
        <div key={category}>
          <h2>{category}</h2>

          <p>
            <b>Total Quantity:</b>{" "}
            {groupedProducts[category].total}
          </p>

          {groupedProducts[category].products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "8px",
              }}
            >
              <p>ID: {product.id}</p>
              <p>Name: {product.name}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default InventoryDashboard;