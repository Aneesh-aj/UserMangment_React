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
    try {
        const validuser = await User.findOne({ email })
        if (!validuser) return next(next(errorHandler(404, 'User not found')))
        const validPassword = bcryptjs.compareSync(password, validuser.password)
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'))
        const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET)
        const { password: hashedPasword, ...rest } = validuser._doc;
        const expiryDate = new Date(Date.now() + 3600000000)
        res.cockies('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest)
    } catch (error) {

    }
}