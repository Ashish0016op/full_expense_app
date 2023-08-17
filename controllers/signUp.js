
const signUp=require('../model/loginDetails')

exports.postDetails=async (req,res,next)=>{
    try{
        const Username=req.body.Username;
        const email=req.body.email;
        const pass=req.body.password;
        const postSignUpData=await signUp.create({
            Username:Username,
            email:email,
            password:pass
        })
        res.status(200).json({signUpData:postSignUpData});
    }catch (error){
        console.log(error);
    }

}
