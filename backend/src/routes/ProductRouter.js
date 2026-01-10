const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

//  Import middleware upload từ file cấu hình (đảm bảo đường dẫn đúng)
const {upload} = require("../middlewares/cloudinary");

// 'images': Tên key
// 3: Số lượng file tối đa cho phép upload 1 lần
router.post(
    "/add-new-product",
    upload.array('images', 3),
    productController.addNewProduct
);
router.get("/get-all-products", productController.getAllProducts);

//các route lấy theo ID thường nên dùng params (/:id) thay vì query string
router.get("/get-product-by-id/:id", productController.getProductById);
router.get("/get-product-to-show-home", productController.getProductToShowHome);
router.get("/get-products-by-category", productController.getProductsByCategory);
router.get("/get-products-by-name", productController.getProductsByName);
router.get("/get-products-by-type", productController.getProductsByType);
router.get(
    "/get-related-products/:id",
    productController.getRelatedProducts
);


// Route xóa   nhận ID qua params
router.delete("/delete-product/:id", productController.deleteProduct);

module.exports = router;