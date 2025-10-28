const jwt = require("jsonwebtoken")

const genneralAccesToken = async (payload) =>{
    console.log(payload);
    
    const accessToken = jwt.sign({
        payload
    }, 'access_token', { expiresIn:'1h'})   
    return accessToken;
}

const genneralRefreshToken = async (payload) =>{
    console.log(payload);
    
    const refreshToken = jwt.sign({
        payload
    }, 'refresh_token', { expiresIn:'365d'})   
    return refreshToken;
}

module.exports = {
    genneralAccesToken,
    genneralRefreshToken
}