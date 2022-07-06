//Frequently used functions

const User = require('../../db/models/user.schema');
const { v4: uuidv4 } = require("uuid");

const uniqueEmail = async(email)=>{
    try{
        let presence = await User.findOne({email});
        if(presence===null) return true;
        else return false;
    }catch(error) {console.log(error);}
}

const generateToken = async() => {
    const token = uuidv4();
    return token;
}

const verifiedUser = async(id) =>{
    try{
        let user = await User.findById(id);
        if(user.verification === true) {
            return true;
        }else{return false}
    }catch(e){
        console.log(error);
        return false;
    }
}

module.exports = {uniqueEmail, generateToken, verifiedUser};