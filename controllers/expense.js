const expenseDetails=require('../model/expenseData');
exports.postDetails=async (req,res,next)=>{
    try{
        const expenseAmt=req.body.expense_amount;
        const des=req.body.description;
        const cat=req.body.category;
        const response=await expenseDetails.create({
            expense_amount:expenseAmt,
            description:des,
            category:cat
        })
        res.status(200).json({expenseData:{response}});
    }catch(error){
        console.log(error);
    }
}
exports.getDetails= async (req,res,next)=>{
    try{
        const getExpense=await expenseDetails.findAll();
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