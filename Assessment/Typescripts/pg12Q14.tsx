interface FilterPredicate<T> {
  (item: T): boolean;
}

function filterArray<T>(
  items: T[],
  predicate: FilterPredicate<T>
): T[] {
  return items.filter(predicate);
}

// Usage examples:

const numbers = [1, 2, 3, 4, 5];

// Filter numbers greater than 2
const filteredNumbers = filterArray(numbers, (num) => num > 2);
console.log(filteredNumbers); // [3, 4, 5]

const users = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 35 },
];

// Filter users with age greater than 26
const filteredUsers = filterArray(users, (user) => user.age > 26);
console.log(filteredUsers);
// [
//   { id: 1, name: "Alice", age: 30 },
//   { id: 3, name: "Charlie", age: 35 }
// ]