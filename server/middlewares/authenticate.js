const Users = require("../db/models/user.schema");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("dotenv").config();

const loginRequired = async(req,res,next)=> {

    try {
        const token = req.cookies.jwt;      //"jwt" = cookie name
        if(token) {
            const validToken = jwt.verify(token, process.env.JWT_SECRET);
            const user = await Users.findOne({_id:validToken._id  });
            if(!user){ 
                throw new Error("Authentication problem .....");
            }

            req.rootUser = user;
            req.token = token;
            next();

            // if(validToken){
            //     res.user = validToken.id;
            //     next();
            // }
            // else{
            //     console.log("Token Expired");
            //     res.redirect("/user/login");
            // }
        }
        else{
            console.log("Token Not Found");
            res.redirect("/user/login");
        }
    }catch(e) {res.status(401).json(e)}
}

module.exports = loginRequired;