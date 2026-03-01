const Cart = require("../models/CartModel");

const addProduct = async ({userId, productId, name, price, quantity}) => {
    let cart = await Cart.findOne({userId})
    console.log("userId nhận vào:", userId);
    console.log("cart tìm được:", cart);
    if (!cart) {
        // Chưa có giỏ -> tạo mới
        cart = new Cart({
            userId,
            items: [{product: productId, name, price, quantity}]
        })
    } else {
        // Đã có giỏ -> kiểm tra sp có trong giỏ chưa
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        )

        if (itemIndex > -1) {
            // Nếu sản phẩm đã tồn tại thì tăng số lượng
            cart.items[itemIndex].quantity += quantity
            cart.items[itemIndex].price += price
        } else {
            // Nếu chưa có thì thêm mới
            cart.items.push({product: productId, name, price, quantity})
        }

    }
    await cart.save();
    return cart
}

const getProducts = async (cartId) => {
    try {
        const products = await Cart.findOne({_id: cartId})
        return ({
            status: "OK",
            message: "SUCCESS",
            data: products
        });
    } catch (error) {
        return (error);
    }
    ;
}

module.exports = {
    addProduct,
    getProducts
};
