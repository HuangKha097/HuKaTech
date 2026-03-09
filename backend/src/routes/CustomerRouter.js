const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/CustomerController");

// BỔ SUNG IMPORT authMiddleware
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all", authMiddleware, CustomerController.getAllCustomers);
router.get("/search", authMiddleware, CustomerController.searchCustomers);
router.put("/update/:id", authMiddleware, CustomerController.updateCustomer);
router.delete("/delete/:id", authMiddleware, CustomerController.deleteCustomer);

module.exports = router;