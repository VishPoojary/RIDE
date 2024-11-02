// const Ride = require('../models/Ride');
// const User = require('../models/User');
// const crypto = require('crypto');

// exports.bookRide = async (req, res) => {
//     const { startpoint, destination, totalPassengers } = req.body;
//     const passenger = req.user.id;

//     try {
//         let ride = new Ride({
//             startpoint,
//             destination,
//             totalPassengers,
//             passenger,
//             rideCode: crypto.randomBytes(4).toString('hex')
//         });

//         await ride.save();
//         res.json(ride);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// exports.bidRide = async (req, res) => {
//     const { startpoint, destination, seats, bid } = req.body;
//     const driver = req.user.id;

//     try {
//         let ride = await Ride.findOne({
//             startpoint,
//             destination,
//             status: 'pending'
//         });

//         if (!ride) {
//             return res.status(404).json({ msg: 'Ride not found' });
//         }

//         if (ride.bid !== bid) {
//             return res.status(400).json({ msg: 'Invalid bid amount' });
//         }

//         ride.driver = driver;
//         ride.seats = seats;
//         ride.status = 'booked';
//         await ride.save();

//         res.json(ride);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

// exports.getRides = async (req, res) => {
//     try {
//         const rides = await Ride.find().populate('passenger driver', '-password');
//         res.json(rides);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// };

const Ride = require('../models/Ride');
const { v4: uuidv4 } = require('uuid');

// Controller for booking a ride
exports.bookRide = async (req, res) => {
    const { startpoint, destination, totalPassengers } = req.body;
    try {
        const ride = new Ride({
            startpoint,
            destination,
            totalPassengers,
            user: req.user.id,
            status: 'pending'
        });
        await ride.save();
        res.json(ride);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Controller for bidding on a ride
exports.bidRide = async (req, res) => {
    const { rideId, seats, bidAmount } = req.body;
    try {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ msg: 'Ride not found' });
        }
        ride.bids.push({ driver: req.user.id, seats, bidAmount });
        ride.status = 'bidded';
        await ride.save();
        res.json(ride);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Controller for getting all rides
exports.getRides = async (req, res) => {
    try {
        const rides = await Ride.find().populate('user').populate('bids.driver');
        res.json(rides);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Controller for getting rides for a specific user (passenger or driver)
exports.getUserRides = async (req, res) => {
    try {
        const rides = await Ride.find({ user: req.user.id }).populate('bids.driver');
        res.json(rides);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Controller for accepting a bid
exports.acceptBid = async (req, res) => {
    const { rideId, bidId } = req.body;
    try {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ msg: 'Ride not found' });
        }
        const bid = ride.bids.id(bidId);
        if (!bid) {
            return res.status(404).json({ msg: 'Bid not found' });
        }
        ride.acceptedBid = bid;
        ride.secretCode = uuidv4();
        ride.status = 'accepted';
        await ride.save();
        res.json(ride);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
