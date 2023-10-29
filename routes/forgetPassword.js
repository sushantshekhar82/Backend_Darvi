
const express=require('express')
const forgetPassword=express.Router();
const bodyParser=require('body-parser');
const userModel = require('../models/userModel');
forgetPassword.use(bodyParser.json())
forgetPassword.use(bodyParser.urlencoded({extended:true}))
const bcrypt = require('bcryptjs')
const nodemailer=require('nodemailer')
const randomstring=require('randomstring')

const securePassword=async(password)=>{
    try {
        const passwordHash=await bcrypt.hash(password,5)
        return passwordHash;
    } catch (error) {
        res.status(400).send(error.message)  
    }
}

const sendResetPasswordMail=async(name,email)=>{
    try {
       const transporter = nodemailer.createTransport({
           service: 'sushant.shekhar151997@gmail.com',
           port: 587,
           secure: true,
           auth: {
             user: 'sushant.shekhar151997@gmail.com', // Replace with your email address
             pass: 'jpen vqrh qrjf rvhj', // Replace with your email password
           },
         });
     
         const mailOptions = {
           from: 'sushant.shekhar151997@gmail.com',
           to:email,
           subject:'Darvi Reset Password',
           html:'<p>Hi '+name+`, please click on the link to change password <a href="https://daarvipharmaceutical.vercel.app/login/reset_password?email=${email}">Reset Password</a> `
   
         };
     
         // Send the email
         const info = await transporter.sendMail(mailOptions);
     
         console.log('Email sent:', info.response);
     
     
      
       
    } catch (error) {
         console.log(error)
    }
   }

   forgetPassword.post("/forgetmail",async(req,res)=>{
    try {
        const useremail=req.body.email
        const user=await userModel.findOne({email:useremail});
        console.log(user)
        if(user!==null){
           
            if(user.emailVerify=="true" && user.token==null ){
          
                await sendResetPasswordMail(user.name,user.email)
                
                res.status(200).send({success:true,message:"mail send successfully"})
            }
           
    }else{
        res.status(200).send({success:true,message:"No user found"})
   
    }
   

        
    } catch (error) {
        res.status(400).send({ msg: error.message })  
    }
   }) 
forgetPassword.put("/",async(req,res)=>{

    try {

       
        const useremail=req.body.email
        const password=req.body.password
        const user=await userModel.findOne({email:useremail});
        const generatePassword=await securePassword(password)
        let passwordupdate
       
    if(user!==null){
        if(user.emailVerify=="true" && user.token==null ){

            passwordupdate=await userModel.findByIdAndUpdate({_id:user._id},{$set:{
               password:generatePassword
               
              }})
       
           }
           const update=await userModel.findOne({email:useremail});
           console.log("here2")
       res.status(200).send({success:true,message:"password update successfully",data:update})
    }else{
        res.status(200).send({success:true,message:"No user found"})
   
    }
       
    } catch (error) {
        res.status(400).send({ msg: error.message })
    }

})

module.exports=forgetPassword