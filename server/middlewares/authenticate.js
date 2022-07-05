const Users = require("../db/models/user.schema");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("dotenv").config();

const loginRequired = async(req,res,next)=> {

    try {
        const token = req.cookies.jwt;      //"jwt" = cookie name
        if(token) {
            const validToken = jwt.verify(token, process.env.JWT_SECRET);

            if(validToken){
                res.user = validtoken.id;
                next();
            }
            else{
                console.log("Token Expired");
                res.redirect("/user/login");
            }
        }
        else{
            console.log("Token Not Found");
            res.redirect("/user/login");
        }
    }catch(e) {res.status(401).json(e)}
}

module.exports = loginRequired;