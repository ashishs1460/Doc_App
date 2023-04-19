   const express =require('express')
   const dotenv=require('dotenv')
   const morgan=require('morgan')
   const colors =require('colors')
const connectDB = require('./cofig/db')
const path=require('path')


   //config 
  dotenv.config()
 
  //mongodb connection
  connectDB()



  //rest object 
   const app =express()

   //middlewares

   app.use(express.json())
   app.use(morgan('dev'))

   //routes

   app.use("/api/v1/user", require("./routes/userRoutes"));
   app.use("/api/v1/admin", require("./routes/adminRoutes"));
   app.use("/api/v1/doctor", require("./routes/doctorRoutes"));
   
    
 //static files

 app.use(express.static(path.join(__dirname, "./client/build")))

 app.get('*',function(req,res){
   res.sendFile(path.join(__dirname, "./client/build/index.html"))
 })

   //port
   const PORT =process.env.PORT

   //listen

   app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_MODE} mode on ${PORT}`.bgCyan.white)
   })