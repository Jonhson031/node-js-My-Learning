// ? req.params
// it lets you get values from the URL path.

// ? Responding to URL parameters:
app.get('/api/v1/tours/:id', (req, res) => {
    // req.params returns string, so we need convert it into number
    const id = +req.params.id;
    if(id > tours.length) return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
     })

    const tour = tours.find(tour => tour.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
})
// And then we can use this url it like this: 
// http://localhost:3000/api/v1/tours/2


// ? Multiply Params
app.get('/users/:userId/orders/:orderId', (req, res) => {
  console.log(req.params);
});
// http://someapi/users/5/orders/99