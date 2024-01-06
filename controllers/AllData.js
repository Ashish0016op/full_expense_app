const expenseDetails = require('../model/expenseData');
const loginDetails = require('../model/loginDetails');
const totalExp = require('../model/totalExpenses');

exports.getAllData = async (req, res, next) => {
    try {
        console.log("leaderboard is called");
        const leaderboardData = await totalExp.find({})
        console.log("leader board is ",leaderboardData);
        res.status(200).json(leaderboardData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};



