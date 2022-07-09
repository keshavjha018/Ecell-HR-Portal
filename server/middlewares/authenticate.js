// This module verifies & validates JWT to protect routes 
// which we want only logged In users to access

const Users = require("../db/models/user.schema");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("dotenv").config();

const requiresAuth = async(req, res, next)=> {

    try {
        // Get JWT "token" named "jwt" from cookies [might not exist]
        const token = req.cookies.jwt;

        // Found
        if(token) {
            const validToken = jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken)=> {
                if(err){
                    console.log(err.message);
                    res.redirect("/login");
                }else {
                    console.log(decodedToken);
                    // const user = await Users.findOne({_id : decodedToken._id  });
                    // req.user  = user
                    next();
                }
            });
        
            // const user = await Users.findOne({_id:validToken._id  });

            // // CASE: Invalid or Expired Token
            // if(!user){ 
            //     throw new Error("Authentication problem .....");
            // }

            // req.rootUser = user;
            // req.token = token;
            // next();

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
            res.redirect("/login");
        }
    }catch(e) {res.status(401).json(e)}
}

module.exports = requiresAuth;