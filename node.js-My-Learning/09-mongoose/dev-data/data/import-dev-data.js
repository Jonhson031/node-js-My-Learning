const fs = require('fs');
const path = require('path');
const Tour = require('../../models/tourModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../../config.env' }); // load FIRST before anything else

// * Connecting MongoDB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
    .then((con) => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });

// Read JSON file
const tours = JSON.parse(fs.readFileSync(path.join(__dirname, 'tours-simple.json'), 'utf-8'));

// Import data into Database
const importData = async function () {
    try {
        await Tour.create(tours);
        console.log('Data succesfully loaded!');
    } catch (err) {
        console.error(err);
    }
    process.exit();
}

// Delete all data from collection
const deleteData = async function () {
    try {
        await Tour.deleteMany();
        console.log('Data succesfully deleted!');
    } catch (err) {
        console.error(err);
    }
    process.exit();
}

console.log(process.argv);

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
