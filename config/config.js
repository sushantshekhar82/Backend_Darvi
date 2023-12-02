require('dotenv').config()
const config={
    jwtSecretKey:process.env.jwtSecretKey,
    mongodburl:process.env.mongodburl,
    port:process.env.port
    
}
module.exports=config;