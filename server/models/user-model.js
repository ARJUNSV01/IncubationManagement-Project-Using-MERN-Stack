const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}, 
    formSubmitted:{type:Boolean},
    formId:{type:mongoose.Schema.ObjectId}
},{ collection:'user-data'})
const UserModel = mongoose.model('user-data',User)




module.exports = UserModel