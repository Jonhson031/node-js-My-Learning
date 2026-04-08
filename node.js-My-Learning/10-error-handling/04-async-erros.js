// ? Catching errors in Async Functions

// * Async Wrapper
// Allows us to wrap all try/catch blocks inside this catchAsync functions and to send all errors to error middleware
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

const createTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    })
})

// * Global Async Error Flow:
/* 
1) Async functions > throws eror
2) catchAsync catches it
3) next(err)
4) Global Error middleware
5) Client gets response
*/