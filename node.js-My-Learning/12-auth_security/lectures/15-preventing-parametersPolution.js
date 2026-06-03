// * Preventing Parameter pollution
// occurs when a user sends the same query parameter multiple times.
// GET /api/v1/tours?price=100&price=500

// If code expects a string or number, this can cause unexpected behavior.

// 1) install npm package
// npm i hpp

import hpp from 'hpp';

// app.use(hpp());

app.use(
  hpp({
    // whitelist: allow duplicate query parameters for these fields
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
