function optimizeDOMManipulation(elements, updates) {
    // Handle invalid or empty input
    if (
        !Array.isArray(elements) ||
        !Array.isArray(updates) ||
        elements.length === 0 ||
        updates.length === 0
    ) {
        return { reads: [], writes: [] };
    }

    const reads = [];
    const writes = [];

    // ----------------------------
    // Phase 1: Batch all DOM Reads
    // ----------------------------
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        // Skip null or undefined elements
        if (!element) continue;

        reads.push({
            element,
            index: i,
            width: element.offsetWidth,
            height: element.offsetHeight
        });
    }

    // -----------------------------
    // Phase 2: Prepare DOM Writes
    // -----------------------------
    for (let i = 0; i < reads.length; i++) {
        const read = reads[i];
        const update = updates[read.index];

        if (!update) continue;

        writes.push({
            element: read.element,
            styles: {
                width:
                    update.width !== undefined
                        ? update.width
                        : read.width + "px",

                height:
                    update.height !== undefined
                        ? update.height
                        : read.height + "px",

                backgroundColor:
                    update.backgroundColor !== undefined
                        ? update.backgroundColor
                        : null,

                color:
                    update.color !== undefined
                        ? update.color
                        : null,

                transform:
                    update.transform !== undefined
                        ? update.transform
                        : null
            }
        });
    }

    return { reads, writes };
}

function applyBatchedUpdates(elements, updates) {
    const result = optimizeDOMManipulation(elements, updates);

    // ----------------------------
    // Batch all DOM Writes
    // ----------------------------
    result.writes.forEach(({ element, styles }) => {
        if (!element || !element.style) return;

        Object.keys(styles).forEach((property) => {
            if (styles[property] !== null && styles[property] !== undefined) {
                element.style[property] = styles[property];
            }
        });
    });

    return result;
}