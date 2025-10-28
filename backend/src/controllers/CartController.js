const CartService = require("../services/CartService")

const addProduct = async (req, res) => {
  try {
    const { userId, productId, name , price , quantity } = req.body

    if (!userId || !productId) {
      return res.status(400).json({ message: "userId và productId là bắt buộc" })
    }

    const cart = await CartService.addProduct({
      userId,
      name , 
      price, 
      productId,
      quantity: quantity || 1
    })

    return res.status(200).json({
        message: "SUCCESS",
        data: cart
    })
  } catch (error) {
    console.error("Add to cart error:", error)
    return res.status(500).json({ message: "Lỗi server", error: error.message })
  }
}

const getProducts = async (req, res) => {
  try {
    const cartId = req.query._id
    const products = await CartService.getProducts(cartId)

    return res.status(200).json({
      message: "SUCCESS",
      data: products
    })
  } catch (error) {
    console.error("error:", error)
    return res.status(500).json({ message: "Lỗi server", error: error.message })
  }
}


module.exports = {
  addProduct,
  getProducts
}
