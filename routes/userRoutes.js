const express=require('express')
const userRoute=express()

const bodyParser=require('body-parser')
userRoute.use(bodyParser.json())
userRoute.use(bodyParser.urlencoded({extended:true}))

const multer=require('multer')
const path=require('path')

// userRoute.use(express.static('public'))
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,path.join(__dirname,'../public/userImages'),function(error,success){
//             if(error)throw error
//         });
//     },
//     filename:function(req,file,cb){
//         const name=Date.now()+'-'+file.originalname;
//         cb(null,name,function(error1,success1){
//             if(error1)throw error1
//         })
//     }
// });
// const upload=multer({storage:storage});
// upload.single('image')
const user_controller=require("../controllers/userController")
const verifyToken = require('../middlewares/auth')

userRoute.post('/register',user_controller.register_user)
userRoute.post('/login',user_controller.login)
userRoute.post('/update_password',verifyToken,user_controller.update_password)

module.exports=userRoute