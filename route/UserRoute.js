const express = require('express')
const router = express.Router();
const userController = require('../controller/UserController')
router.post('/signup', userController.registerUser);
router.post('/login',  userController.loginUser);
router.post('/forgot', userController.forgetPassword);
router.patch('/reset', userController.resetPassword)

module.exports = router;