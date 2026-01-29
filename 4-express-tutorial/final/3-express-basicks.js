// ?  Express.js
// Express = thin layer on top of Node’s HTTP module
/* It:
  - handles routing
  - parses requests
  - simplifies responses
  - adds middleware */

const express = require('express');
const app = express();

// ? Route
// Route is a section of code that defines how the server responds to specific client requests based on the URL path and HTTP method

// Respond to GET request on the root route
app.get('/', (req, res) => {
  res.send('Home Page');
})
// Respond to GET request on the /about route
app.get('/about', (req, res) => {
  res.send('About page');
})

// Catch all other routes
app.use((req, res) => {
  res.status(404).send('<h1>404. Resource not found!</h1>');
});



// app.get - Handle GET requests
// app.post - Handle GET requests
// app.put
// app.delete
// app.all - Handle ALL http requests
// app.use
// app.listen
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
})
