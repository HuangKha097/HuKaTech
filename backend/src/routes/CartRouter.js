const express = require("express");
const router = express.Router();
const cartController = require('../controllers/CartController')

router.post('/add-product', cartController.addProduct)
router.get('/get-products', cartController.getProducts)


module.exports = router;