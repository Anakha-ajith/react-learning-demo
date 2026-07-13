function User(username) {
    this.username = username;
    this.failedAttempts = 0;
    this.isLocked = false;
}

User.prototype.validatePassword = function (password) {

    if (this.isLocked) {
        return false;
    }

    if (typeof password !== "string") {
        return false;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const isLengthValid = password.length >= 8;

    if (hasUpperCase && hasLowerCase && hasDigit && isLengthValid) {
        this.failedAttempts = 0;
        return true;
    }

    this.failedAttempts++;

    if (this.failedAttempts >= 3) {
        this.isLocked = true;
    }

    return false;
};

User.prototype.resetAccount = function () {
    this.failedAttempts = 0;
    this.isLocked = false;
};

function AdminUser(username, adminLevel) {
    User.call(this, username);
    this.adminLevel = adminLevel;
}

// Correct inheritance
AdminUser.prototype = Object.create(User.prototype);
AdminUser.prototype.constructor = AdminUser;

// Override method
AdminUser.prototype.validatePassword = function (password) {

    if (this.isLocked) {
        return false;
    }

    if (typeof password !== "string") {
        return false;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const isLengthValid = password.length >= 10;

    if (hasUpperCase && hasLowerCase && hasDigit && isLengthValid) {
        this.failedAttempts = 0;
        return true;
    }

    this.failedAttempts++;

    if (this.failedAttempts >= 3) {
        this.isLocked = true;
    }

    return false;
};

const user1 = new User("john");
const admin1 = new AdminUser("admin1", 2);

console.log(user1.validatePassword("Pass1234"));      // true
console.log(admin1.validatePassword("AdminPass12"));  // true