const User = require("../models/UserModel");
const bcrypt = require("bcrypt"); 
const { genneralAccesToken, genneralRefreshToken  } = require("./JwtService");

const createUser = (newUser) => {
    return new Promise( async (resolve, reject) => {
          const { name, phone, password } = newUser;
        try {
            const checkUser = await User.findOne({
                phone: phone
            })
            if(checkUser !== null){
                resolve({
                    status: "OK",
                    message: "Phone number is already existed"
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                phone,
                password: hash,
    
            }) 
          if(createdUser){
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

const loginUser = (userLogin) => {
    return new Promise( async (resolve, reject) => {
        const { phone, password } = userLogin;
        try {
    
           const isVNPhone = /^(0[3|5|7|8|9])[0-9]{8}$/.test(phone);

            if(!isVNPhone){
                 return resolve({
                    status: "ERROR",
                    message: "Your phone number is incorrect"
                })
            }

            const checkUser = await User.findOne({ phone: phone });

            if(!checkUser){
                return resolve({
                    status: "ERROR",
                    message: "This account does not exist"
                })
            }

           

            const checkPassword =  bcrypt.compareSync(password , checkUser.password)

            if(!checkPassword){
                return resolve({
                    status: "ERROR",
                    message: "Your password is not correct"
                })
            }
            
            const access_token = await genneralAccesToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })
            console.log('access_token', access_token)
            console.log('access_token', refresh_token)

            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token
            })
          
        } catch (error) {
            reject(error)
        }
    })
}

const getUserById =(userId) =>{
    return new Promise(async (resolve, reject) =>{
        
        try {
            const user = await User.findOne({_id: userId})
            resolve ({
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
    getUserById
}