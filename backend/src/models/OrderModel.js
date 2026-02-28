const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        // id riêng cho order nếu cần, không bắt buộc
        id: {type: String},
        name: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        address: {type: String, required: true},
        city: {type: String, required: true},
        moreInfo: {type: String},
        payMethod: {type: String, required: true},
        cart: {
            type: Array,
            require: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending',
            required: true
        }
    },
    {
        timestamps: true, // tự động thêm createdAt, updatedAt
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
