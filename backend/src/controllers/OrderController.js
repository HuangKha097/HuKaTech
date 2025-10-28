const OrderSerVice = require("../services/OrderService");

const createNewOrder = async (req, res) => {
  try {
    const { name, email, phone, address, city, moreInfo, payMethod, cart } =
      req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !moreInfo ||
      !payMethod ||
      !cart
    ) {
      return res.statuc(200).json({
        status: "ERROR",
        message: "The input is required",
      });
    }
    const result = await OrderSerVice.createNewOrder(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createNewOrder,
};
