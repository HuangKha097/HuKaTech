const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
// Bật CORS
app.use(cors({
    origin: function (origin, callback) {

        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'Lỗi CORS: Origin này không được phép truy cập.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json({ limit: "50mb" })); // Thay thế bodyParser.json()
app.use(express.urlencoded({ limit: "50mb", extended: true }));

routes(app);

app.get("/", (req, res) => {
  return res.send("Hello world!");
});

// Xử lý 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

mongoose
  .connect(process.env.URL_MONGODB)
  .then(() => {
    console.log("Connect Db success!");
    app.listen(port, () => {
      console.log("Server is running in port " + port);
    });
  })
  .catch((e) => {
    console.log(e);
  });
