//Controllers for User class

const Users = require("./../../db/models/user.schema");
const bcrypt = require("bcryptjs");
const Utility = require('../services/utility.services');
const EmailService = require("../services/email.services");

class User {
    async signUp(req,res) {
        let {name, email, password} = req.body;

        try{
            //Validate SignUp

            const user = await Users.findOne({email});
            //  If user is has already registered
            if(user){
            
                // Unverified Account
                if(user.verification === false){
                
                    //Send a verification mail again
                    let Mail = new EmailService();
                    Mail.sendVerificationMail(user.token, user._id, user.email, user.name, (response) => {
                        //  Verification mail sent
                        return res.status(200).json({error:false, message: "User exists but unverified: Please verify your email first !"});
                    });
                }
        
                //Else if Acc has also been verified
                else{
                    return res.status(200).json({eror:false, message:"User Already Exists !"})
                }
            }

            // Case: New User
            else {
            
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
                        //  Signup Successful
                        res.status(201).json({message: "A Link to verify your email has been sent !"});
                    } 
                    else {
                        //  Signup Successful & but failed to send verification mail
                        res.status(500).json({message: "Failed to send verification mail"});
                    }
                });
            }

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
