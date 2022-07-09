const Users = require("../../db/models/user.schema");
const Utils = require("../services/utility.services");
const bcrypt = require("bcryptjs");
const cookiee = require("cookie-parser");
const EmailService = require("../services/email.services");


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
        
            //User not Exists
            if (!user) {
                return res.status(200).json({message:"User Not Registered"});
            }

            //User not Verified
            if(user.verification === false){
            
                //Send a verification mail again
                let Mail = new EmailService();
                Mail.sendVerificationMail(user.token, user._id, user.email, user.name, (response) => {
                    //  Verification mail sent
                });
                return res.status(200).json({
                    error:false, 
                    message: "Email is unverified: Please check your email !"
                });
            }

            // Checking Password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch === false) {
                return res.status(200).json({message:"Incorrect Password"});
            }


            //NOW PROCEED

            const token = await user.generateAuthToken();
            //save token in cookie
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 604800000),
                httpOnly: true,         // prevents cookie access via JS
                // secure: true
            });

            console.log("Login Success", user);
        
            res.status(200).json({userId: user._id, name: user.name, email: user.email , 
                                    message:"Login Successful", success:true
                                });

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
