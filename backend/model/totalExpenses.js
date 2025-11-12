// totalExpenses model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const signCred=require('../model/loginDetails');
const totalExpensesSchema = new Schema({
    totalExpense: {
        type: Number,
        required: true
    },
    Id:{
        type:String,
        required:true
    },
    user: {
        type: Object,
        required: true
    }
});

const TotalExpenses = mongoose.model('TotalExpenses', totalExpensesSchema);

module.exports = TotalExpenses;
