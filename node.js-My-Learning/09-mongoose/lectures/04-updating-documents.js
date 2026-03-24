// ? Updating documents with Mongoose
const Tour = require('../models/tourModel');

// Same updateOne and updateMany and few more:

// 1. findOneAndUpdate() – Get the Updated Document
const updatedTour = await Tour.findOneAndUpdate(
    { name: "Forest Adventure" }, // filter
    { price: 350 },                // update
    { new: true }                  // return the updated document
);

// 2. Update by ID
const tourById = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true
})

// 3. Increment / Operators
// You can use MongoDB operators like $inc, $set, $push, etc.
await Tour.updateOne(
    { name: "Forest Adventure" },
    { $inc: { views: 1 } } // adds 1 to views
);

await Tour.updateOne(
    { name: "Forest Adventure" },
    { $push: { reviews: "Great tour!" } }
);