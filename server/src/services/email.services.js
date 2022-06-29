require("dotenv").config();
const Utility = require("./Utility.services");
const nodemailer = require("nodemailer");
const Users = require("./../../db/models/user.schema");


let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: "20bcs070@iiitdwd.ac.in",
        pass: process.env.EMAIL_PASS
    },
    tls:{
        rejectUnauthorized: false
    }
});

let mailInfo = {
    from: "HR Portal <20bcs070@iiitdwd.ac.in>",
    to: "",
    subject: ""
};

const apiHostUrl = "http://localhost:8000/api/auth";

class Email {

    sendVerificationMail = async(userId, userEmail, userName, callback) => {
        let subject = "Email Verification | HR Portal 📧";

        
        try{
            //Generate & Store Token
            const Token = await Utility.generateToken();
            await Users.findByIdAndUpdate(userId, {token: Token});
    
            const verificationLink = apiHostUrl + `/mailVerification/${userId}/${Token}`;
            const message = `Hey ${userName} ! Please click this Link to verify your Email before Logging in  :: ${verificationLink}`;
    
            mailInfo.subject = subject
            mailInfo.to = userEmail
            mailInfo.html = message

            transporter.sendMail(mailInfo, function(err, info){
                if (err) {
                    // return(console.callback(error));
                    console.log(userEmail, userName);
                    callback(err);
                } else {
                    // return(callback(200));
                    console.log('Email sent: ' + info.response);
                    callback(200);
                }
            })
        }
        catch (error) {
            console.log(error);
            callback(400);
        }
    }
}

module.exports = Email;