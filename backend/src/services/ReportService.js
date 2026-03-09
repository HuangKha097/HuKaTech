const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
const mongoose = require("mongoose");

const getSalesReport = (timeRange) => {
    return new Promise(async (resolve, reject) => {
        try {
            // 1. XÁC ĐỊNH KHOẢNG THỜI GIAN
            const now = new Date();
            let startDate = new Date();

            if (timeRange === '7days') {
                startDate.setDate(now.getDate() - 7);
            } else if (timeRange === '30days') {
                startDate.setDate(now.getDate() - 30);
            } else if (timeRange === 'year') {
                startDate.setFullYear(now.getFullYear() - 1);
            }

            // Điều kiện lọc chung
            const dateFilter = { createdAt: { $gte: startDate, $lte: now } };
            const deliveredFilter = { ...dateFilter, status: "Delivered" };

            // ==========================================
            // A. TÍNH TOÁN KPI CARDS
            // ==========================================
            const totalOrders = await Order.countDocuments(dateFilter);

            // Tính số lượng khách hàng unique (dựa trên số điện thoại)
            const uniqueCustomers = await Order.distinct("phone", dateFilter);
            const totalCustomers = uniqueCustomers.length;

            // Tính tổng doanh thu và số sản phẩm bán ra
            const stats = await Order.aggregate([
                { $match: deliveredFilter },
                { $unwind: "$cart" },
                { $group: {
                        _id: null,
                        totalRevenue: { $sum: { $multiply: ["$cart.price", "$cart.quantity"] } },
                        productsSold: { $sum: "$cart.quantity" }
                    }}
            ]);

            const totalRevenue = stats.length > 0 ? stats[0].totalRevenue : 0;
            const productsSold = stats.length > 0 ? stats[0].productsSold : 0;

            // ==========================================
            // B. DỮ LIỆU BIỂU ĐỒ (CHARTS)
            // ==========================================

            // 1. Biểu đồ Doanh thu (Gộp theo ngày hoặc tháng)
            const dateFormat = timeRange === 'year' ? "%m/%Y" : "%d/%m";
            const revenueTrend = await Order.aggregate([
                { $match: deliveredFilter },
                { $unwind: "$cart" },
                { $group: {
                        _id: { $dateToString: { format: dateFormat, date: "$createdAt", timezone: "+07:00" } },
                        revenue: { $sum: { $multiply: ["$cart.price", "$cart.quantity"] } }
                    }},
                { $sort: { "_id": 1 } }, // Sắp xếp theo thời gian
                { $project: { _id: 0, name: "$_id", revenue: 1 } } // Đổi tên field cho khớp Frontend
            ]);

            // 2. Biểu đồ Danh mục (Cần lookup sang collection products)
            const categoryData = await Order.aggregate([
                { $match: deliveredFilter },
                { $unwind: "$cart" },
                { $lookup: {
                        from: "products", // Tên collection trong MongoDB (thường là chữ thường số nhiều)
                        localField: "cart.id",
                        foreignField: "_id",
                        as: "productInfo"
                    }},
                { $unwind: "$productInfo" },
                { $group: {
                        _id: "$productInfo.category",
                        value: { $sum: "$cart.quantity" } // Tính theo số lượng bán ra
                    }},
                { $project: { _id: 0, name: "$_id", value: 1 } }
            ]);


            // 1. Top sản phẩm bán chạy
            const topProducts = await Order.aggregate([
                { $match: deliveredFilter },
                { $unwind: "$cart" },
                { $group: {
                        _id: "$cart.id",
                        name: { $first: "$cart.product_name" },
                        sold: { $sum: "$cart.quantity" },
                        revenue: { $sum: { $multiply: ["$cart.price", "$cart.quantity"] } }
                    }},
                { $sort: { revenue: -1 } }, // Xếp giảm dần theo doanh thu
                { $limit: 5 } // Lấy top 5
            ]);

            // 2. Đơn hàng gần nhất (Lấy tất cả trạng thái)
            const recentOrdersRaw = await Order.find(dateFilter).sort({ createdAt: -1 }).limit(5);
            const recentOrders = recentOrdersRaw.map(order => {
                // Tính tổng tiền đơn hàng vì schema Order không có sẵn totalPrice
                const total = order.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                return {
                    _id: order._id,
                    customer: order.name,
                    total: total,
                    status: order.status
                };
            });

            // TRẢ VỀ TOÀN BỘ KẾT QUẢ CHO FRONTEND
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: {
                    kpi: { totalRevenue, totalOrders, productsSold, totalCustomers },
                    charts: { revenueTrend, categoryData },
                    tables: { topProducts, recentOrders }
                }
            });

        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getSalesReport
};