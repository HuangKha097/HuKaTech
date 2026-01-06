const ProductService = require("../services/ProductService");

const addNewProduct = async (req, res) => {
    try {
        const {name, images, type, newPrice, countInStock, description, category} = req.body;
        if (
            !name ||
            !type ||
            !newPrice ||
            !countInStock ||
            !description ||
            !category
        ) {
            return res.status(400).json({
                status: "Error",
                message: "The input is required",
            });
        }

        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({
                status: "Error",
                message: "At least one product image is required",
            });
        }

        const validCategories = ['Hot Deals', 'Discounts', 'New Arrivals', 'Black Friday Deals'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                status: "Error",
                message: `The category must be one of these values: ${validCategories.join(', ')}`,
            });
        }
        const result = await ProductService.addNewProduct(req.body);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message || error,
        });
    }
};

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
