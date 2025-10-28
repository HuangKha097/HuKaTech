const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.post("/create-new-order", orderController.createNewOrder);

module.exports = router;
