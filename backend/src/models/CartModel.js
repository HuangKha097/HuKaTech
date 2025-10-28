const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Mỗi user chỉ có 1 cart
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          ref: "Product",
          required: true,
        },
        price: {
          type: Number,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true } // tự động tạo createdAt, updatedAt
);

const CartModel = mongoose.model("Cart", cartSchema);
module.exports = CartModel;
