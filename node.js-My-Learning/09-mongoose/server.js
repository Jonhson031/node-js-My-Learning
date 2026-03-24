const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // load FIRST before anything else

// * Connecting MongoDB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
    .then((con) => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("Database connection error:", err);
    });


const app = require('./app');

// console.log(process.env); // to see all env variables in the console

const PORT = process.env.PORT || 3000;   // use env variable
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
}); 