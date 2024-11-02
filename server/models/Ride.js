// const mongoose = require('mongoose');

// const rideSchema = new mongoose.Schema({
//     startpoint: String,
//     destination: String,
//     totalPassengers: Number,
//     passenger: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     bid: Number,
//     rideCode: String,
//     status: { type: String, enum: ['pending', 'booked'], default: 'pending' }
// });

// module.exports = mongoose.model('Ride', rideSchema);

const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    bidAmount: {
        type: Number,
        required: true
    }
});

const RideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startpoint: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    totalPassengers: {
        type: Number,
        required: true
    },
    bids: [BidSchema],
    acceptedBid: {
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        seats: Number,
        bidAmount: Number
    },
    secretCode: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'bidded', 'accepted'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Ride', RideSchema);
