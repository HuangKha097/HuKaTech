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

module.exports = {
    addNewCategory,
    updateCategory,
    deleteCategory,
}