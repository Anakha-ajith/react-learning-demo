import React, { useEffect, useRef } from 'react';
 
const ProductList = ({ products }) => {

  const containerRef = useRef(null);
 
  useEffect(() => {

    if (!containerRef.current) return;
 
    const batchDOMUpdates = () => {

      const reads = [];

      const writes = [];
 
      const items = containerRef.current.querySelectorAll('.product-item');
 
      // ---- Queue all READS first ----

      items.forEach((item) => {

        reads.push(() => {

          const productId = item.dataset.productId;

          const product = products.find((p) => String(p.id) === productId);

          if (!product) return null;
 
          return {

            item,

            product,

            rect: item.getBoundingClientRect(),   // layout read

            height: item.offsetHeight,            // layout read

            priceEl: item.querySelector('.price'),

            stockEl: item.querySelector('.stock'),

            currentPrice: item.querySelector('.price').innerText,

            currentStock: item.querySelector('.stock').innerText,

          };

        });

      });
 
      // ---- Queue all WRITES second ----

      // We push write factories that will use each read's result.

      const writeFactory = (data) => () => {

        if (!data) return;

        const { item, product, priceEl, stockEl, currentPrice, currentStock } = data;
 
        const newPrice = `$${product.price}`;

        const newStock = product.inStock ? 'In Stock' : 'Out of Stock';
 
        // Only write if the value actually changed (avoids needless work)

        if (currentPrice !== newPrice) {

          priceEl.innerText = newPrice;

        }

        if (currentStock !== newStock) {

          stockEl.innerText = newStock;

        }
 
        // Highlight out-of-stock items

        if (!product.inStock) {

          item.style.opacity = '0.5';

          item.style.backgroundColor = '#ffe6e6';

        } else {

          item.style.opacity = '1';

          item.style.backgroundColor = '';

        }

      };
 
      // ---- Execute in strict phases inside a single animation frame ----

      requestAnimationFrame(() => {

        // Phase 1: run all reads

        const readResults = reads.map((fn) => fn());
 
        // Build writes from read results

        readResults.forEach((data) => writes.push(writeFactory(data)));
 
        // Phase 2: run all writes (no reads interleaved -> no layout thrashing)

        writes.forEach((fn) => fn());

      });

    };
 
    batchDOMUpdates();

  }, [products]);
 
  return (
<div ref={containerRef}>

      {products.map((product) => (
<div

          key={product.id}

          className="product-item"

          data-product-id={product.id}
>
<span className="price">${product.price}</span>
<span className="rating">{product.rating}/5</span>
<span className="stock">

            {product.inStock ? 'In Stock' : 'Out of Stock'}
</span>
</div>

      ))}
</div>

  );

};
 
export default ProductList;
 