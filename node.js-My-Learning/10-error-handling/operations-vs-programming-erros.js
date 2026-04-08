// ? Operaitonal vs Programming errors:

/*//* Operaitonal (expected) errors happen when;
- Invalid Input
- User not found
- Unauthrozied 
👉 Use AppError classess */

/*//* Programming (bugs) erorrs happen when:
- Undefined variable
- Null pointer
- Logic Mistakes 
👉Let app crash or log heavily */


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