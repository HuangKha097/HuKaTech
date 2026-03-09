const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.get('/get-user-by-id', userController.getUserById);
router.post('/refresh-token', userController.refreshToken);


router.post('/sign-out', authMiddleware, userController.logoutUser);
router.post('/change-password', authMiddleware, userController.changePassword);



module.exports = router;