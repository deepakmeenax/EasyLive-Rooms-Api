const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    password: String, 
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);