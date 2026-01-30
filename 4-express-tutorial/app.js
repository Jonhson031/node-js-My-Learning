const express = require('express');
const app = express();

const peopleRouter = require('./routes/people');
const loginRouter = require('./routes/login');

// static assets
app.use(express.static('./methods-public'));

// parse form data
app.use(express.urlencoded({ extended: false })); // parse form data
app.use(express.json()); // parse JSON body

// Use router
app.use('/api/people', peopleRouter);
app.use('/login', loginRouter);


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})

