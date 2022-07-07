const Users = require("../../db/models/user.schema");
const Utils = require("../services/utility.services");
const bcrypt = require("bcryptjs");
const cookiee = require("cookie-parser");

class Auth {
    async emailVerification(req, res) {
        const { userId, token } = req.body;
        try {
            const user = await Users.findById(userId);
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

    async UserLogin(req, res) {
        const { email, password } = req.body;
        try {
            const user = await Users.findOne({ email: email });
            if (!user) {
                return res.status(404).json("User Not Registered");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch === false) {
                return res.status(401).json("Incorrect Password");
            }

            if (user.verification === true) {
                const token = await user.generateAuthToken();

                //save token in cookie
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 604800000),
                    httpOnly: true,
                    // secure: true
                });

                console.log("Login Success", user);
                res.status(200).send(user);
            } else {
                res.status(400).json("Email Not Verified");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    async Logout(req, res) {
        res.cookie("access-token", "", { maxAge: 1 });
        res.redirect("/userlogin");
    }
}

module.exports = Auth;
