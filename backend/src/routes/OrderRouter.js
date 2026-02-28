const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create-new-order", orderController.createNewOrder);

// User lấy danh sách lịch sử đơn hàng của chính họ
// router.get("/get-order-by-user/:id", orderController.getOrderByUserId);


// ==========================================
// API DÀNH CHO ADMIN
// TẤT CẢ PHẢI QUA BƯỚC XÁC THỰC authMiddleware
// ==========================================
router.get("/get-all-order", authMiddleware, orderController.getAllOrder);
router.get("/search-order", authMiddleware, orderController.searchOrder);
router.put("/update-order/:id", authMiddleware, orderController.updateOrder);
router.get("/get-order-details/:id", authMiddleware, orderController.getOrderDetails);


module.exports = router;