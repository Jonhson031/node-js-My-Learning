// ? Routes for handling people-related requests

const express = require('express');
const router = express.Router();

const { getPeople, createPerson, createPersonPostman, updatePerson, deletePerson } = require('../controllers/people');

// // GET method: get data from server
// router.get('/', getPeople);

// // POST method: send data to server 
// // ? POST method (JS example)
// router.post('/', createPerson);

// // Postman - POST method example:
// router.post('/postman', createPersonPostman);
// // PUT method: update data on server
// router.put('/:id', updatePerson);
// // Delete method: delete data from server
// router.delete('/:id', deletePerson);

// ? Another way to define routes
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);


module.exports = router;