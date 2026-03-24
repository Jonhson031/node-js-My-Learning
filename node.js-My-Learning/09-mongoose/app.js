const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Use middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // external middleware
    // morgan allows us to see request data right in the console
}

app.use(express.json()); // built in middleware

// ? Serve static files from 'public' folder
app.use(express.static('public'));

// These middlewares applies to every single request
app.use((req, res, next) => {
    next();
})

app.set('query parser', 'extended');

// Routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter);

module.exports = app;