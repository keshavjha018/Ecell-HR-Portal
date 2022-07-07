//Controllers for complaint class

const Users = require("./../../db/models/user.schema");
const Complaints = require("./../../db/models/complaint.schema");
const Utility = require("../services/Utility.services");
const EmailService = require("../services/email.services");

class Complaint {
    
    async create(req, res) {
        const { subject, offender, type, discription } = req.body;
        const { id } = req.params;
        try {
            if(await Utility.verifiedUser(id)){
                const post = new Complaints({
                    userId: id,
                    subject: subject,
                    offender: offender,
                    type: type,
                    discription: discription,
                });
                const newComplaint = await post.save();
                let Mail = new EmailService();
                Mail.complaintRegistered(newComplaint._id)
                //Save
                res.status(201).send(newComplaint);
            }
            else{
                res.status(400).json("User not verified");
            }
            //Store Details
        } catch (error) {
            res.status(404).json(error);
        }
    }

    async get(req, res) {
        const { id } = req.params;
        try {
            const complaint = await Complaints.findById(id);
            res.status(200).send(complaint);
        } catch (error) {
            res.status(404).json(error);
        }
    }

    async disable(req, res) {
        const { id } = req.params;
        try {
            const updateComplaint = await Complaints.findByIdAndUpdate(id, { disable:true});
            res.status(200).send(updateComplaint);
        } catch (error) {
            res.status(404).json(error);
        }
    }
}

module.exports = Complaint;
