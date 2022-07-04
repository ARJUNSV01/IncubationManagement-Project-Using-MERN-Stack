const AdminModel = require("../models/admin-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const FormModel = require("../models/form-model");
const { ObjectId } = require("mongodb");

module.exports = {
  adminLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      try {
        let admin = await AdminModel.findOne({ email: data.email });
        let status = await bcrypt.compare(data.password, admin.password);
        if (status) {
          console.log("login success");
          response.loggedIn = true;
          response.admin = admin;
          const token = jwt.sign(
            {
              email: admin.email,
              id: admin._id,
            },
            "secret1234567"
          );
          response.admintoken = token;
          resolve(response);
        } else {
          console.log("login failed");
          response.loggedIn = false;
          resolve(response);
        }
      } catch (err) {
        console.log("login failed", err);
        response.loggedIn = false;
        resolve(response);
      }
    });
  },
  getNewApplication: () => {
    return new Promise(async (resolve, reject) => {
      try {
        let formData = await FormModel.find({});
        resolve(formData);
      } catch (err) {
        reject();
      }
    });
  },pending:(formId)=>{
    return new Promise (async(resolve,reject)=>{
        try{
    const response =  await FormModel.updateOne({_id:ObjectId(formId)},{$set:{status:'pending'}})
            resolve(response)
    }catch(err){
            reject()
        }
})
  },approve:(formId)=>{
      return new Promise (async(resolve,reject)=>{
          try{
          let response = await FormModel.updateOne({_id:ObjectId(formId)},{$set:{status:'approved'}})
        resolve(response)
          }catch(err){
              reject()
          }
        })
  },decline:(formId)=>{
      return new Promise (async(resolve,reject)=>{
          try{
              let response = await FormModel.updateOne({_id:ObjectId(formId)},{$set:{status:'declined'}})
              resolve(response)
          }catch(err){
              reject()
          }
      })
  }
};
