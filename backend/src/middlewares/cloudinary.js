// middlewares/cloudinary.js
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const multer = require('multer');
const dotenv = require("dotenv");

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({storage});
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'products',
                transformation: [
                    {width: 1000, crop: "limit"},
                    {quality: "auto"},
                    {fetch_format: "auto"}
                ]
            },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

const deleteFromCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
        if (!publicId) return resolve();


        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (result) resolve(result);
            else reject(error);
        });
    });
};

module.exports = {
    upload,
    uploadToCloudinary,
    deleteFromCloudinary
};