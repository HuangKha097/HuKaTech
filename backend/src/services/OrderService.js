const Order = require("../models/OrderModel");

const Product = require("../models/ProductModel");

// Hàm tính toán trạng thái
const calculateStatusByStock = (countInStock, currentStatus) => {
    if (currentStatus === "inactive") return "inactive";
    const stock = Number(countInStock);
    if (stock <= 0) return "out-of-stock";
    if (stock <= 5) return "low-stock";
    return "active";
};

const createNewOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const {id, name, email, phone, address, city, moreInfo, payMethod, cart, status} = newOrder;

        try {
            let verifiedCart = [];

            for (let i = 0; i < cart.length; i++) {
                const item = cart[i];

                const realProduct = await Product.findById(item.id);

                if (!realProduct) {
                    return resolve({
                        status: "ERR",
                        message: `Sản phẩm không tồn tại trên hệ thống.`,
                    });
                }

                //  Check tồn kho thật
                if (item.quantity > realProduct.countInStock) {
                    return resolve({
                        status: "ERR",
                        message: `Sản phẩm "${realProduct.name}" chỉ còn ${realProduct.countInStock}. Vui lòng điều chỉnh lại số lượng!`,
                    });
                }

                // Chặn mua hàng nếu sản phẩm đã bị ẩn hoặc hết hàng từ trước
                if (realProduct.status === 'inactive' || realProduct.status === 'out-of-stock') {
                    return resolve({
                        status: "ERR",
                        message: `Sản phẩm "${realProduct.name}" hiện đang ngừng kinh doanh hoặc hết hàng.`,
                    });
                }

                // Dữ liệu chuẩn (Ép dùng giá từ DB, bỏ qua giá từ Frontend
                verifiedCart.push({
                    id: realProduct._id,
                    product_name: realProduct.name,
                    quantity: Number(item.quantity),
                    price: realProduct.newPrice, // LẤY GIÁ TỪ DATABASE
                    image_url: item.image_url
                });
            }

            const createOrder = await Order.create({
                id,
                name,
                email,
                phone,
                address,
                city,
                moreInfo,
                payMethod,
                cart: verifiedCart, // LƯU GIỎ HÀNG CHUẨN VÀO DB
                status
            });

            if (createOrder) {
                // Đơn hàng tạo thành công, tiến hành trừ kho
                for (let i = 0; i < verifiedCart.length; i++) {
                    const item = verifiedCart[i];
                    const product = await Product.findById(item.id);

                    const newStock = product.countInStock - item.quantity;
                    // Cập nhật lại trạng thái- mua xong cái cuối cùng  đổi thành out-of-stock
                    const newStatus = calculateStatusByStock(newStock, product.status);

                    await Product.findByIdAndUpdate(item.id, {
                        countInStock: newStock,
                        status: newStatus
                    });
                }

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

            // Lọc theo status
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
                return;
            }

            // runValidators: true để Mongoose kiểm tra enum của status khi update
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
            console.log(order);

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