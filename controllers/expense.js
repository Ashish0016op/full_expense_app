const expenseDetails=require('../model/expenseData');
const expsAmt=require('../model/totalExpenses');
const config=require('../configuration/config');
const jwt=require('jsonwebtoken');
exports.postDetails=async (req,res,next)=>{
    try{
        const expenseAmt=req.body.expense_amount;
        const des=req.body.description;
        const cat=req.body.category;
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, config.secretKey);
        const userId = decodedToken.id;
        const response=await expenseDetails.create({
            expense_amount:expenseAmt,
            description:des,
            category:cat,
            signupDatumId:userId,
            
        })
        const totalExpRecord = await expsAmt.findOne();
        const totalExp = totalExpRecord ? totalExpRecord.totalExpense + parseInt(expenseAmt) : parseInt(expenseAmt);

        // Update or create the total expenses record
        if (totalExpRecord) {
            await totalExpRecord.update({ totalExpense: totalExp });
        } else {
            await expsAmt.create({
                 totalExpense: totalExp,
                 signupDatumId:userId,
            });
        }
        res.status(200).json({expenseData:{response}});
    }catch(error){
        console.log(error);
    }
}
exports.getDetails= async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, config.secretKey);
        const userId = decodedToken.id;
        const getExpense=await expenseDetails.findAll({where:{signupDatumId: userId}});
        res.status(200).json({getExpense});
    }catch(error){
        console.log(error);
    }
}
exports.deleteDetails=async (req,res,next)=>{
    const expenseId=req.params.id;
    await expenseDetails.destroy({where:{id:expenseId}});
    res.status(200);
}