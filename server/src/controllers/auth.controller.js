const Users = require("../../db/models/user.schema");
const Utils = require("../services/Utility.services");
const bcrypt = require("bcryptjs");

class Auth {
    async emailVerification(req,res) {
        const { userId, token } = req.params;
        try {
            const user = await Users.findOne({_id:userId});
            if (user.token === token) {
            let post = await Users.updateOne({ verification: true });
            res.status(200).json(post);
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
                res.status(200).send(user);
            }else{
                res.status(400).json("Email Not Verified");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }
}

module.exports = Auth;