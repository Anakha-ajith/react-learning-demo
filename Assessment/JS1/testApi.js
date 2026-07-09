fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);