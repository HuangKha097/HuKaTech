const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.post("/add-new-product", productController.addNewProduct);
router.get("/get-all-products", productController.getAllProducts);
router.get("/get-product-by-id", productController.getProductById);
router.get("/get-product-to-show-home", productController.getProductToShowHome);
router.get(
  "/get-products-by-category",
  productController.getProductsByCategory
);
router.get("/get-products-by-name", productController.getProductsByName);
router.get("/get-products-by-type", productController.getProductsByType);
router.delete("/delete-product", productController.deleteProduct);

module.exports = router;
