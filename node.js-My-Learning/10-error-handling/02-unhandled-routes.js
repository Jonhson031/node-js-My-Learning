// ? Handling Unhandled Routes
// * If a user tries to access a route that doesn't exist, we want to send back a 404 error message
app.all('/{*any}', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server`
    });
})