const ProductRouter = require("./ProductRouter");
const CartRouter = require("./CartRouter");
const OrderRouter = require("./OrderRouter");
const UserRouter = require("./UserRouter");
const CategoryRouter = require("./CategoryRouter");

const routes = (app) => {
    app.use("/api/product", ProductRouter);
    app.use("/api/cart", CartRouter);
    app.use("/api/order", OrderRouter);
    app.use("/api/user", UserRouter);
    app.use("/api/category", CategoryRouter);
};

module.exports = routes;
