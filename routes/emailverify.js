const express=require('express')
const verifyEmailRoute=express.Router();
const bodyParser=require('body-parser');
const userModel = require('../models/userModel');
verifyEmailRoute.use(bodyParser.json())
verifyEmailRoute.use(bodyParser.urlencoded({extended:true}))


verifyEmailRoute.post('/get_user',async(req,res)=>{
    try {

        const token=req.body.token
        const useremail=req.body.email
        const userToken=await userModel.findOne({token:token,email:useremail});
        console.log(userToken)
        let emailVerified
        console.log("here1")
    if(userToken!==null){
        if(userToken.emailVerify=="false" && userToken.token!==null ){
console.log("heeere")
            emailVerified=await userModel.findByIdAndUpdate({_id:userToken._id},{$set:{
               emailVerify:true,
               token:null
              }})
       
           }
           const update=await userModel.findOne({email:useremail});
           console.log("here2")
       res.status(200).send({success:true,data:update})
    }
    res.status(200).send({success:true,message:"Try again"})
       
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
  

})

verifyEmailRoute.post('/',async(req,res)=>{
    try {

        const token=req.body.token
        const useremail=req.body.email
        const userToken=await userModel.findOne({token:token,email:useremail});
        console.log(userToken)
        let emailVerified
        console.log("here1")
    if(userToken!==null){
        if(userToken.emailVerify=="false" && userToken.token!==null ){
console.log("heeere")
            emailVerified=await userModel.findByIdAndUpdate({_id:userToken._id},{$set:{
               emailVerify:true,
               token:null
              }})
       
           }
           const update=await userModel.findOne({email:useremail});
           console.log("here2")
       res.status(200).send({success:true,data:update})
    }
    res.status(200).send({success:true,message:"Try again"})
       
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }
  

})
module.exports=verifyEmailRoute