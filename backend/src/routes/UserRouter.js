const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController')

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.get('/get-user-by-id', userController.getUserById)


module.exports = router;