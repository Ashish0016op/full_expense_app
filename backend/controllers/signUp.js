
const signUp=require('../model/loginDetails')
const bcrypt=require('bcrypt');
exports.postDetails=async (req,res,next)=>{
    try{
        const Username=req.body.Username;
        const email=req.body.email;
        const pass=req.body.password;
        const saltRound=5;
        bcrypt.hash(pass,saltRound,async (err,hash)=>{
            if(err){
                console.log('error');
            }
            const postSignUpData=new signUp({
                Username:Username,
                email:email,
                password:hash
            })
            await postSignUpData.save();
            res.status(200).json({signUpData:postSignUpData});
        })
    }catch (error){
        console.log(error);
    }

}
