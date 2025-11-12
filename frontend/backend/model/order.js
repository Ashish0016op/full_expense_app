const mongoose=require('mongoose');
const order=new mongoose.Schema({
    paymentid:{
        type:String
    },
    orderid:{
        type:String
    },
    status:{
        type:String
    },
    
})

module.exports=mongoose.model('order',order);