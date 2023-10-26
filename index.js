const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productsRoutes')
const cartRoute = require('./routes/cart')
const orderRouter = require('./routes/order')
//'http://daarvipharmaceuticals.com','https://daarvipharmaceuticals.com',
app.use(express.json())
app.use(cors({ origin: ['https://fantastic-snickerdoodle-def3e9.netlify.app','http://daarvipharmaceuticals.com','https://daarvipharmaceuticals.com','http://localhost:3000'], optionsSuccessStatus: 200 }));

app.options("*", cors({ origin: ['https://fantastic-snickerdoodle-def3e9.netlify.app','http://daarvipharmaceuticals.com','https://daarvipharmaceuticals.com','http://localhost:3000'], optionsSuccessStatus: 200 }));

app.use('/api',userRoute)
app.use('/api/product',productRoute)
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