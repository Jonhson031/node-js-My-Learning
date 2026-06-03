// * User Roler and Permissions
// * We want to restrict certain actions to certain users. For example, only admin and lead-guide can delete tours, but normal users cannot delete tours.
// * So we need to implement user roles and permissions in our application.

// 1. Add role field in user model
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
});

// 2. Create restrictTo middleware in authController
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array of allowed roles, e.g. ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};

// 3. Use restrictTo middleware in tour routes
router
  .route('/:id')
  .get(authController.protect, getTour)
  .patch(authController.protect, updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour,
  );
