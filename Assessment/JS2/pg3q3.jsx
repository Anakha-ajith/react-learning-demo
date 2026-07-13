import React from "react";

function debounce(func, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function throttle(func, limit) {
  let waiting = false;

  return function (...args) {
    if (!waiting) {
      func(...args);
      waiting = true;

      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}

function SearchProducts() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [gridCols, setGridCols] = React.useState(3);

  const allProducts = React.useMemo(
    () => [
      { id: 1, name: "Laptop" },
      { id: 2, name: "Mouse" },
      { id: 3, name: "Keyboard" },
      { id: 4, name: "Monitor" },
      { id: 5, name: "Phone" },
      { id: 6, name: "Tablet" },
      { id: 7, name: "Camera" },
      { id: 8, name: "Printer" },
      { id: 9, name: "Speaker" },
      { id: 10, name: "Webcam" }
    ],
    []
  );

  // Simulated API Call
  const fetchProducts = React.useCallback(
    (term) => {
      console.log("API Call for:", term);

      const filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

      setProducts(filteredProducts);
    },
    [allProducts]
  );

  // Debounced Search
  const debouncedSearch = React.useMemo(() => {
    return debounce(fetchProducts, 500);
  }, [fetchProducts]);

  // Resize Handler
  const handleResize = React.useCallback(() => {
    if (window.innerWidth < 600) {
      setGridCols(1);
    } else if (window.innerWidth < 900) {
      setGridCols(2);
    } else {
      setGridCols(3);
    }
  }, []);

  // Throttled Resize
  const throttledResize = React.useMemo(() => {
    return throttle(handleResize, 300);
  }, [handleResize]);

  React.useEffect(() => {
    window.addEventListener("resize", throttledResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, [throttledResize, handleResize]);

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    debouncedSearch(value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Search</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px"
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gap: "15px"
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              textAlign: "center",
              borderRadius: "5px"
            }}
          >
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchProducts;