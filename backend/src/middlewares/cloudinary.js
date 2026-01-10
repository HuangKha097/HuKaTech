// middlewares/cloudinary.js
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const multer = require('multer');
const dotenv = require("dotenv");

dotenv.config();

// 1. Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Cấu hình Multer (Memory Storage) - Dùng để lưu ảnh tạm vào RAM
const storage = multer.memoryStorage();
const upload = multer({storage});

// 3. Helper function: Upload lên Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'products',
                transformation: [
                    {width: 1000, crop: "limit"}, // Nếu ảnh to hơn 1000px thì thu về 1000px, nhỏ hơn thì giữ nguyên
                    {quality: "auto"},            // Tự động nén ảnh (giảm dung lượng nhưng giữ chất lượng)
                    {fetch_format: "auto"}        // Tự động đổi đuôi sang WebP/AVIF để load nhanh hơn
                ]
            }, // Tự động tạo folder 'products' trên Cloudinary
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

// 4. Helper function: Xóa ảnh trên Cloudinary (CẦN THÊM ĐOẠN NÀY)
const deleteFromCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
        if (!publicId) return resolve(); // Không có ID thì coi như xong

        // Hàm destroy nhận public_id để xóa ảnh
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (result) resolve(result);
            else reject(error);
        });
    });
};

// Xuất ra 3 món để dùng ở nơi khác
module.exports = {
    upload,
    uploadToCloudinary,
    deleteFromCloudinary // <-- Nhớ export hàm này
};