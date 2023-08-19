const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const signRoutes = require('./routes/signUp');
const loginRoutes=require('./routes/login');
const expenseRoutes=require('./routes/expense');
const ExpenseData=require('./model/expenseData');
const Login=require('./model/loginDetails');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(signRoutes);
app.use(loginRoutes);
app.use(expenseRoutes);
app.use('/login',(req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.use('/expense',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','expense.html'));
})
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'SignUp.html'));
});

Login.hasMany(ExpenseData);
ExpenseData.belongsTo(Login);

sequelize.sync({force:true})
.then(() => {
    console.log('Data sync successful');
    app.listen(5500, () => {
        console.log('Server is running on port 5500');
    });
})
.catch(err => {
    console.error('Database sync error:', err);
});




