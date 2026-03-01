const jwt = require("jsonwebtoken")

const genneralAccesToken = async (payload) => {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN,
        { expiresIn: "15s" }
    );
};

const genneralRefreshToken = async (payload) => {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN,
        { expiresIn: "365d" }
    );
};

module.exports = {
    genneralAccesToken,
    genneralRefreshToken
};