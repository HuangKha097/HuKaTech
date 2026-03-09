const ProductRouter = require("./ProductRouter");
const CartRouter = require("./CartRouter");
const OrderRouter = require("./OrderRouter");
const UserRouter = require("./UserRouter");
const CategoryRouter = require("./CategoryRouter");
const CustomerRouter = require("./CustomerRouter");
const ReportRouter = require("./ReportRouter");

const routes = (app) => {
    app.use("/api/product", ProductRouter);
    app.use("/api/cart", CartRouter);
    app.use("/api/order", OrderRouter);
    app.use("/api/user", UserRouter);
    app.use("/api/category", CategoryRouter);
    app.use("/api/customer", CustomerRouter);
    app.use("/api/report", ReportRouter);
};

module.exports = routes;
