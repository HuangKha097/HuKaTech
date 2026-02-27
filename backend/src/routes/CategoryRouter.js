const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require('../middlewares/authMiddleware')

router.post("/add-new-category", authMiddleware, categoryController.addNewCategory)
router.put("/update-category/:id", authMiddleware, categoryController.updateCategory)
router.delete("/delete-category/:id", authMiddleware, categoryController.deleteCategory)
router.get("/get-all-categories", authMiddleware, categoryController.getAllCategories)
router.get("/search-categories", authMiddleware, categoryController.searchCategories)
router.get("/get-active-categories", authMiddleware, categoryController.getActiveCategories)

module.exports = router;