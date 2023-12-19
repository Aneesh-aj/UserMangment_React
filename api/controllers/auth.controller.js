import User from '../model/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    console.log("in the controller ,gettting here")

    const hashedPasword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPasword })


    try {
        await newUser.save()
        res.status(201).json({ message: "user created succesfully" })
    }
    catch (error) {
        next(error)
    }

}


export const signin = async (req, res, next) => {
    const { email, password } = req.body
    console.log("email",email)
    try {
        const validuser = await User.findOne({ email })
        console.log("singin controller")
        if (!validuser) return next(errorHandler(404, 'User not found'))
        const validPassword = bcryptjs.compareSync(password, validuser.password)
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'))
        const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET)
        const { password: hashedPasword, ...rest } = validuser._doc;
        const expiryDate = new Date(Date.now() + 3600000000)
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
    } catch (error) {
        console.log('error catch')
        next(error)
    }
}


export const google = async (req, res, next) => {
    try {
       
        console.log("comign here in the google controller")

        const user = await User.findOne({ email: req.body.email });
        
        if (user) {
            console.log("google if case")
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const expiryDate = new Date(Date.now() + 3600000000); // Adjust expiry
            
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate,
            }).status(200).json({ message: 'User signed in successfully' });
        } else {
            console.log("google else case")
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: req.body.name.split('').join('').toLowerCase() +
                    Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const expiryDate = new Date(Date.now() + 3600000); // Adjust expiry

            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate,
            }).status(200).json({ message: 'User created and signed in successfully' });
        }
    } catch (error) {
        next(error);
    }
};
