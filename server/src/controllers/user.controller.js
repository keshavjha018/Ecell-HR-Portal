//Controllers for User class

const Users = require("./../../db/models/user.schema");
const bcrypt = require("bcryptjs");
const Utility = require('../services/Utility.services');
const EmailService = require("../services/email.services");

class User {
    async signUp(req,res) {
        const data = req.body;
        let pass = data.password;

        //Email Should be unique & include @iiitdwd.ac.in
        if(!Utility.uniqueEmail(data.email)){return res.status(400).json("Email Already Used !")}

        try{
            //Hash Password
            const salt = await bcrypt.genSalt(10);
            pass = await bcrypt.hash(pass, salt);

            //Store Details
            const details = new Users({
                name: data.name,
                email: data.email,
                password: pass,
            })

            //Save
            const newUser = await details.save();

            //Registration Successful

            //Send verification Mail
            let Mail = new EmailService();
            Mail.sendVerificationMail(newUser._id, newUser.email, newUser.name, (response) => {
                console.log(response);
                if (response == 200) {

                    //  Signup Successfull & verification mail send
                    res.status(201).json(newUser);
                } 
                else {

                    //  Signup Successfull & but fail to send verification mail
                    res.status(500).json(newUser);
                }
            });
        }
        catch(e) { res.status(404).json(error)}
    }
}

module.exports = User;