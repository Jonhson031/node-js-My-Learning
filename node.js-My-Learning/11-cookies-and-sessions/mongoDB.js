const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
    .then((con) => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });