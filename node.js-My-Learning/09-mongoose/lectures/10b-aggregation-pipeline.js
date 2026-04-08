// ? Aggregation Pipeline: Unwinding and Projecting


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
                    _id: 0 // hide id field
                }
            },
            {
                $sort: {
                    numToursStarts: -1
                }
            },
            {
                $limit: 6 // * to show only 6 documtns
            }
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
