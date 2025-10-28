const Order = require("../models/OrderModel");

const createNewOrder = async (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { id, name, email, phone, address, city, moreInfo, payMethod, cart } =
      newOrder;

    try {
      const createNewOrder = await Order.create({
        id,
        name,
        email,
        phone,
        address,
        city,
        moreInfo,
        payMethod,
        cart,
      });
      if (createNewOrder) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createNewOrder,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewOrder,
};
