// * Data sanitization
// Means to clean all the data that comes into an applicaiton from melicious code (code that is trying to attack our app)

// 1) Install npm packages
// npm i express-mongo-sanitize
// npm i xss-clean

const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// ? Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// ? Data Sanitization against XSS (Cross-Side scription attack)
app.use(xss());

// !!! These packages no loner used in modern versions of Express 5+ and Mongoose 8+

// * Instead use build in Mongoose sanitize filter and packages like Zod and Joi:
const mongoose = require('mongoose');
mongoose.set('sanitizeFilter', true);
