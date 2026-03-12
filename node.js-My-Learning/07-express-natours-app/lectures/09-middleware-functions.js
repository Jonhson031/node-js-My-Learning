// ? Chaining multiply Middleware functions
const checkBody = (req, res, next) => {
    // Checks if user specified name and price
    if (!req.body.name) {
        return res.status(404).json({
            status: 'fail',
            message: 'Name is Required'
        })
    }

    if (!req.body.price) {
        return res.status(404).json({
            status: 'fail',
            message: 'Price is Required'
        })
    }

    next();
}
