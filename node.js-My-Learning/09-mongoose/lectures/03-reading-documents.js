// ? Reading documents with Mongoose
// We can use both find and findOne just as in regular MongoDB
const Tour = require('../models/tourModel');

// * There is also few more functions in Mongoose:

// 1️⃣ Find by ID
const tour = Tour.findById("69b33c4e2d83a6a2db8d6ed3");


// 2️⃣️ Selecting Specific Fields
const tours = Tour.find().select("name price"); // Only name and price fields will be returned.

// 3️⃣ Sorting Results
const toursAsc = await Tour.find().sort({ price: 1 }); // ascending
const toursDesc = await Tour.find().sort({ price: -1 }); // descending

// 4️⃣ Limiting Results
const top3Tours = await Tour.find().sort({ price: 1 }).limit(3);
console.log(top3Tours);

// 5️⃣ Combining Filters, Sorting, and Limiting
const topCheapTours = await Tour.find({ price: { $lt: 500 } })
  .sort({ price: 1 })
  .limit(5)
  .select("name price");

