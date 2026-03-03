// ? PATCH method
// PATCH is an HTTP method used to partially update an existing resource. It only sends the fields you want to change, not the entire object.

const express = require('express');
const app = express();
app.use(express.json());

// Here we wanna update this object
let users = [
  { id: 1, name: "Alice", email: "alice@email.com", age: 25 }
];

app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // Merge existing data with the new fields only
  users[userIndex] = { ...users[userIndex], ...req.body };

  res.json(users[userIndex]);
});

/*
What happens:
...users[userIndex] → keeps the existing data
...req.body → overwrites only the fields you sent
Result: { id: 1, name: "Alice", email: "alice@email.com", age: 26 } */