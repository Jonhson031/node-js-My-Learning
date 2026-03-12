const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // load FIRST before anything else

const app = require('./app');

// console.log(process.env); // to see all env variables in the console

const PORT = process.env.PORT || 3000;   // use env variable
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
}); 