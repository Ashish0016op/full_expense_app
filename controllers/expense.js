const mongoose=require('mongoose');
const expenseDetails=require('../model/expenseData');
const TotalExpenses=require('../model/totalExpenses');
const config=require('../configuration/config');
const jwt=require('jsonwebtoken');
const AWS=require('aws-sdk');
const { use } = require('../routes/expense');
const loginDetails = require('../model/loginDetails');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
exports.postDetails=async (req,res,next)=>{
    try {
        const expenseAmt = req.body.expense_amount;
        const des = req.body.description;
        const cat = req.body.category;
        const userId = req.user.id;
        console.log("hello");
        const UserDetails=await loginDetails.findById({_id:userId});
        const newExpense = await expenseDetails.create({
            expense_amount: expenseAmt,
            description: des,
            category: cat,
            Id:userId,
            user: UserDetails,
        });
        await newExpense.save();
        if (cat !== 'Income') {
            let totalExpRecord = await TotalExpenses.findOne({Id:userId});
            console.log("total expes is",totalExpRecord);
            if (!totalExpRecord) {
                totalExpRecord = await TotalExpenses.create({
                    totalExpense: 0,
                    user: UserDetails,
                    Id:userId
                });
            }
            totalExpRecord.totalExpense = parseInt(totalExpRecord.totalExpense)+parseInt(expenseAmt);
            totalExpRecord.user=UserDetails;
            const totalAmount=await totalExpRecord.save();
            //console.log("total exp is",totalAmount);
            const loginDetails1 = await loginDetails.findOne({ _id: userId });
            loginDetails1.totalExp = totalExpRecord._id;
            //console.log("loginDetails1 is",loginDetails);
            await loginDetails1.save();
        }
        res.status(200).json({ expenseData: { newExpense } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    
}

exports.getDetails = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;

        const offset = (page - 1) * itemsPerPage;

        const expenses = await expenseDetails.find({ 
            Id:userId       
        }).limit(itemsPerPage).skip(offset);
        const count = await expenseDetails.countDocuments({Id:userId});
        console.log("expense is",expenses.getExpense);
        res.status(200).json({
            getExpense: expenses,
            currentPage: page,
            itemsPerPage: itemsPerPage,
            totalItems: count,
            hasNextPage: itemsPerPage * page < count,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(count / itemsPerPage)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
exports.downloadExpense = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const getExpense = await expenseDetails.find({Id:userId});
        console.log("expense is ",getExpense);
        const stringifyExpense = JSON.stringify(getExpense, null, 2);
        const directory = path.join(__dirname, `Expense${userId}`);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }
        const filename = path.join(directory, `${new Date().toISOString().replace(/:/g, '-')}.json`);
        fs.writeFileSync(filename, stringifyExpense);
        res.download(filename, 'expenses.json', (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false });
            } else {
                fs.unlinkSync(filename);
            }
        });
        console.log(getExpense);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
};

    exports.deleteDetails = async (req, res, next) => {
        try {
            console.log(req.params);
            const expenseId = req.params.expenseId;
            const userId = req.user.id;
            console.log("expenseId is",expenseId);
            console.log("userId is",userId);
            if (!mongoose.Types.ObjectId.isValid(expenseId)) {
                return res.status(400).json({ error: 'Invalid expense ID' });
            }
            const user = await loginDetails.findById(userId);
            if (!user) {
                return res.status(401).json({ error: 'Unauthorized: User not found' });
            }
            const deletedExpense = await expenseDetails.findOneAndDelete({_id:expenseId });
            let totalExpRecord = await TotalExpenses.findOne({ Id: userId });

            if (totalExpRecord) {
                totalExpRecord.totalExpense -= deletedExpense.expense_amount;
                await totalExpRecord.save();
            }
            
            if (!deletedExpense) {
                return res.status(404).json({ error: 'Expense not found or not authorized for deletion' });
            }    
            res.status(200).json({ message: 'Expense deleted successfully', deletedExpense });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the expense' });
        }
    };
