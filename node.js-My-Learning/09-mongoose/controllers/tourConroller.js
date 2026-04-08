const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeauters');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/getAsync');

// ? Routing in Node.js determines how an application responds to a client request for a specific endpoint
// const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'dev-data', 'data', 'tours-simple.json')));


const aliasTopTours = (req, res, next) => {
    // Middleware
    req.customQuery = {
        limit: '5',
        sort: '-ratingsAvg,price',
        fields: 'name,ratingsAvg,price,summary,difficulty',
    }
    next();
}

const getAllTours = catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query, req.customQuery)
        .filter()
        .sort()
        .limitFileds()
        .paginate();

    const tours = await features.query;

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
})


// ? Responding to URL parameters:
const getTour = catchAsync(async (req, res, next) => {
    // * Find tour by ID
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id: req.params.id})

    if (!tour) {
        return next(new AppError('No tour found with that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
})

// ? Handling POST requests
const createTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    })
})


// ? Handling PATCH requests
const updateTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!tour) {
        return next(new AppError('No tour found with that id', 404));
    }

    res.status(200).send({
        status: 'success',
        tour
    })
})

// ? Handling DELETE requsts
const deleteTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
        return next(new AppError('No tour found with that id', 404));
    }

    res.status(204).send({
        status: 'success',
        data: null
    })
})

const getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
        {
            $match: { // - filters documents (like a WHERE clause)
                ratingsAvg: { $gte: 4.5 }
            }
        },
        {
            $group: { // - groups documents and computes aggregates
                _id: { $toUpper: '$difficulty' }, // group by difficulty
                numTours: { $sum: 1 },
                numRating: { $sum: '$ratingsQuantity' }, // to calculate all ratings quantity
                avgRating: { $avg: '$ratingsAvg' }, // to calculate average rating of ratingsAvg field
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' }, // to calculate min price
                maxPrice: { $max: '$price' }, // max price
            }
        },
        {
            $sort: { // sort by any field that we specified above
                avgPrice: 1
            }
        },
        // {
        //     $match: { // We can also repeat stages
        //         _id: { $ne: 'EASY' } // select all that not equal to EASY
        //     }
        // }
    ])

    res.status(200).send({
        status: 'success',
        data: {
            stats
        }
    })
})

const getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
        {
            $unwind: '$startDates' // * split arrays into individual docs
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTours: { $sum: 1 },
                tours: {
                    $push: '$name'
                }
            }
        },
        {
            $addFields: { // To add new field
                month: '$_id' // add 'month' as a copy of '_id'
            }
        },
        {
            $project: { // * $project controls what fields appear in your output — you can show, hide, or rename fields.
                _id: 0 // hides id field
            }
        },
        {
            $sort: {
                numToursStarts: -1
            }
        },
        // {
        //     $limit: 6 // * to show only 6 documtns
        // }
    ])

    res.status(200).send({
        status: 'success',
        data: {
            plan
        }
    })
})

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan };