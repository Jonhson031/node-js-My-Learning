const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeauters');

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

const getAllTours = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message || err,
        })
    }
}


// ? Responding to URL parameters:
const getTour = async (req, res) => {
    try {
        // * Find tour by ID
        const tour = await Tour.findById(req.params.id);
        // Tour.findOne({_id: req.params.id})

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        })
    }
}

// ? Handling POST requests
const createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message || err,
        })
    }
}


// ? Handling PATCH requests
const updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).send({
            status: 'success',
            tour
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        })
    }
}

// ? Handling DELETE requsts
const deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).send({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        })
    }
}

const getTourStats = async (req, res) => {
    try {
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

    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        })
    }
}

const getMonthlyPlan = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        })
    }
}

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour, aliasTopTours, getTourStats, getMonthlyPlan };