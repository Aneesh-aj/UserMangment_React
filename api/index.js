import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cors from 'cors'


dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
})

const app = express() 


app.use(cors())
app.use(express.json())


app.listen(3400,()=>{
    console.log("server started in 3400 ")
})


app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({  
        success: false,
        message: message,
        statusCode: statusCode 
    });
});
