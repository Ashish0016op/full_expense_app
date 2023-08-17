const Sequelize=require('sequelize');
const loginCred=new Sequelize('expense-db','root','Ashish8298',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=loginCred;