const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourConroller');
const authController = require('../controllers/authController');

const router = express.Router();

// ? Param Middleware
// router.param('id', checkId);

router
  .route('/top-5-cheap')
  .get(authController.protect, aliasTopTours, getAllTours);

router.route('/tour-stats').get(authController.protect, getTourStats);

router.route('/monthly-plan/:year').get(authController.protect, getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, getAllTours)
  .post(authController.protect, createTour);

router
  .route('/:id')
  .get(authController.protect, getTour)
  .patch(authController.protect, updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour,
  );

module.exports = router;
