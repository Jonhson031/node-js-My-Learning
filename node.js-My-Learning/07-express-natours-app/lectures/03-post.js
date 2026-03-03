const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Use middleware
app.use(express.json()); // built in middleware

// ? Routing in Node.js determines how an application responds to a client request for a specific endpoint

const tours = JSON.parse(fs.readFileSync(path.join(__dirname, 'dev-data', 'data', 'tours-simple.json')));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
})

// ? Handling POST requests
app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = { id: newId, ...req.body };

    tours.push(newTour);

    // Send data to JSON file
    fs.writeFile((path.join(__dirname, 'dev-data', 'data', 'tours-simple.json')), JSON.stringify(tours), err => {
        if(err){
            console.error(err);
            return;
        }
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
}); 