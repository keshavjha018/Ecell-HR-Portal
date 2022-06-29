const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    verification: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default : false
    },
    complaints: {
        type: Array,
        default: []
    },
    token: {
        type: String,
        default: ""
    }
},
{timestamps: true}
);

module.exports = mongoose.model("User", userSchema);