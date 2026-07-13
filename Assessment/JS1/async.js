function fetchUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: "John Doe",
                email: "john@example.com"
            });
        }, 100);
    });
}

function fetchUserNotifications(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                userId: userId,
                notifications: ["msg1", "msg2", "msg3"]
            });
        }, 100);
    });
}

async function processUserData(userId) {
    try {
        // Step 1: Wait for user data
        const user = await fetchUserData(userId);

        // Step 2: Wait for notifications
        const notificationData = await fetchUserNotifications(user.id);

        // Step 3: Merge and return
        return {
            ...user,
            notifications: notificationData.notifications
        };

    } catch (error) {
        console.error("Error:", error);

        // Fallback structure
        return {
            id: userId,
            name: null,
            email: null,
            notifications: []
        };
    }
}


processUserData(7)
    .then(result => console.log(result))
    .catch(error => console.error(error));