function fetchUserDataWithPosts(userId) {

    const userUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    const postsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

    const userPromise = fetch(userUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }
            return res.json();
        });

    const postsPromise = fetch(postsUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch posts");
            }
            return res.json();
        });

    return Promise.all([userPromise, postsPromise])
        .then(([user, posts]) => ({
            user,
            posts
        }))
        .catch(error => {
            console.error("Failed to fetch data:", error);
            throw error;
        });
}

async function processUserRequest(userId) {
    try {
        const result = await fetchUserDataWithPosts(userId);

        console.log("Success:", result);

        return result;

    } catch (error) {

        console.error("Error caught:", error.message);

        throw error;
    }
}

const userId = 1;

processUserRequest(userId)
    .then(data => {
        console.log("Final Result:", data);
    })
    .catch(error => {
        console.error("Unhandled Error:", error.message);
    });