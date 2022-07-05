const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


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

userSchema.methods.generateAuthToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id} ,process.env.JWT_SECRET);
        await this.save();
        return token;
    } catch(e) {
        resizeBy.status(400).json(e);
    }
}

module.exports = mongoose.model("User", userSchema);