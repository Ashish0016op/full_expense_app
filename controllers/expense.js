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
        const totalExpRecord = await expsAmt.findOne({where:{signupDatumId:userId}});
        let totalExp = 0;
        if (totalExpRecord) {
            totalExp = totalExpRecord.totalExpense + parseInt(expenseAmt);
        } else {
            totalExp = parseInt(expenseAmt);
        }

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
exports.deleteDetails = async (req, res, next) => {
    const expenseId = req.params.id;
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, config.secretKey);
        const userId = decodedToken.id;
        console.log(token);
        console.log(decodedToken);
        console.log(userId);
        const transaction = await expenseDetails.sequelize.transaction();

        try {
            const expenseToDelete = await expenseDetails.findOne({
                where: { id: expenseId, signupDatumId: userId },
                transaction
            });

            if (!expenseToDelete) {
                throw new Error('Expense not found');
            }
            await expenseToDelete.destroy({ transaction });
            const totalExpRecord = await expsAmt.findOne({where:{signupDatumId:userId}});
            if (totalExpRecord) {
                totalExpRecord.totalExpense -= expenseToDelete.expense_amount;
                await totalExpRecord.save({ transaction });
            }
            await transaction.commit();

            res.status(200).json({ message: 'Expense deleted successfully' });
        } catch (error) {
            await transaction.rollback();
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the expense' });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};
