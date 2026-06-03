const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'A user must have an email.'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        trim: true,
    }
})

const User = mongoose.model('lesson11-users', userSchema);


module.exports = User;