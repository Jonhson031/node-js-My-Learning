// ? Handling DB errors

// * 1) Handling ID errors
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400);
}

// * 2) Handling Duplicate Database Fields
const handleDuplicateFieldsDB = (err) => {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate field: ${field}, with the value of ${err.keyValue[field]}. Please use another value!`;
    return new AppError(message, 400);
}

// * Handling Mongoose Validation Errors: 
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map(e => e.message);
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400);
}

module.exports = (err, req, res, next) => {
    // Shows where the error happened
    // console.log(stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = Object.create(err);

        // Throw generic error when wrong id
        if (error.name === 'CastError') {
            error = handleCastErrorDB(error);
        }

        // Throw error when duplicate fields happen
        if (error.code === 11000) {
            error = handleDuplicateFieldsDB(error);
        }

        // Throw error when validation error happen
        if (error.name === 'ValidationError') {
            error = handleValidationError(error);
        }

        sendErrorProd(error, res);
    }
}