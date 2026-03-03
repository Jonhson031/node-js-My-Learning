const fs = require('fs');
const path = require('path');

// ? Routing in Node.js determines how an application responds to a client request for a specific endpoint
const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'dev-data', 'data', 'tours-simple.json')));


const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

// ? Responding to URL parameters:
const getTour = (req, res) => {
    // req.params returns string, so we need convert it into number
    const id = +req.params.id;

    const tour = tours.find(tour => tour.id === id);
    if (!tour) return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
    })

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

// ? Handling POST requests
const createTour = (req, res) => {
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = { id: newId, ...req.body };

    tours.push(newTour);

    // Send data to JSON file
    fs.writeFile((path.join(__dirname, '..', 'dev-data', 'data', 'tours-simple.json')), JSON.stringify(tours), err => {
        if (err) {
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
}


// ? Handling PATCH requests
const updateTour = (req, res) => {
    if (+req.params.id > tours.length) return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
    })

    res.status(200).send({
        status: 'success',
        data: 'Updated tour here.'
    })
}

// ? Handling DELETE requsts
const deleteTour = (req, res) => {

    if (+req.params.id > tours.length) return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID'
    })

    // Delete usually have 204 status respons
    res.status(204).send({
        status: 'success',
        data: null
    })
}

module.exports = {getAllTours, getTour, createTour, updateTour, deleteTour};