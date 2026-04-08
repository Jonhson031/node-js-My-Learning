// ? Aliasing
// * lets you create predefined query shortcuts.

// Instead of writing this every time:
// /api/v1/tours?limit=5&sort=-ratingsAverage,price&fields=name,price,ratingsAverage,difficulty

// You can create shortcut like:
// /api/v1/tours/top-5-cheap

// * Step 1:
// Create middleware with custonm query
const aliasTopTours = (req, res, next) => {
    // Middleware
    req.customQuery = {
        limit: '5',
        sort: '-ratingsAvg,price',
        fields: 'name,ratingsAvg,price,summary,difficulty',
    }
    next();
}

// * Step 2:
// Call that middleware on Route
router.route('/top-5-cheap').get(aliasTopTours, getAllTours)

// * Step 3:
// Use it in your normal controller:

const getAllTours = async (req, res) => {
    try {
        // BUILD QUERY
        // 1A) Filtering
        const queryObj = { ...req.query, ...(req.customQuery || {}) };

        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);  // Fixed: brackets for property access

        // 1B) Advanced Filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = Tour.find(JSON.parse(queryStr));


        // * Step 4: Pull sort/fields/limit/page from customQuery (alias) or req.query
        const controlQuery = { ...req.query, ...(req.customQuery || {}) };

        // 2) Sorting
        if (controlQuery.sort) {
            query = query.sort(controlQuery.sort.split(',').join(' '));
        } else {
            query = query.sort('-_id');
        }

        // 3) Field Limiting
        if (controlQuery.fields) {
            query = query.select(controlQuery.fields.split(',').join(' '));
        } else {
            query = query.select('-__v');
        }

        // 4) Pagination
        const page = controlQuery.page * 1 || 1;
        const limit = controlQuery.limit * 1 || 100;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        // If page doesn't have any data
        if (req.query.page) {
            const numTours = await Tour.countDocuments(); // - returns a number of documents
            if (skip >= numTours) {
                throw new Error('This page does not exist!');
            }
        }

        // EXECUTE QUERY
        const tours = await query;

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message || err,
        })
    }
}