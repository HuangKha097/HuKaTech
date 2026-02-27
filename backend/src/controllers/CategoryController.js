const CategoryService = require("../services/CategoryService.js");

const addNewCategory = async (req, res) => {
    try {
        const {name, description, status} = req.body;

        if (!name || !description || !status) {
            return res.status(400).json({
                status: "ERR",
                message: "The input is required"
            });
        }

        const newCategory = {name, description, status};

        const result = await CategoryService.addNewCategory(newCategory);

        if (!result.success) {
            return res.status(400).json({
                status: "ERR",
                message: result.message
            });
        }

        return res.status(201).json({
            status: "SUCCESS",
            message: result.message, // Đã thêm message
            data: result.data
        });

    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        if (!categoryId) {
            return res.status(400).json({
                status: "ERR",
                message: "Category ID is required"
            });
        }

        const dataUpdate = {
            _id: categoryId,
            ...req.body,
        };

        const result = await CategoryService.updateCategory(dataUpdate);

        if (!result.success) {
            return res.status(400).json({
                status: "ERR",
                message: result.message
            });
        }

        return res.status(200).json({
            status: "SUCCESS",
            message: result.message, // Đã thêm message
            data: result.data
        });

    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        if (!categoryId) {
            return res.status(400).json({
                status: "ERR",
                message: "Category ID is required"
            });
        }

        const result = await CategoryService.deleteCategory(categoryId);

        if (!result.success) {
            return res.status(404).json({
                status: "ERR",
                message: result.message
            });
        }

        return res.status(200).json({
            status: "SUCCESS",
            message: result.message
        });

    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message || "Internal Server Error"
        });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const result = await CategoryService.getAllCategories();

        if (!result.success) {
            return res.status(400).json({
                status: "ERR",
                message: result.message
            });
        }

        return res.status(200).json({
            status: "SUCCESS",
            message: result.message, // Đã thêm message
            data: result.data
        });

    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message
        });
    }
};

const searchCategories = async (req, res) => {
    try {
        const {name, status} = req.query;

        const result = await CategoryService.searchCategories({name, status});

        if (!result.success) {
            return res.status(400).json({
                status: "ERR",
                message: result.message
            });
        }

        return res.status(200).json({
            status: "SUCCESS",
            message: result.message, // Đã thêm message
            data: result.data
        });
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message
        });
    }
};

const getActiveCategories = async (req, res) => {
    try {
        const result = await CategoryService.getActiveCategories();

        if (!result.success) {
            return res.status(400).json({
                status: "ERR",
                message: result.message
            });
        }

        return res.status(200).json({
            status: "SUCCESS",
            message: result.message, // Đã thêm message
            data: result.data
        });

    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: e.message
        });
    }
};

module.exports = {
    addNewCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    searchCategories,
    getActiveCategories
};