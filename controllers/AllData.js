const expenseDetails = require('../model/expenseData');
const loginDetails = require('../model/loginDetails');
const sequelize = require('../util/database');

exports.getAllData = async (req, res, next) => {
    try {
        const loginUser = await loginDetails.findAll();
        const expenseDetail = await expenseDetails.findAll();

        const userExpenses = {};

        expenseDetail.forEach((expense) => {
            if (userExpenses[expense.signupDatumId]) {
                userExpenses[expense.signupDatumId] += expense.expense_amount;
            } else {
                userExpenses[expense.signupDatumId] = expense.expense_amount;
            }
        });

        const leaderboardData = [];
        loginUser.forEach((user) => {
            const userId = user.id;
            const userName = user.Username;
            const totalExpenses = userExpenses[userId] || 0;

            leaderboardData.push({
                userName,
                totalExpenses
            });
        });
        leaderboardData.sort((a, b) => b.totalExpenses - a.totalExpenses);

        res.status(200).json(leaderboardData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

