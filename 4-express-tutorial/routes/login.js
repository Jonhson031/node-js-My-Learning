// ? Route for login

const express = require('express');
const router = express.Router();

// POST method: send data to server 
// ? Form example
router.post('/', (req, res) => {
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    }
    res.status(401).send('Please provide your name <br> <a href="index.html">Go back</a>');
})

module.exports = router;