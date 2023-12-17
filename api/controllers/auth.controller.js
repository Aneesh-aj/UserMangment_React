import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs';

export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;

    const hashedPasword = bcryptjs.hashSync(password,10)
    const newUser = new User({username,email,password:hashedPasword})

     
    try{
        await newUser.save()
        res.status(201).json({message:"user created succesfully"})
    }
    catch(error){
         next(error)
    }

}