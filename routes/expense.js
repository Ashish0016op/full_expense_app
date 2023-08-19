const express=require('express');
const router=express.Router();
const expenseDetails=require('../controllers/expense');
router.post('/expense',expenseDetails.postDetails);
router.get('/get_expense',expenseDetails.getDetails);
router.delete('/delete_expense/:id',expenseDetails.deleteDetails);
module.exports=router;