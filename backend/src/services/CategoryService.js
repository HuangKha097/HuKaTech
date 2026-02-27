const Category = require("../models/CategoryModel.js");

const addNewCategory = async (newCategory) => {
    try {
        const {name} = newCategory;

        const checkCategory = await Category.findOne({name});
        if (checkCategory) {
            return {
                success: false,
                message: `Category already exists`,
            }
        }
        const createdCategory = await Category.create(newCategory);
        return {
            success: true,
            message: `Created new category`,
            data: createdCategory,
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

const updateCategory = async (categoryUpdate) => {
    try {
        const {_id, name} = categoryUpdate;
        if (!_id) {
            return {
                success: false,
                message: "Category ID is required"
            };
        }
        const checkCategory = await Category.findOne({
            name: name,
            _id: {$ne: _id}
        })
        if (checkCategory) {
            return {
                success: false,
                message: `Category already exists`,
            }
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            _id,
            categoryUpdate,
            {new: true}
        )

        if (!updatedCategory) {
            return {
                success: false,
                message: `Can not find category`,
            }
        }
        return {
            success: true,
            message: "Successfully updated category",
            data: updatedCategory
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

const deleteCategory = async (categoryId) => {
    try {
        const checkCategory = await Category.findById(categoryId);
        if (!checkCategory) {
            return {
                success: false,
                message: `Category does not exist`,
            }
        }
        await Category.findByIdAndDelete(categoryId);
        return {
            success: true,
            message: "Successfully deleted category",
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
const getAllCategories = async () => {
    try {
        const categories = await Category.find();
        return {
            success: true,
            message: "Successfully fetched all categories",
            data: categories,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

const searchCategories = async (queryParams) => {
    try {
        const {name, status} = queryParams;
        let query = {};

        // Nếu có truyền name thì tìm kiếm tương đối (không phân biệt hoa thường)
        if (name) {
            query.name = {$regex: name, $options: 'i'};
        }

        // Nếu có truyền status thì tìm chính xác theo status
        if (status) {
            query.status = status;
        }

        const categories = await Category.find(query);

        return {
            success: true,
            message: "Successfully fetched categories",
            data: categories,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
const getActiveCategories = async () => {
    try {
        const activeCategories = await Category.find({status: 'active'});

        return {
            success: true,
            message: "Successfully fetched active categories",
            data: activeCategories,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
module.exports = {
    addNewCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    searchCategories,
    getActiveCategories
}