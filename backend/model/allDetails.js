const mongoose=require('mongoose');

const AllDetails=new mongoose.Schema({
    Name:{
        tyep:String,
        require:true
    },
    totalAmount:{
        type:Number,
        require:true
    },
    
})
module.exports=mongoose.model('AllDetail',AllDetails);