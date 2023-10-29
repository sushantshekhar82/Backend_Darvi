const bcrypt = require('bcryptjs')
const userModel = require('../models/userModel');
const { response } = require('../routes/userRoutes');
const jwt=require('jsonwebtoken');
const config = require('../config/config');
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

const create_token=async(id)=>{
    try {
      const token= await jwt.sign({_id:id},config.jwtSecretKey)
      return token
    } catch (error) {
        res.status(400).send(error.message)  
    }
}

const sendResetPasswordMail=async(name,email,token)=>{
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
        html:'<p>Hi '+name+`, please click on the link to verify your email <a href="https://www.daarvipharmaceuticals.com/register/verify_email?token=${token}"> Verify Now</a> `

      };
  
      // Send the email
      const info = await transporter.sendMail(mailOptions);
  
      console.log('Email sent:', info.response);
  
  
   
    
 } catch (error) {
      console.log(error)
 }
}

const register_user=async(req,res)=>{
    try {
        const spassword=await securePassword(req.body.password)
        const EmailVerifyCode = randomstring.generate(8);

      const user=  new userModel({
          name:req.body.name,
          email:req.body.email,
          password:spassword,
          mobile:req.body.mobile,
          token:EmailVerifyCode

        })
        const userData=await userModel.findOne({email:req.body.email});
        const usermobile=await userModel.findOne({mobile:req.body.mobile})
       if(userData||usermobile){
        res.status(200).send({success:false,msg:"User already Registered"})
       }else{
        await sendResetPasswordMail(req.body.name,req.body.email,EmailVerifyCode)
        const user_data= await user.save();
        res.status(200).send({success:true,data:user_data})
       }
        
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const login=async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        
        const userData=await userModel.findOne({email})
        console.log(userData)
        if(userData && userData.emailVerify=="true"||userData.token==null){
       const passwordMatch=   await bcrypt.compare(password,userData.password)
           if(passwordMatch){
            const tokenData=await create_token(userData._id)

            const userResult={
                _id:userData._id,
                name:userData.name,
                email:userData.email,
                image:userData.image,
                mobile:userData.mobile,
                
                

            }
            const resPonse={
                success:true,
                data:userResult,
               token:tokenData

            }
            res.status(200).send(resPonse)

           }else{
            res.status(200).send({success:false,msg:"Login detail are incorrect"}) 
           }

        }else{
            res.status(200).send({success:false,msg:"Invalid username or password,Please Register first"}) 
        }
        
    } catch (error) {
        res.status(400).send(error.message) 
    }
}

const update_password=async(req,res)=>{
    try {
       const user_id=req.body.id;
       const password=req.body.password;
        
      const data = await userModel.findOne({_id:user_id});
           if(data){
            const newPassword=await securePassword(password)
           const updatepassword=await userModel.findByIdAndUpdate({_id:user_id},{$set:{
            password:newPassword
           }})
           res.status(200).send({success:true,msg:"Password updated"}) 
           }else{
            res.status(200).send({success:false,msg:"User Id not found"}) 
           }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
// const forget_password=async(req,res)=>{
//         try {
//             const email=req.body.email
//         const userData=await userModel.findOne({email:email})
//         if(userData){
//             const randomString=randomstring.generate()
//             userModel.findOne({email:email},{$set:{token:randomString}})
//             sendResetPasswordMail(userData.name,userData.email,randomString)
//             res.status(200).send({success:true,msg:"Check you email "})
//         }else{
//             res.status(200).send({success:false,msg:"Email Doesn't Exist"})
//         }
            
//         } catch (error) {
//             res.status(400).send(error.message)
//         }
// }

module.exports={
    register_user,
    login,
    update_password
   
}
