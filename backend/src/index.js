const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Cấu hình CORS
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://hukatech.netlify.app"
    "https://hukamanager.netlify.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (!allowedOrigins.includes(origin)) {
            return callback(new Error("CORS blocked"), false);
        }

        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true}));

// Routing
routes(app);

// Connect DB & Start Server
mongoose
    .connect(process.env.URL_MONGODB)
    .then(() => {
        console.log("Connect Db success!");
        app.listen(port, () => {
            console.log("Server is running in port " + port);
        });
    })
    .catch((e) => {
        console.log("Connect Db error:", e);
    });