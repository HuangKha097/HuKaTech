const Customer = require("../models/CustomerModel");

// 1. Tự động thêm hoặc cập nhật thông tin khi có đơn hàng mới
const upsertCustomer = async (data) => {
    try {
        const { name, phone, email, address } = data;
        const existingCustomer = await Customer.findOne({ phone });

        if (existingCustomer) {
            // Nếu khách đã tồn tại, cập nhật thông tin mới nhất (nhưng không đụng tới totalOrders/Spent)
            existingCustomer.name = name || existingCustomer.name;
            existingCustomer.email = email || existingCustomer.email;
            existingCustomer.address = address || existingCustomer.address;
            await existingCustomer.save();
            return existingCustomer;
        } else {
            // Nếu khách mới hoàn toàn
            const newCustomer = await Customer.create({ name, phone, email, address });
            return newCustomer;
        }
    } catch (error) {
        console.error("Error upserting customer:", error);
    }
};

// 2. Cộng dồn doanh thu và số đơn khi đơn hàng được giao thành công (Deliveried)
const incrementCustomerStats = async (phone, orderTotal) => {
    try {
        await Customer.findOneAndUpdate(
            { phone: phone },
            {
                $inc: {
                    totalOrders: 1,
                    totalSpent: orderTotal || 0
                }
            }
        );
    } catch (error) {
        console.error("Error incrementing customer stats:", error);
    }
};


const getAllCustomers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allCustomers = await Customer.find().sort({ createdAt: -1 });
            resolve({ status: "OK", message: "SUCCESS", data: allCustomers });
        } catch (error) {
            reject(error);
        }
    });
};

const searchCustomers = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { keyword } = query;
            let filter = {};

            if (keyword) {
                // Tìm kiếm theo tên hoặc số điện thoại
                filter = {
                    $or: [
                        { name: { $regex: keyword, $options: 'i' } },
                        { phone: { $regex: keyword, $options: 'i' } }
                    ]
                };
            }

            const customers = await Customer.find(filter).sort({ createdAt: -1 });
            resolve({ status: "OK", message: "SUCCESS", data: customers });
        } catch (error) {
            reject(error);
        }
    });
};

const updateCustomer = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCustomer = await Customer.findById(id);
            if (!checkCustomer) {
                return resolve({ status: "ERR", message: "Customer not found" });
            }

            const updatedCustomer = await Customer.findByIdAndUpdate(id, data, { new: true });
            resolve({ status: "OK", message: "SUCCESS", data: updatedCustomer });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteCustomer = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCustomer = await Customer.findById(id);
            if (!checkCustomer) {
                return resolve({ status: "ERR", message: "Customer not found" });
            }

            await Customer.findByIdAndDelete(id);
            resolve({ status: "OK", message: "Deleted Successfully" });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    upsertCustomer,
    incrementCustomerStats,
    getAllCustomers,
    searchCustomers,
    updateCustomer,
    deleteCustomer
};