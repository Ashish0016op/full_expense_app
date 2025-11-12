const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const signCredSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isPremium: {
        type: Boolean,
    },
    totalExp: {
        type: Schema.Types.ObjectId,
        ref: 'TotalExpenses' 
    }
});

module.exports = mongoose.model('signCred', signCredSchema);
