const expenseDetails = require('../model/expenseData');
const loginDetails = require('../model/loginDetails');
const sequelize = require('../util/database');
//const { expenseDetails, loginDetails, sequelize } = require('../models'); // Adjust the paths as needed

exports.getAllData = async (req, res, next) => {
    try {
        const leaderboardData = await loginDetails.findAll({
            attributes: [
                'id',
                'Username',
                [
                    sequelize.fn('SUM', sequelize.col('expense_details.expense_amount')),
                    'totalExpenses'
                ]
            ],
            include: [
                {
                    model: expenseDetails,
                    attributes: []
                }
            ],
            group: ['signupdata.id'],
            order: [[sequelize.fn('SUM', sequelize.col('expense_details.expense_amount')), 'DESC']]
        });

        res.status(200).json(leaderboardData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};


