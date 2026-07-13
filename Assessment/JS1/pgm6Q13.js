const User = (function () {
    // Private registry (Closure)
    const registeredUsers = [];

    function User(username, email, password) {
        if (typeof username !== "string" || username.trim() === "") {
            throw new Error("Username must be a non-empty string");
        }

        if (!this.validateEmail(email)) {
            throw new Error("Invalid email");
        }

        if (!this.validatePassword(password)) {
            throw new Error("Password must be at least 8 characters");
        }

        this.username = username;
        this.email = email;
        this.password = password;
    }

    User.prototype.validateEmail = function (email) {
        return (
            typeof email === "string" &&
            email.trim() !== "" &&
            email.includes("@")
        );
    };

    User.prototype.validatePassword = function (password) {
        return (
            typeof password === "string" &&
            password.length >= 8
        );
    };

    User.prototype.usernameExists = function (username) {
        return registeredUsers.some(
            user => user.username === username
        );
    };

    User.prototype.register = function () {
        if (this.usernameExists(this.username)) {
            throw new Error("Username already exists");
        }

        registeredUsers.push({
            username: this.username,
            email: this.email
        });

        return "User registered successfully";
    };

    User.prototype.getAllUsers = function () {
        return [...registeredUsers];
    };

    return User;
})();

const u1 = new User(
    "john",
    "john@gmail.com",
    "password123"
);
const u2 = new User(
    "anu",
    "john@gmail.com",
    "pas123"
);

console.log(u2.register())

console.log(u1.register());