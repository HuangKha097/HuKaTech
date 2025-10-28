const UserService = require('../services/UserService')

const createUser = async (req, res) =>{
    try {
        const { name, phone, password, confirmPassword } = req.body
        if ( !name || !phone || !password || !confirmPassword) {
            return res.status(200).json({
                status: "Error",
                message: "The input is required"
            })
        }
        else if (password !== confirmPassword){
            return res.status(200).json({
                status: "Error",
                message: "Password does not match" 
            })
        }
        const result = await UserService.createUser(req.body);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const loginUser = async (req, res) =>{
    try {
        const { phone, password  } = req.body
        if (  !phone || !password ) {
            return res.status(200).json({
                status: "Error",
                message: "The input is required"
            })
        }
        const result = await UserService.loginUser(req.body);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const getUserById = async (req, res) =>{
    try {
        const userId = req.query._id
        const result = await UserService.getUserById(userId);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}


module.exports = {
    createUser,
    loginUser,
    getUserById
}