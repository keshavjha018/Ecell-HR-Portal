//Frequently used functions
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require('../../db/models/user.schema');
const { v4: uuidv4 } = require("uuid");

const uniqueEmail = async(email)=>{
    try{
        let presence = await User.findOne({email});
        if(presence===null) return true;
        else return false;
    }catch(error) {console.log(error);}
}

const generateToken = async() => {
    const token = uuidv4();
    return token;
}

const createJWT = async(id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

module.exports = {uniqueEmail, generateToken, createJWT};