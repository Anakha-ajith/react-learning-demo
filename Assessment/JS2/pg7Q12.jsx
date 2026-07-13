import React, { useRef } from "react";

export default function LayoutThrashingComponent() {
  const containerRef = useRef(null);

  const updateElements = () => {
    const items = containerRef.current.querySelectorAll(".item");

    // -------------------------
    // Batch all DOM Reads
    // -------------------------
    const measurements = [];

    items.forEach((item) => {
      measurements.push({
        item,
        height: item.offsetHeight,
        width: item.offsetWidth,
        rect: item.getBoundingClientRect(),
        computed: window.getComputedStyle(item).fontSize,
      });
    });

    // -------------------------
    // Batch all DOM Writes
    // -------------------------
    requestAnimationFrame(() => {
      measurements.forEach(
        ({ item, height, width, rect, computed }) => {
          item.style.width = height * 2 + "px";
          item.style.marginLeft = width / 4 + "px";
          item.style.backgroundColor =
            rect.top > 500 ? "red" : "blue";
          item.style.padding = computed;
        }
      );
    });
  };

  return (
    <div ref={containerRef}>
      <button onClick={updateElements}>
        Update Elements
      </button>

      <div
        className="item"
        style={{
          height: "100px",
          border: "1px solid black",
          margin: "10px",
        }}
      >
        Item 1
      </div>

      <div
        className="item"
        style={{
          height: "150px",
          border: "1px solid black",
          margin: "10px",
        }}
      >
        Item 2
      </div>

      <div
        className="item"
        style={{
          height: "120px",
          border: "1px solid black",
          margin: "10px",
        }}
      >
        Item 3
      </div>
    </div>
  );
}