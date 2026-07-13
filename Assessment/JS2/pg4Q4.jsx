import React, { useState, useEffect, useRef } from "react";

function SearchProducts() {
  const [searchTerm, setSearchTerm] = useState("");

  const debounceTimer = useRef(null);
  const maxWaitTimer = useRef(null);

  // Simulated API Call
  const fetchProducts = (term) => {
    console.log("API Call:", term);
    // fetch(`/api/products?q=${term}`);
  };

  useEffect(() => {
    // Debounce timer (500ms)
    clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      fetchProducts(searchTerm);

      // Clear max wait timer if debounce fires first
      clearTimeout(maxWaitTimer.current);
      maxWaitTimer.current = null;
    }, 500);

    // Max wait timer (2 seconds)
    if (!maxWaitTimer.current) {
      maxWaitTimer.current = setTimeout(() => {
        fetchProducts(searchTerm);

        clearTimeout(debounceTimer.current);
        maxWaitTimer.current = null;
      }, 2000);
    }

    // Cleanup
    return () => {
      clearTimeout(debounceTimer.current);
    };
  }, [searchTerm]);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(debounceTimer.current);
      clearTimeout(maxWaitTimer.current);
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchProducts;