import express from 'express'
import { signup } from '../controllers/auth.controller.js'


const router = express.Router()
console.log("here in the route")

router.post('/signup',signup)

export default router