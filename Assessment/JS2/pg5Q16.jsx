import React, { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState({
    warehouses: [],
    products: [],
    stock: []
  });

  useEffect(() => {
    async function fetchData() {
      // Fetch all APIs simultaneously
      const [warehouseRes, productRes, stockRes] = await Promise.all([
        fetch("/api/warehouses").then(res => res.json()),
        fetch("/api/products").then(res => res.json()),
        fetch("/api/stock").then(res => res.json())
      ]);

      // Update state only once
      setData({
        warehouses: warehouseRes,
        products: productRes,
        stock: stockRes
      });
    }

    fetchData();
  }, []);

  return (
    <div>
      <h2>Inventory Dashboard</h2>

      {data.products.map(product => (
        <div key={product.id}>
          <h4>{product.name}</h4>

          {data.stock
            .filter(s => s.productId === product.id)
            .map(s => (
              <p key={s.warehouseId}>
                Warehouse {s.warehouseId}: {s.quantity}
              </p>
            ))}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;