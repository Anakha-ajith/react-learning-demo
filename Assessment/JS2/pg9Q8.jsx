import React, { useEffect, useRef } from "react";

const ProductListOptimized = ({ products }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !products?.length) return;

    const elements =
      containerRef.current.querySelectorAll("[data-product]");

    const measurements = [];
    const updates = [];

    // ==========================
    // READ PHASE
    // ==========================
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      if (!element) continue;

      const rect = element.getBoundingClientRect();

      measurements.push({
        element,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      });
    }

    // ==========================
    // CALCULATION PHASE
    // ==========================
    measurements.forEach((measurement) => {
      const adjustment = measurement.width > 500 ? 20 : 10;

      updates.push({
        element: measurement.element,
        padding: adjustment,
        opacity: 0.8
      });
    });

    // ==========================
    // WRITE PHASE
    // ==========================
    updates.forEach((update) => {
      update.element.style.padding = `${update.padding}px`;
      update.element.style.opacity = update.opacity;
    });
  }, [products]);

  return (
    <div ref={containerRef}>
      {products.map((product, index) => (
        <div
          key={index}
          data-product
          style={{
            transition: "all 0.3s ease"
          }}
        >
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductListOptimized;