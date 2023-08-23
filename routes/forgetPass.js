const express=require('express');
const router=express.Router();
const forgetPassControllers=require('../controllers/forgetPass');
const middlewareAuth=require('../middleware/auth');
router.post('/sendEmail',middlewareAuth.authenticate,forgetPassControllers.postForgetPass);






module.exports=router;