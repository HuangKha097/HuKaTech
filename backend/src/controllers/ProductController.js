const ProductService = require("../services/ProductService");
const { uploadToCloudinary, deleteFromCloudinary } = require("../middlewares/cloudinary");
const Product = require("../models/ProductModel");

const addNewProduct = async (req, res) => {
    try {
        const {productName, description, oldPrice, newPrice, type, category, countInStock} = req.body;

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
            return res.status(400).json({status: 'ERR', message: 'Vui lòng chọn ít nhất 1 ảnh'});
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
        return res.status(500).json({status: 'ERR', message: e.message});
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({ status: "ERR", message: "Product ID is required" });
        }

        const productInDb = await Product.findById(productId);
        if (!productInDb) {
            return res.status(404).json({ status: "ERR", message: "Product not found" });
        }

        // XỬ LÝ ẢNH
        let oldImages = [];
        if (req.body.oldImages) {
            try {
                oldImages = JSON.parse(req.body.oldImages);
            } catch (e) {
                console.log("Error parsing oldImages", e);
            }

        }

        let newImages = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
            const uploadResults = await Promise.all(uploadPromises);

            newImages = uploadResults.map(result => ({
                url: result.secure_url,
                public_id: result.public_id
            }));
        }

        const finalImages = [...oldImages, ...newImages];

        // Xóa ảnh bị gỡ khỏi Cloudinary
        // Logic: Ảnh có trong DB cũ nhưng KHÔNG có trong finalImages -> Xóa
        const removedImages = productInDb.images.filter(
            img => !finalImages.some(i => i.public_id === img.public_id)
        );

        if (removedImages.length > 0) {
            await Promise.all(
                removedImages.map(img => deleteFromCloudinary(img.public_id))
            );
        }

        // --- GỌI SERVICE ĐỂ UPDATE DB ---
        // Gom dữ liệu cần update
        const dataToUpdate = {
            ...req.body,
            images: finalImages,
            _id: productId // Truyền ID vào để Service biết check trùng tên ngoại trừ ID này
        };

        // Gọi service thay vì tự update tại đây
        const response = await ProductService.updateProduct(dataToUpdate);

        return res.status(200).json(response);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "ERR",
            message: error.message
        });
    }
};

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

const advancedSearchProductAdmin = async (req, res) => {
    try {
    const result = await ProductService.advancedSearchProductAdmin(req.query);
    return res.status(200).json(result);
    }catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message
        })
    }
}
const advancedSearchProductClient = async (req, res) => {
    try {
        const result = await ProductService.advancedSearchProductClient(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message
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
        const {type} = req.query;
        const {id} = req.params;

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
const activeProductController = async (req, res) => {
    try {
        const id = req.params.id || req.query.id;

        if (!id) {
            return res.status(400).json({
                status: "ERR",
                message: "Product ID is required"
            });
        }

        const result = await ProductService.handleActiveProduct(id);

        if (result.status !== "OK") {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message || "Internal Server Error"
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
    getRelatedProducts,
    activeProductController,
    updateProduct,
    advancedSearchProductAdmin,
    advancedSearchProductClient
};