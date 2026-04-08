// ? Errors During Development vs Production
// During development we want to send response for developers with full error details (stack trace, file, line)
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

// But during Production, we want to send eror in the way, that any user could understand it and also don't leak error details for security reasons.
const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else { // Programming or other unkown error, send generic error (don't leak error details)
        // 1) Log Erorr
        console.error('💥 ERROR, ', err);

        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        })
    }
}