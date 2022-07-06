require("dotenv").config();
const Utility = require("./utility.services");
const nodemailer = require("nodemailer");
const Users = require("./../../db/models/user.schema");
const Complaints = require("./../../db/models/complaint.schema");


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

const apiHostUrl = "http://localhost:8000/api/auth/";

class Email {

    sendVerificationMail = async(Token, userId, userEmail, userName, callback) => {
        let subject = "Email Verification | HR Portal 📧";

        
        try{
            const verificationLink = apiHostUrl + `mailverification/${userId}/${Token}`;
            const message = `Hey ${userName} ! <br> Please click this Link to verify your Email before Logging in  :: ${verificationLink}`;
    
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

    complaintRegistered = async (id) => {
        const complaint = await Complaints.findById(id).populate('userId');
        let subject = "Complaint Registered";

        try {
            let bodyContent = `Hey, ${complaint.userId.name} <br> <br> Your complaint is successfully registered. <br>We will solve it as soon as possible<br> 
                Complaint details:<br>
                Name: ${complaint.userId.name} <br>
                Reg No:${complaint.userId.regNo} <br>
                ComplaintId: ${complaint._id} <br>
                Subject: ${complaint.subject} <br>
                offender: ${complaint.offender} <br>
                More Information: <br><br>  
            This mail is auto generated. Do not Reply`; //paste the respective link in More Information
            mailInfo.subject = subject;
            mailInfo.to = complaint.userId.email;
            mailInfo.html = bodyContent;
            transporter.sendMail(mailInfo, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Email;