// ? Creating and Mounting Multiply Routes
// Divide routes function into separate files and then connect all them inside main file (could be app.js or index.js)


// Refactoring our routes
const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// ? Implementing Users routes
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/').get(getUser).patch(updateUser).delete(deleteUser);
