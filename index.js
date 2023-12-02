const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productsRoutes')
const cartRoute = require('./routes/cart')
const orderRouter = require('./routes/order')
const verifyEmailRoute = require('./routes/emailverify')
const config = require('./config/config')

app.use(express.json())
app.use(cors({ origin: ['https://daarvipharmaceutical.vercel.app','http://localhost:3000'], optionsSuccessStatus: 200 }));

app.options("*", cors({ origin: ['https://daarvipharmaceutical.vercel.app','http://localhost:3000'], optionsSuccessStatus: 200 }));

app.use('/api',userRoute)
app.use('/api/product',productRoute)
app.use('/api/verify_email',verifyEmailRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRouter)

app.listen(config.port,async()=>{
    try {
       mongoose.connect(config.mongodburl) 
       console.log("server running")
    } catch (error) {
       console.log(error) 
    }
})