const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        console.log("TOKEN:", token);
        console.log("ERROR:", err);
        console.log("USER:", user);
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = user; // { id, isAdmin }
        next();
    });
};

module.exports = authMiddleware;