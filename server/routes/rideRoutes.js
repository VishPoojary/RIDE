// const express = require('express');
// const { bookRide, bidRide, getRides } = require('../controllers/rideController');
// const auth = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/book', auth, bookRide);
// router.post('/bid', auth, bidRide);
// router.get('/', auth, getRides);

// module.exports = router;

const express = require('express');
const rideController = require('../controllers/rideController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/book', auth, rideController.bookRide);
router.post('/bid', auth, rideController.bidRide);
router.get('/', auth, rideController.getRides);
router.post('/accept', auth, rideController.acceptBid);

module.exports = router;
