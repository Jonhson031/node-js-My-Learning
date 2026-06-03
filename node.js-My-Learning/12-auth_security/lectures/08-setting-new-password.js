// * Reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    // find user by a token
    passwordResetToken: hashedToken,

    // check if token has not expired
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) Set the new password if token has not expired and there's a user
  if (!user) return next(new AppError('Token is invalid or expired!', 400));

  // set new password and reset token
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changePasswordAt property for the user
  // ? We do it in the middlawer inside userModel.js

  // 4) Log the user in, send JWT

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

// * Create middleware to update changePasswordAt for user who reset their password
userSchema.pre('save', async function () {
  if (!this.isModified('password') || this.isNew) return;

  this.passwordChangedAt = Date.now() - 1000;
});
