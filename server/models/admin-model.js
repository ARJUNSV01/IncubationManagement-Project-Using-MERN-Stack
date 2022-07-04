const mongoose = require('mongoose')

const Admin =new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{collection:'admin'})

const AdminModel = mongoose.model('admin',Admin)

module.exports = AdminModel;