function safeGetProperty(obj, propertyName, expectedType, defaultValue) {

    // Handle null or undefined
    if (obj == null|undefined) {
        return "Object is null or undefined";
    }

    // Check if property exists (including prototype chain)
    if (!(propertyName in obj)) {
        return defaultValue;
    }

    const value = obj[propertyName];

    // Validate type
    if (typeof value !== expectedType) {
        return defaultValue;
    }

    return value;
}

const userProto = {
    name: "Anonymous",
    email: "user@example.com"
};

const user = Object.create(userProto);
user.age = 25;

console.log(safeGetProperty(user, "name", "string", "Unknown"));
console.log(safeGetProperty(user, "age", "number", 0));
console.log(safeGetProperty(null, "name", "string", "Unknown"));
console.log(safeGetProperty(user, "phone", "string", "N/A"));
console.log(safeGetProperty(user, "age", "string", "Invalid"));