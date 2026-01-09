const ProductService = require("../services/ProductService");

const addNewProduct = async (req, res) => {
    try {
        // Lấy dữ liệu từ Frontend
        const {productName, description, oldPrice, newPrice, type, category, countInStock, images} = req.body;

        // 1. Validate dữ liệu đầu vào
        if (!productName || !description || !type || !category || !countInStock || !newPrice) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Vui lòng nhập đầy đủ thông tin (Tên, giá, loại, mô tả...)'
            });
        }

        // 2. Validate ảnh
        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Vui lòng chọn ít nhất 1 ảnh'
            });
        }

        // 3. Chuẩn bị object để lưu vào DB
        // SỬA QUAN TRỌNG: Map dữ liệu cho khớp với ProductModel.js
        const newProductData = {
            name: productName,  // Map 'productName' -> 'name' (OK)

            // SỬA: Model yêu cầu mảng object [{ url: '...' }]
            // Frontend đang gửi mảng string ['data:base64...', ...]
            // => Phải dùng map để chuyển đổi
            images: images.map(imgStr => ({url: imgStr})),

            type: type,

            newPrice: Number(newPrice),
            oldPrice: Number(oldPrice),
            countInStock: Number(countInStock),

            rating: 0,
            description: description,
            category: category
        };

        // 4. Gọi Service
        const result = await ProductService.addNewProduct(newProductData);

        return res.status(200).json(result);

    } catch (e) {
        console.log(" LỖI TẠI CONTROLLER:", e);
        return res.status(500).json({
            status: 'ERR',
            message: e.message || 'Lỗi Server'
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const result = await ProductService.getAllProducts(); // không cần req.body
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message || "Internal Server Error",
        });
    }
};

const getProductToShowHome = async (req, res) => {
    try {
        const result = await ProductService.getProductToShowHome();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message || "Internal Server Error",
        });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const category = req.query.category;
        const result = await ProductService.getProductsByCategory(category);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message || "Internal Server Error",
        });
    }
};

const getProductsByName = async (req, res) => {
    try {
        const name = req.query.name;
        const result = await ProductService.getProductsByName(name);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message || "Internal Server Error",
        });
    }
};
const getProductsByType = async (req, res) => {
    try {
        const type = req.query.type;
        const result = await ProductService.getProductsByType(type);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message || "Internal Server Error",
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const id = req.query._id;
        const result = await ProductService.getProductById(id);
        console.log(result);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message || "Internal Server Error",
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.body._id;
        const result = await ProductService.deleteProduct(id);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message || "Internal Server Error",
        });
    }
};

module.exports = {
    getAllProducts,
    addNewProduct,
    getProductToShowHome,
    getProductsByCategory,
    getProductsByName,
    getProductsByType,
    getProductById,
    deleteProduct,
};
