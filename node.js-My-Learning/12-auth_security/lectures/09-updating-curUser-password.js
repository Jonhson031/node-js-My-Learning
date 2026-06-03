// * Updating the CURRENT user password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, password, passwordConfirm } = req.body;
  if (!oldPassword)
    return next(new AppError('Please provide old password', 400));

  // 1) Get user from collection
  const { _id } = req.user;
  const user = await User.findOne({ _id }).select('+password');
  console.log(user);

  // 2) Check if posted password is correct
  if (!(await user.correctPassword(oldPassword, user.password))) {
    return next(new AppError('Your current password is wrong!', 401));
  }

  // 3) If password is correct, update password
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  // 4) Log user in with new password, send JWT
  createSendToken(user, 201, res);
});

const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// * Create instance method to check if password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// * Protecting routes
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401),
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser; // * Add current user to request object so that we can access it in the next middleware
  next();
});

// ? Router:
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword,
);
