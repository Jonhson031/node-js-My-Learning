// ? Filtering data
const tours = await Tour.find(
    {
        duration: 5,
        difficulty: 'easy',
        price: { $lte: 300 }
    }
);

// ? Same way to write it
const tours2 = await Tour.find()
    .where('duration')
    .equals(5)
    .where('difficulty')
    .equals('easy')
    .where('price')
    .lt(300)



// * Filtering data using query from url

// To exclude some paramethers from query obj:
const queryObj = { ...req.query }; // copy query object
const excludedFields = ['page', 'sort', 'limit', 'fields']; // save names that we need exclude
excludedFields.forEach(el => delete queryObj([el])) // delete fields from the queryObject


// * IMPORTANT
// To use all filtering and sorting, we need first build query and then only execute it

// BUILD QUERY
const query = Tour.find({ price: { $lt: 500 } })
    .sort({ price: 1 })
    .limit(5)
    .select("name price");

/* 👉 At this point:
❌ Nothing is sent to MongoDB yet
✅ You just created a query object */

// EXECUTE QUERY
const tours3 = await query;


// ? Advanced Filtering
// to set gte or lte:
// http://localhost:3000/api/v1/tours?duration[gte]=5&price[lte]=500

// And then we receive query object:
//{ duration: { gte: '5' }, price: { lte: '500' } }

// Then we should add to each of them dollar sign $, so Mongo will understand it
let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
const query2 = Tour.find(JSON.parse(queryStr)); 