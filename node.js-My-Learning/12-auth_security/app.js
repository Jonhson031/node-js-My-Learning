const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// GLOBAL middlewares
// * Setting securite HTTP header using helmet
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // external middleware
  // morgan allows us to see request data right in the console
}

// * Rate Limiter middleware
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
});
app.use('/api', limiter);

// * Body parse, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // built in middleware

// * Preventing Parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAvg',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// * Serve static files from 'public' folder
app.use(express.static('public'));

// These middlewares applies to every single request
app.use((req, res, next) => {
  next();
});

app.set('query parser', 'extended');

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// ? Handling Unhandled Route
app.all('/{*any}', (req, res, next) => {
  // * Skips all the others middlewares in the stack and goes straight to error middleware
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// ? Error Handling Middleware
// * If there's four parameters inside a function, then Express identifies it as error handling middleware
app.use(globalErrorHandler);

module.exports = app;
