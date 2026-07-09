function User(name, permissions) {
    this.name = name;
    this.permissions = permissions || [];
}

User.prototype.checkPermission = function(permission) {
    return this.permissions.includes(permission);
};

function Manager(name, permissions, department) {
    User.call(this, name, permissions);
    this.department = department;
    this.managerPermissions = ["approve_requests", "manage_team"];
}

Manager.prototype = Object.create(User.prototype);

Manager.prototype.constructor = Manager;


Manager.prototype.checkPermission = function(permission) {

    
    if (this.managerPermissions.includes(permission)) {
        return true;
    }

    return User.prototype.checkPermission.call(this, permission);
};

const user1 = new User("Alice", ["read", "write"]);
const manager1 = new Manager("Bob", ["read", "write"], "Sales");

console.log(user1.checkPermission("read"));
console.log(manager1.checkPermission());
console.log(manager1.checkPermission([]));
console.log(manager1.checkPermission("approve_requests"));
console.log(manager1.checkPermission("delete"));