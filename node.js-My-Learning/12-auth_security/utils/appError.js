class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(`4`) ? 'fail' : 'error';
        this.isOperational = true; // checks if error is expected (operational) or unexpected (programming)

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;