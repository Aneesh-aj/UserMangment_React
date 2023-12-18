import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js'

const router = express.Router()
console.log("coming to the route")
router.post('/signup',signup)
router.post('/signin',signin)

export default router