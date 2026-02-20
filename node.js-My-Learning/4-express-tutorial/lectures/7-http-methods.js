const express = require('express');
const app = express();

const { products, people } = require('./data.js');

// static assets
app.use(express.static('./methods-public'));

// parse form data
app.use(express.urlencoded({ extended: false })); // parse form data
app.use(express.json()); // parse JSON body

// GET method: get data from server
app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people });
})

// POST method: send data to server 
// ? Form example
app.post('/login', (req, res) => {
    const { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    }
    res.status(401).send('Please provide your name <br> <a href="index.html">Go back</a>');
})

// ? POST method (JS example)
app.post('/api/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide name value' });
    }
    res.status(201).json({ success: true, person: name });
})

// Postman - POST method example:
app.post('/api/postman/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(404).json({ success: false, msg: 'please provide name value' })
    }
    res.status(200).json({ success: true, data: [...people, name] });
})

// PUT method: update data on server
app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const person = people.find((person) => person.id === Number(id));
    if (!person) {

        return res.status(404).json({ success: false, msg: `No person with id ${id}` });
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    });
    res.status(200).json({ success: true, data: newPeople });
});

// Delete method: delete data from server
app.delete('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const person = people.find((person) => person.id === Number(id));
    if (!person) {
        return res.status(404).json({ success: false, msg: `No person with id ${id}` });
    }
    const newPeople = people.filter(person => person.id !== Number(id));
    res.status(200).json({ success: true, data: newPeople });
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})

