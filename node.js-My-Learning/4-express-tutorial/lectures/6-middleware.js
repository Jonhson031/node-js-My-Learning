// ? Middleware
// It provides a way to add and reuse common functionality across your application's routes and endpoints.


/* // ? Built-in middleware (Express)
  - app.use(express.json())        // parse JSON body
  - app.use(express.urlencoded()) // parse form data
  - app.use(express.static('public')) // serve static files */ 

const express = require('express');
const app = express();
const morgan = require('morgan');
const authorize = require('./authorize');
const logger = require('./logger');
const errorHandler = require('./errorMiddleware');

// req => middleware => res
// Request come in => we do something > server sends response

// 1. use vs route
// 2. our options: our own / express / third party

// ? Morgan Middleware
// Use middleware
app.use(morgan('dev')); // external middleware
// morgan allows us to see request data right in the console

app.use(express.json()); // built in middleware

// These middlewares applies to every single request
app.use((req, res, next) => {
    console.log('Hello from middleware');
    next();
})


// ? Route-specific middleware
// Adds middleware function to specific route
// app.get('/', logger, (req, res) => {
//   res.send('Home');
// })

app.get('/', (req, res) => {
  res.send('Home');
})


// ? Global middleware:
app.use(logger);

app.get('/about', (req, res) => {
  res.send('About');
})

app.get('/api/products', (req, res) => {
  res.send('Prodcuts');
})

app.get('/api/cart', (req, res) => {
  console.log(req.user);
  res.send('Cart');
})

// Example route handler
app.get('/example', (req, res, next) => {
  try {
    // Some code that might throw an error
    throw new Error('Example error');
  } catch (error) {
    // Pass the error to Express error handler middleware
    next(error);
  }
});

// ? Error handling Middleware
// Always must be last in the code
app.use(errorHandler);


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
})
