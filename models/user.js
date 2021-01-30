const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    googleId: String,
    email: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('User', UserSchema);