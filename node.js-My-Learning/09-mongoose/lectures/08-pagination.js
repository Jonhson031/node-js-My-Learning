// ? Pagination
const page = req.query.page * 1 || 1; // set page, if page doesn't specified, set default 1
const limit = req.query.limit * 1 || 100; // limit set default as 100
const skip = (page - 1) * limit; // calculate how many pages to skip

query = query.skip(skip).limit(limit);

// If page doesn't have any data
if (req.query.page) {
    const numTours = await Tour.countDocuments(); // - returns a number of documents
    if (skip >= numTours) {
        throw new Error('This page does not exist!');
    }
}