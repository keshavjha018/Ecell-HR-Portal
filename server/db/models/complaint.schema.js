const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },
    subject: {
        type: String,
        required: true,
        trim:true
    },
    offender: {
        type: String,
        required: true,
        trim:true
    },
    type: {
        type: String,
        required : true,
    },
    description: {
        type: String,
        required : true,
        trim:true
    },
    disable: {
        type: Boolean,
        default: false
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Complaint", complaintSchema);