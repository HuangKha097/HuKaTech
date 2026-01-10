const ProductService = require("../services/ProductService");
// Import hàm upload helper (đảm bảo đường dẫn đúng)
const {uploadToCloudinary} = require("../middlewares/cloudinary");

const addNewProduct = async (req, res) => {
    try {
        const { productName, description, oldPrice, newPrice, type, category, countInStock } = req.body;

        // --- SỬA ĐOẠN XỬ LÝ ẢNH ---
        let productImages = [];

        // Kiểm tra nếu có file (req.files số nhiều)
        if (req.files && req.files.length > 0) {
            // Dùng Promise.all để upload song song nhiều ảnh cùng lúc cho nhanh
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));

            // Chờ tất cả upload xong
            const uploadResults = await Promise.all(uploadPromises);

            // Map kết quả về đúng định dạng Model yêu cầu
            productImages = uploadResults.map(result => ({
                url: result.secure_url,
                public_id: result.public_id
            }));
        }

        // Nếu bắt buộc phải có ảnh thì check
        if (productImages.length === 0) {
            return res.status(400).json({ status: 'ERR', message: 'Vui lòng chọn ít nhất 1 ảnh' });
        }
        // ---------------------------

        const newProductData = {
            name: productName,
            images: productImages, // Lưu mảng ảnh vừa upload
            type: type,
            newPrice: Number(newPrice),
            oldPrice: Number(oldPrice),
            countInStock: Number(countInStock),
            rating: 0,
            description: description,
            category: category
        };

        const result = await ProductService.addNewProduct(newProductData);
        return res.status(200).json(result);

    } catch (e) {
        console.log("Error:", e);
        return res.status(500).json({ status: 'ERR', message: e.message });
    }
}
// ... Các hàm GET giữ nguyên ...
const getAllProducts = async (req, res) => {
    try {
        const result = await ProductService.getAllProducts();
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
const getRelatedProducts = async (req, res) => {
    try {
        const { type } = req.query;
        const { id } = req.params;

        const result = await ProductService.getRelatedProducts(type, id);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message || "Internal Server Error",
        });
    }
};



// CẬP NHẬT: Dùng req.params nếu router là /get-product-by-id/:id
const getProductById = async (req, res) => {
    try {
        // Nếu router sửa thành /:id thì dùng req.params.id
        // Nếu router vẫn giữ nguyên thì dùng req.query._id hoặc req.query.id
        const id = req.params.id || req.query.id || req.query._id;

        if (!id) {
            return res.status(400).json({status: "ERR", message: "Product ID is required"});
        }

        const result = await ProductService.getProductById(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message || "Internal Server Error",
        });
    }
};

// CẬP NHẬT: Dùng req.params nếu router là /delete-product/:id
const deleteProduct = async (req, res) => {
    try {
        // Tương tự, ưu tiên lấy từ params cho chuẩn RESTful
        const id = req.params.id || req.body._id;

        if (!id) {
            return res.status(400).json({status: "ERR", message: "Product ID is required"});
        }

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
    getRelatedProducts
};