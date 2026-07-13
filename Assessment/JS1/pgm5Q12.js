async function fetchWithRetry(url, maxRetries = 2) {

    for (let attempt = 0; attempt <= maxRetries; attempt++) {

        try {
            const timeout = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Request timed out")), 500);
            });

            const response = await Promise.race([
                fetch(url),
                timeout
            ]);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return await response.json();

        } catch (error) {

            console.log(
                `Attempt ${attempt + 1} failed for ${url}:`,
                error.message
            );

            if (attempt === maxRetries) {
                throw error;
            }
        }
    }
}

async function fetchMultipleURLs(urls) {

    const results = {};
    const failedUrls = [];

    for (const url of urls) {

        try {

            const data = await fetchWithRetry(url);

            results[url] = data;

        } catch (error) {

            failedUrls.push(url);

        }
    }

    return {
        results,
        failedUrls
    };
}