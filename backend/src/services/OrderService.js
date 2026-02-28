const Order = require("../models/OrderModel");

const createNewOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const {id, name, email, phone, address, city, moreInfo, payMethod, cart, status} = newOrder;

        try {
            const createOrder = await Order.create({
                id,
                name,
                email,
                phone,
                address,
                city,
                moreInfo,
                payMethod,
                cart,
                status // Nếu không truyền lên, Mongoose sẽ tự động lấy mặc định là 'Pending'
            });
            if (createOrder) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createOrder,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Lấy tất cả và sắp xếp theo thời gian mới nhất
            const allOrder = await Order.find().sort({createdAt: -1});
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allOrder,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const searchOrder = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {status, phone, email} = query;
            let filter = {};

            // Lọc theo status (phải chính xác cụm từ trong enum)
            if (status) {
                filter.status = status;
            }
            // Lọc theo số điện thoại (chứa chuỗi con)
            if (phone) {
                filter.phone = {$regex: phone, $options: 'i'};
            }
            // Lọc theo email (chứa chuỗi con)
            if (email) {
                filter.email = {$regex: email, $options: 'i'};
            }

            const orders = await Order.find(filter).sort({createdAt: -1});
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: orders,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await Order.findById(id);
            if (!checkOrder) {
                resolve({
                    status: "ERR",
                    message: "The order is not defined",
                });
                return; // Dừng lại ở đây
            }

            // runValidators: true là BẮT BUỘC để Mongoose kiểm tra enum của status khi update
            const updatedOrder = await Order.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true
            });

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedOrder,
            });
        } catch (error) {
            reject(error);
        }
    });
};
const getOrderByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm các đơn hàng có trường 'id' trùng với userId truyền vào
            const orders = await Order.find({id: userId}).sort({createdAt: -1});
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: orders,
            });
        } catch (error) {
            reject(error);
        }
    });
};
const getOrderDetails = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById(orderId);

            if (!order) {
                resolve({
                    status: "ERR",
                    message: "The order is not defined",
                });
                return;
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: order,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createNewOrder,
    getAllOrder,
    searchOrder,
    updateOrder,
    getOrderByUserId,
    getOrderDetails
};