const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productsRoutes')
const cartRoute = require('./routes/cart')
const orderRouter = require('./routes/order')
const verifyEmailRoute = require('./routes/emailverify')

app.use(express.json())
app.use(cors({ origin: ['https://vendingmachine-theta.vercel.app','https://64de7e04c4b2ef124e393b4c--polite-monstera-043144.netlify.app','http://localhost:3000'], optionsSuccessStatus: 200 }));

app.options("*", cors({ origin: ['https://vendingmachine-theta.vercel.app','https://64de7e04c4b2ef124e393b4c--polite-monstera-043144.netlify.app','http://localhost:3000'], optionsSuccessStatus: 200 }));

app.use('/api',userRoute)
app.use('/api/product',productRoute)
app.use('/api/verify_email',verifyEmailRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRouter)
app.listen(8080,async()=>{
    try {
       mongoose.connect('mongodb+srv://sushantshekhar:sushantshekhar@cluster0.jrb6jlo.mongodb.net/darvi?retryWrites=true&w=majority') 
    console.log("server running at port 8080")
    } catch (error) {
       console.log(error) 
    }
})