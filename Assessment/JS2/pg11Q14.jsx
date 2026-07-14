import React, { useEffect, useRef, useState } from "react";
 
const OptimizedProductList = ({ products }) => {

  const containerRef = useRef(null);

  const [visibilityData, setVisibilityData] = useState([]);
 
  // ---- Step 1: Transform products into an array with refs + placeholders ----

  // We do this once (or whenever products change) so each item has a stable ref.

  const initializeData = (products) => {

    return products.map((product) => ({

      id: product.id,

      name: product.name,

      ref: React.createRef(),

      top: 0,

      bottom: 0,

      height: 0,

      isVisible: false,

    }));

  };
 
  // ---- Step 2: READ PHASE ----

  // Collect all measurements from the DOM. No writes here.

  const calculateVisibility = (items) => {

    if (!containerRef.current) return items;
 
    const containerRect = containerRef.current.getBoundingClientRect();

    const viewportTop = containerRect.top;

    const viewportBottom = containerRect.bottom;
 
    // Batch ALL reads first — every getBoundingClientRect happens back-to-back

    // so the browser only performs one layout recalculation.

    const reads = items.map((item) => {

      if (!item.ref.current) {

        return { ...item, top: 0, bottom: 0, height: 0, isVisible: false };

      }
 
      const rect = item.ref.current.getBoundingClientRect();

      const height = item.ref.current.offsetHeight;
 
      const isVisible =

        rect.bottom >= viewportTop && rect.top <= viewportBottom;
 
      return {

        ...item,

        top: rect.top,

        bottom: rect.bottom,

        height,

        isVisible,

      };

    });
 
    return reads;

  };
 
  // ---- Step 3: WRITE PHASE ----

  // Apply all style updates in one pass. No reads here.

  const applyStylesToDOM = (visibilityData) => {

    visibilityData.forEach((item) => {

      if (!item.ref.current) return;
 
      const el = item.ref.current;
 
      if (item.isVisible) {

        el.style.opacity = "1";

        el.style.backgroundColor = "#e6f7ff";

        el.style.transform = "translateX(0)";

      } else {

        el.style.opacity = "0.3";

        el.style.backgroundColor = "#f5f5f5";

        el.style.transform = "translateX(-10px)";

      }

    });

  };
 
  // ---- Step 4: Orchestrate reads and writes inside a single frame ----

  useEffect(() => {

    if (!containerRef.current) return;
 
    // Initialize once with refs

    const items = initializeData(products);

    setVisibilityData(items);
 
    const runBatchedUpdate = () => {

      requestAnimationFrame(() => {

        // Phase 1: all reads together (one layout recalculation)

        const measured = calculateVisibility(items);
 
        // Phase 2: update state so React knows the new visibility

        setVisibilityData(measured);
 
        // Phase 3: all writes together (no reads interleaved)

        applyStylesToDOM(measured);

      });

    };
 
    // Run once after mount

    runBatchedUpdate();
 
    // Recalculate on scroll — still batched via rAF

    const container = containerRef.current;

    let ticking = false;

    const onScroll = () => {

      if (!ticking) {

        ticking = true;

        requestAnimationFrame(() => {

          const measured = calculateVisibility(items);

          setVisibilityData(measured);

          applyStylesToDOM(measured);

          ticking = false;

        });

      }

    };
 
    container.addEventListener("scroll", onScroll);

    return () => container.removeEventListener("scroll", onScroll);

  }, [products]);
 
  return (
<div

      ref={containerRef}

      style={{ height: "600px", overflow: "auto" }}
>

      {visibilityData.map((item) => (
<div

          key={item.id}

          ref={item.ref}

          style={{

            padding: "12px",

            marginBottom: "4px",

            border: "1px solid #ddd",

            transition: "opacity 0.2s, background-color 0.2s, transform 0.2s",

          }}
>

          {item.name}
</div>

      ))}
</div>

  );

};
 
export default OptimizedProductList;
 