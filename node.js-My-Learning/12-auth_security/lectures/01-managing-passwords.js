// * Managing Password

// * 1. Validate if passwordConfirm is equal as password
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'A password must have more or equal than 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // * Validate if passwordConfirm is equal as password
      // This only works on CREATE and SAVE!!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same',
    },
  },
});

// * 2. Password Encryption
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // * Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // * to not save passwordConfirm in database
  next();
});
