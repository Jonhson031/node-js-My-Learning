const express = require('express');
const {getAllTours, getTour, createTour, updateTour, deleteTour, checkId, checkBody} = require('../controllers/tourConroller');

const router = express.Router();

// ? Param Middleware
router.param('id', checkId);

router.route('/').get(getAllTours).post(checkBody,createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;