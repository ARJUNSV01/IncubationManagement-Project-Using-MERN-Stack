var express = require('express');
const { BiUpload } = require('react-icons/bi');
var router = express.Router();
const userHelper = require('../helpers/userHelper')

const checktoken = (req,res,next)=>{
  l
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',async(req,res)=>{
console.log(req.body);
try{
const response = await userHelper.doSignup(req.body)
console.log(response);
if(response.signUpError){
  res.status(400).json({status:'error'})
}else{
  res.status(200).json({status:'ok'})
}
}catch(err){
console.log(err);
}
})
router.post('/login',async(req,res)=>{
  try{
const response = await userHelper.doLogin(req.body)
if(response.loggedIn){
  console.log(response);
  res.status(200).json(response)
}else{
  res.status(400).json({err:"Invalid Credentials"})
}
  }catch(err){
    console.log(err);
  }
})
router.post('/submitform',async(req,res)=>{
  try{
    console.log('ji')
    console.log(req.body);
    console.log(req.headers.userid);
    let formData = JSON.parse(req.body.data)
    const userId = req.headers.userid
    console.log(req.files)
    let response = await userHelper.insertForm(formData,userId)
    if(response.id){
    let id = response.id
    if(req.files.logo){
      let image = req.files.logo
     image.mv("./public/images/Logos/" + id + ".jpg");
    }
   return res.status(200).json({ status:'ok',success: 'form submitted successfully' })
  }else{
    return res.status(400).json({ status:'error' })
  }
  }catch(err){
console.log(err);
  }
})
router.get('/checkApplicationStatus',async(req,res)=>{
  try{
    const userId = req.headers.userid
  let status = await userHelper.checkStatus(userId)
  console.log('success');
  res.status(200).json({status:'ok'})
  }catch(err){
console.log('failed');
res.status(400).json({status:'err'})
  }
})
module.exports = router;
