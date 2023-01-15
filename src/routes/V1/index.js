const express = require('express')
const UserController = require('../../controllers/user-controller')
const router = express.Router()

router.post('/signup',UserController.create)
router.delete('/signup/:id',UserController.destroy)
router.get('/user/:id',UserController.getUser)
module.exports = router