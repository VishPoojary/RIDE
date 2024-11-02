const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    phone: String,
    dob: Date,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['passenger', 'driver'] }
});

module.exports = mongoose.model('User', userSchema);
