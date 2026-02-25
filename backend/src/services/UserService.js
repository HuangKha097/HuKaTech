const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const {genneralAccesToken, genneralRefreshToken} = require("./JwtService");

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name, phone, password} = newUser;
        try {
            const checkUser = await User.findOne({
                phone: phone
            })
            if (checkUser !== null) {
                return resolve({
                    status: "ERROR",
                    message: "Phone number already exists"
                });
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                phone,
                password: hash,

            })
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdUser
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const loginUser = async ({ phone, password }) => {
    const checkUser = await User.findOne({ phone });

    if (!checkUser) {
        return {
            status: "ERROR",
            message: "Account does not exist"
        };
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);

    if (!isMatch) {
        return {
            status: "ERROR",
            message: "Wrong password"
        };
    }

    const access_token = await genneralAccesToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin
    });

    const refresh_token = await genneralRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin
    });

    checkUser.refresh_token = refresh_token;
    await checkUser.save();

    return {
        status: "OK",
        access_token,
        refresh_token
    };
};
const logoutUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.findByIdAndUpdate(userId, {
                refresh_token: null
            });

            resolve({
                status: "OK",
                message: "Logged out successfully"
            });
        } catch (error) {
            reject(error);
        }
    });
};
const getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {

        try {
            const user = await User.findOne({_id: userId})
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user
            })
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    createUser,
    loginUser,
    getUserById,
    logoutUser
}