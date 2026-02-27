const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require('../middlewares/authMiddleware')

router.post("/add-new-category", authMiddleware, categoryController.addNewCategory)
router.put("/update-category/:id", authMiddleware, categoryController.updateCategory)
router.delete("/delete-category/:id", authMiddleware, categoryController.deleteCategory)

module.exports = router;