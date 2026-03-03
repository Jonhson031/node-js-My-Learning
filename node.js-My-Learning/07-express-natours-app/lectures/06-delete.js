// ? DELETE method
// DELETE is an HTTP method used to remove/delete an existing resource from the server.

const express = require('express');
const app = express();
app.use(express.json());

let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1); // Remove the user from the array

    res.status(200).json({ message: "User deleted successfully" });
});

/* Status Codes: 
  200 OK - Deleted successfully, returns a message
  204 No ContentDeleted successfully, returns nothing
  404 Not FoundResource doesn't exist */
