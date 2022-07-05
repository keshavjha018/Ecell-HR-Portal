const Users = require("../../db/models/user.schema");
const Utils = require("../services/utility.services");
const bcrypt = require("bcryptjs");
const cookiee = require("cookie-parser");

class Auth {
    async emailVerification(req,res) {
        const { userId, token } = req.params;
        try {
            const user = await Users.findOne({_id:userId});
            if (user.token === token) {
                let data = await user.updateOne({ verification: true });
                res.status(200).json(data);
            } else {
                res.status(400).json("Invalid Link !!!");
            }
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    async UserLogin(req,res) {
        const {email, password} = req.body;
        try {
            const user = await Users.findOne({email: email});
            const isMatch = bcrypt.compare(password, user.password);
            if(isMatch && user.verification === true) {
                //create token
                const token = Utils.createJWT(iser._id);
                console.log(token); 
                //store token in cookie
                res.cookie('access-token', token);

                res.status(200).send(user);
            }else{
                res.status(400).json("Email Not Verified");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    async Logout(req,res) {
        res.cookie("access-token", "", {maxAge: 1});
        res.redirect("/userlogin");
    }
}

module.exports = Auth;