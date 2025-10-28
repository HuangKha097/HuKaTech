const Product = require("../models/ProductModel");

const addNewProduct = async (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      type,
      newPrice,
      countInStock,
      rating,
      description,
      benefits,
      category,
    } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "Product name has been existed",
        });
      }

      const createProduct = await Product.create({
        name,
        image,
        type,
        newPrice,
        countInStock,
        rating,
        description,
        benefits,
        category,
      });
      if (createProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.find(); // lấy tất cả sản phẩm

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: products,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getProductToShowHome = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.find().limit(3);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: products,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getProductsByCategory = (category) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.find({ category: category });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: products,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getProductsByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.find({
        name: { $regex: name, $options: "i" },
        // $regex: name: tìm các name có chứa chuỗi da nhập.
        // $options: "i": không phân biệt chữ hoa/thường.
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: products,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getProductsByType = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const searchType = String(type); // ép về string an toàn
      const products = await Product.find({
        type: { $regex: searchType, $options: "i" },
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: products,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({ _id: id });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: product,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findByIdAndDelete({ _id: id });
      resolve({
        status: "OK",
        message: "SUCCESS",
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getAllProducts,
  addNewProduct,
  getProductToShowHome,
  getProductsByCategory,
  getProductsByName,
  getProductsByType,
  getProductById,
  deleteProduct,
};
