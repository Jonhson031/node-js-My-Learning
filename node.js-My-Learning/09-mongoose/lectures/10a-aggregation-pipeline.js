// ? Aggregation Pipeline: Matching and Grouping
// * It's a way to process and transform documents through a series of stages, where the output of one stage becomes the input of the next

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
            {
                $match: { // We can also repeat stages
                    _id: { $ne: 'EASY' } // select all that not equal to EASY
                }
            }
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