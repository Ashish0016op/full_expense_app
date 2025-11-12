const mongoose=require('mongoose');

const Forgotpassword = new mongoose.Schema({
    active:{
        type:Boolean
    },
    expiresby:{
        type:Date
    }
    
})

module.exports = mongoose.model('ForgotPassword',Forgotpassword);