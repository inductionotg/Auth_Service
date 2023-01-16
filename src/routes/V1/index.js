const express = require('express')
const UserController = require('../../controllers/user-controller')
const router = express.Router()
const   {validateUserAuth}   = require('../../middlewares/auth-request-Middlewares')
console.log(validateUserAuth)

router.post('/signup',UserController.create)
router.delete('/signup/:id',UserController.destroy)
router.get('/user/:id',UserController.getUser)
router.post('/signIn',validateUserAuth,UserController.signIn)
module.exports = router