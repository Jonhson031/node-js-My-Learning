const express = require('express');

const app = express();

// ? Routing in Node.js determines how an application responds to a client request for a specific endpoint

// app.get('/', (req, res) => {
//     res.status(200).send('Hello')
// })

// app.post('/', (req, res) => {
//     res.status(200).send('You can post.')
// })



app.listen(3000, () => {
    console.log('http://localhost:3000');
}); 