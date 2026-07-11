async function fetchUserData(userId) {
    try {
        // Step 1: Fetch User
        const userResponse = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        if (!userResponse.ok) {
            throw new Error("Failed to fetch user");
        }

        const user = await userResponse.json();
        console.log("User:", user);

        // Step 2: Fetch Posts of the User
        const postResponse = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
        );

        if (!postResponse.ok) {
            throw new Error("Failed to fetch posts");
        }

        const posts = await postResponse.json();
        console.log("Posts:", posts);

        // If user has no posts
        if (posts.length === 0) {
            console.log("No posts found.");
            return;
        }

        // Step 3: Fetch Comments of the First Post
        const commentResponse = await fetch(
            `https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`
        );

        if (!commentResponse.ok) {
            throw new Error("Failed to fetch comments");
        }

        const comments = await commentResponse.json();
        console.log("Comments:", comments);

        // Final Result
        return {
            user,
            posts,
            comments,
        };

    } catch (error) {
        console.error("Error:", error.message);
    }
}

fetchUserData(1);