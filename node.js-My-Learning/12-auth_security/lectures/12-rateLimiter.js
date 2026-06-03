// npm i express-rate-limit

const rateLimit = require('express-rate-limit');

// * Rate Limiter middleware
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
});
app.use('/api', limiter);
