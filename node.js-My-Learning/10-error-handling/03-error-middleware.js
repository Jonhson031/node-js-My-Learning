// ? Handling Unhandled Route
app.all('/{*any}', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server`
    // });
    const err = new Error(`Can't find ${req.originalUrl} on this server`);
    err.status = 'fail';
    res.statusCode = 404;


    // * Skips all the others middlewares in the stack and goes straight to error middleware
    next(err);
})

// ? Error Handling Middleware
// * If there's four parameters inside a function, then Express identifies it as error handling middleware
app.use((err, req, res, next) => {
    // Shows where the error happened
    console.log(stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})


// ? We can rafactor this error handler into class in separate file:
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(`4`) ? 'fail' : 'error';
        this.isOperation = true; // checks if error is expected (operational) or unexpected (programming)

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;

app.all('/{*any}', (req, res, next) => {
    // * Skips all the others middlewares in the stack and goes straight to error middleware
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})