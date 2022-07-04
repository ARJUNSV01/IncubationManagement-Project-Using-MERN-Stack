const { response } = require('express')
const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const FormModel = require('../models/form-model')
const { ObjectId } = require("mongodb");

module.exports ={
//     doSignup:(data)=>{
//         return new Promise(async(resolve,reject)=>{
//             let response={}
//             let user = UserModel.findOne({email:data.email})
//             if(user){
//                 console.log('User exists');
//                 response.signUpError = true
//                 resolve(response)
//             }else{
//                 UserModel.create({
//                     name:data.name,
//                     email:data.email,
//                     password:bcrypt.hash(data.password,10)
//                 })
//                 response.signuperror = false;  
//                 resolve(response)
//             }
//         })
//     }
// }
doSignup:(data)=>{
    return new Promise(async(resolve,reject)=>{
       const response={}
        try{
            const user =await UserModel.create({
               name:data.name,
              email:data.email,
              password:await bcrypt.hash(data.password,10) 
            })
            response.signUpError = false
            resolve(response)
        }catch(err){
            console.log(err);
            response.signUpError = true
            resolve(response)
        }
    })
},doLogin : (data)=>{
    return new Promise(async(resolve,reject)=>{
        const response = {}
        try{
            let user = await UserModel.findOne({email:data.email})
            let status = await bcrypt.compare(data.password,user.password)
            if(status){
            console.log('login success');
            response.loggedIn = true
            response.user = user
            const token = jwt.sign({
                email:user.email,
                name:user.name
            },'secret1234567')
            response.usertoken = token
            resolve(response)
            }else{
                console.log('login failed');
                response.loggedIn=false
                resolve(response)
            }
        }catch(err){
            console.log('login failed');
            response.loggedIn=false
            resolve(response)
        }
    })
},insertForm:(formData,userId)=>{
    return new Promise(async(resolve,reject)=>{
        let response={}
        try{
        let data = await FormModel.create(formData)
        response.id=data._id
        console.log(response)
        await UserModel.updateOne(
        {_id:ObjectId(userId)},
        {$set:{
            formSubmitted:true,
            formId:response.id
        }})
        resolve(response)
        }catch(err){
            console.log(err);
        }

    })
},checkStatus:(userId)=>{
    return new Promise(async(resolve,reject)=>{
    let status = await UserModel.findOne({_id:ObjectId(userId),formSubmitted:true})
    if(status){
        resolve()
    }else{
        reject()
    }
    })
}
}