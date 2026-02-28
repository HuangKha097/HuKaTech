const OrderService = require("../services/OrderService");

const createNewOrder = async (req, res) => {
    try {
        const {name, email, phone, address, city, payMethod, cart} = req.body;
        // Bỏ moreInfo và status ra khỏi điều kiện bắt buộc vì nó có thể tùy chọn hoặc mặc định
        if (!name || !email || !phone || !address || !city || !payMethod || !cart) {
            return res.status(400).json({
                status: "ERR",
                message: "The input is required",
            });
        }
        const result = await OrderService.createNewOrder(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: error.message || error,
        });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const response = await OrderService.getAllOrder();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: error.message || error,
        });
    }
};

const searchOrder = async (req, res) => {
    try {
        // req.query chứa dữ liệu sau dấu ? trên url (VD: /search-order?status=Pending&phone=098)
        const response = await OrderService.searchOrder(req.query);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: error.message || error,
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const data = req.body;

        if (!orderId) {
            return res.status(400).json({
                status: "ERR",
                message: "The orderId is required in params",
            });
        }

        const response = await OrderService.updateOrder(orderId, data);

        // Nếu kết quả trả về là lỗi từ service
        if (response.status === "ERR") {
            return res.status(404).json(response);
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            // Nếu có lỗi ValidationError từ Mongoose (do enum), nó sẽ hiện thông báo chi tiết ở đây
            message: error.message || error,
        });
    }
};
const getOrderByUserId = async (req, res) => {
    try {
        const userId = req.params.id; // Lấy ID user từ tham số URL

        if (!userId) {
            return res.status(400).json({
                status: "ERR",
                message: "The userId is required in params",
            });
        }

        const response = await OrderService.getOrderByUserId(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: error.message || error,
        });
    }
};
const getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.id;

        if (!orderId) {
            return res.status(400).json({
                status: "ERR",
                message: "The orderId is required in params",
            });
        }

        const response = await OrderService.getOrderDetails(orderId);

        if (response.status === "ERR") {
            return res.status(404).json(response);
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: error.message || error,
        });
    }
};
module.exports = {
    createNewOrder,
    getAllOrder,
    searchOrder,
    updateOrder,
    getOrderByUserId,
    getOrderDetails
};