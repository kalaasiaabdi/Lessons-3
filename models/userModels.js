const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    resetToken: {
        type: String,
        trim: true,
    },
   restTokenexpiration: {
        type: Date,
        trim: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true }); 

const User = mongoose.model ('user' , userSchema)

module.exports = User
