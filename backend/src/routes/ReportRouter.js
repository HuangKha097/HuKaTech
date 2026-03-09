const express = require("express");
const router = express.Router();
const ReportController = require("../controllers/ReportController");
const authMiddleware = require("../middlewares/authMiddleware");

// Route này chỉ Admin mới được truy cập
router.get("/get-sales-report", authMiddleware, ReportController.getSalesReport);

module.exports = router;