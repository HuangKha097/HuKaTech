const ProductRouter = require("./ProductRouter");
const CartRouter = require("./CartRouter");
const OrderRouter = require("./OrderRouter");

const routes = (app) => {
  app.use("/api/product", ProductRouter);
  app.use("/api/cart", CartRouter);
  app.use("/api/order", OrderRouter);
};

module.exports = routes;
