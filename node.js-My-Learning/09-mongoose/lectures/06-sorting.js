// ? Sorting data
// After we builded our query and excluded fields, we can sort

// BUILD QUERY
const queryObj = { ...req.query };
const excludedFields = ['page', 'sort', 'limit', 'fields'];
excludedFields.forEach(el => delete queryObj[el]);  // Fixed: brackets for property access

// 1B) Advanced Filtering
let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
console.log(JSON.parse(queryStr));

let query = Tour.find(JSON.parse(queryStr));

// ? 2) Sorting
if (req.query.sort) { // Check if url has sort in it
    // * By default is ascending order (lowest to highest)
    // Put - in front of price and it will be descending (highest to lowest)
    // http://localhost:3000/api/v1/tours?sort=price 
    query = query.sort(req.query.sort)


    // * To sort by two or more fields
    // For example we want first sort by price, and then sort by rating
    // http://localhost:3000/api/v1/tours?sort=-price,ratingsAvg
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy)
} else { //  to set default sorting, if user didn't specify any sorting method
    query = query.sort('-createdAt')
}

// EXECUTE QUERY
const tours = await query;