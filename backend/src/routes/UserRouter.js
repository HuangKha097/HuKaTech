const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/sign-out', authMiddleware, userController.logoutUser);
router.get('/get-user-by-id', userController.getUserById)

router.post('/refresh-token', userController.refreshToken);


module.exports = router;