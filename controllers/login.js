
const loginDetails=require('../model/loginDetails');
exports.getDetails=async (req,res,next)=>{
    try {
        const details=await loginDetails.findAll();
        res.status(200).json({userDetails:details});
    } catch (error) {
        console.log(error);
    }
    
}