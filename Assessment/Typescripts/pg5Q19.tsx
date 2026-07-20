interface User {
  type: "user";
  name: string;
  email: string;
}

interface Post {
  type: "post";
  title: string;
  content: string;
}

interface Comment {
  type: "comment";
  text: string;
  author: string;
}

type Entity = User | Post | Comment;

// Type Guards
function isUser(entity: Entity): entity is User {
  return entity.type === "user";
}

function isPost(entity: Entity): entity is Post {
  return entity.type === "post";
}

function isComment(entity: Entity): entity is Comment {
  return entity.type === "comment";
}

// Handler Function
function processEntity(entity: Entity) {
  if (isUser(entity)) {
    console.log("User:", entity.name, entity.email);
  } else if (isPost(entity)) {
    console.log("Post:", entity.title, entity.content);
  } else if (isComment(entity)) {
    console.log("Comment:", entity.text, entity.author);
  } else {
    console.log("Unknown Entity");
  }
}

// Mixed Array
const entities: Entity[] = [
  { type: "user", name: "Alice", email: "alice@gmail.com" },
  { type: "post", title: "React", content: "Learning React" }
];

// Process all entities
entities.forEach(processEntity);

// Type Assertion Example
const firstUser = entities[0] as User;
console.log("First User:", firstUser.name);