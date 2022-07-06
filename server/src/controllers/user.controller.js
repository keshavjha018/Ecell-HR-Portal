//Controllers for User class

const Users = require("./../../db/models/user.schema");
const bcrypt = require("bcryptjs");
const Utility = require('../services/utility.services');
const EmailService = require("../services/email.services");

class User {
    async signUp(req,res) {
        let {name, email, password} = req.body;

        //Email Should be unique & include @iiitdwd.ac.in
        if(!Utility.uniqueEmail(email)){return res.status(400).json("Email Already Used !")}

        try{
            //Hash Password
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            //Store Details
            const details = new Users({
                name: name,
                email: email,
                password: password,
            })

            //Save
            var newUser = await details.save();

            //Generate & Store JWToken in db
            const Token = await details.generateAuthToken();
            await newUser.updateOne({token: Token});

            //save Token in cookie
            res.cookie("jwt", Token, {
                expires: new Date(Date.now() + 604800000),
                httpOnly: true,
                // secure: true   //allows only https connections
            });

            //Send verification Mail
            let Mail = new EmailService();
            Mail.sendVerificationMail(Token, newUser._id, newUser.email, newUser.name, (response) => {
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
        catch(e) { res.status(404).json(e)}
    }
    
    async get(req,res){
        try{
            const {id}=req.params;
            const data= await Users.findById(id);
            res.status(200).json(data);           
            
        }
        catch(error){
            res.status(404).json(error)
            console.log(error);
        }
    }
}

module.exports = User;
