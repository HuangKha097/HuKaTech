const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        email: { type: String, default: '' },
        address: { type: String, default: '' },
        totalOrders: { type: Number, default: 0 }, // Số đơn hàng giao thành công
        totalSpent: { type: Number, default: 0 },  // Tổng tiền đã chi
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;