const mongoose = require('mongoose');
const loginDetails = require('../model/loginDetails');

const expenseDetailsSchema = new mongoose.Schema({
    expense_amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    Id:{
        type:String,
        required:true
    },
    user: {
        type: Object,
        ref: 'loginDetails',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('expenseDetail', expenseDetailsSchema);
