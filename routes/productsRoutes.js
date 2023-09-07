const express=require('express')
const productRoute=express();
const bodyParser=require('body-parser')
productRoute.use(bodyParser.json())
productRoute.use(bodyParser.urlencoded({extended:true}))

const multer=require('multer')
const path=require('path');
const productController = require('../controllers/productController');
const productModel = require('../models/product');

// productRoute.use(express.static('public'))
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,path.join(__dirname,'../public/productImages'),function(error,success){
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
productRoute.get('/allproducts',async(req,res)=>{
    
    try{
    const products=await productModel.find()
    res.status(200).send(products)
   } catch (error) {
    res.status(400).send({ msg: error.message })
   }
})
productRoute.get('/allproducts/:id',async(req,res)=>{
    const id=req.params.id
    try{
    const products=await productModel.findOne({ _id: id })
    res.status(200).send(products)
   } catch (error) {
    res.status(400).send({ msg: error.message })
   }
})
productRoute.post('/allproducts',productController.products)

module.exports=productRoute;
