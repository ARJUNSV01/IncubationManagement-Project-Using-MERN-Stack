const mongoose=require('mongoose')

const Form =new mongoose.Schema({
        name:{type:String,required:true},
        address:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        email:{type:String,required:true},
        phoneno:{type:Number,required:true},
        companyname: {type:String,required:true},
        teamandbackground: {type:String,required:true},
        companyandproduct: {type:String,required:true},
        problem: {type:String,required:true},
        solution: {type:String,required:true},
        valueproposition: {type:String,required:true},
        competitors: {type:String,required:true},
        revenue: {type:String,required:true},
        potentialmarketsize: {type:String,required:true},
        plan: {type:String,required:true},
        type: {type:String,required:true},
        businessproposal: {type:String,required:true},
        status:{type:String}
},{collection:'form-data'})

const FormModel = mongoose.model('form-data',Form)
module.exports = FormModel;