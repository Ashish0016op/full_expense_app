const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const signCred=sequelize.define('signupData',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    Username:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    timestamps:false
})
module.exports=signCred;