const mongoose = require('mongoose')

const Slot = new mongoose.Schema({
    section:{type:String},
    selected:{type:Boolean},
    companyId:{type:mongoose.Schema.ObjectId}
},{collection:'slots'})

const SlotModel = mongoose.model('slots',Slot)

module.exports=SlotModel;