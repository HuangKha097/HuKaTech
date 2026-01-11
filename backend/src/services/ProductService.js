const Product = require("../models/ProductModel");
const { uploadToCloudinary, deleteFromCloudinary } = require("../middlewares/cloudinary");
const addNewProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {name} = newProduct;

            const checkProduct = await Product.findOne({name: name});
            if (checkProduct !== null) {
                return resolve({
                    status: "ERR",
                    message: "Tên sản phẩm đã tồn tại",
                });
            }

            // Dữ liệu newProduct đã được Controller định dạng chuẩn (bao gồm images có public_id)
            const createdProduct = await Product.create(newProduct);

            if (createdProduct) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdProduct,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
const updateProduct = async (productUpdate) => {
    try {
        // Lấy _id và name từ object controller truyền xuống
        const {_id, name} = productUpdate;

        // Check trùng tên (Trừ chính thằng đang sửa ra: $ne: _id)
        const checkProduct = await Product.findOne({
            name: name,
            _id: {$ne: _id}
        });

        if (checkProduct) {
            return {
                status: "ERR",
                message: "Tên sản phẩm đã tồn tại"
            };
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            productUpdate,
            {new: true}
        );

        if (!updatedProduct) {
            return {
                status: "ERR",
                message: "Không tìm thấy sản phẩm"
            };
        }

        return {
            status: "OK",
            message: "SUCCESS",
            data: updatedProduct
        };

    } catch (error) {
        return {
            status: "ERR",
            message: error.message
        };
    }
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
            const products = await Product.find({category: category});
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
                name: {$regex: name, $options: "i"},
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
                type: {$regex: searchType, $options: "i"},
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

const getRelatedProducts = async (type, currentProductId) => {
    try {
        const products = await Product.find({
            type: {$regex: String(type), $options: "i"},
            _id: {$ne: currentProductId},
        }).limit(3);

        return {
            status: "OK",
            message: "SUCCESS",
            data: products,
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getRelatedProducts,
};


const getProductById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({_id: id});
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
            // 1. Tìm sản phẩm trước để lấy thông tin ảnh
            const checkProduct = await Product.findOne({_id: id});

            if (checkProduct === null) {
                return resolve({
                    status: "ERR",
                    message: "Sản phẩm không tồn tại",
                });
            }

            // 2. Xóa ảnh trên Cloudinary (nếu có)
            // Kiểm tra xem mảng images có dữ liệu không
            if (checkProduct.images && checkProduct.images.length > 0) {
                // Dùng Promise.all để xóa nhiều ảnh cùng lúc cho nhanh
                const deletePromises = checkProduct.images.map(img => {
                    if (img.public_id) {
                        return deleteFromCloudinary(img.public_id);
                    }
                    return Promise.resolve();
                });

                await Promise.all(deletePromises);
            }

            // 3. Sau khi xóa ảnh xong thì mới xóa trong Database
            await Product.findByIdAndDelete(id);

            resolve({
                status: "OK",
                message: "Delete product & images success",
            });
        } catch (error) {
            reject(error);
        }
    });
};
const handleActiveProduct = async (id) => {
    try {
        const product = await Product.findById(id);

        if (!product) {
            return {
                status: "ERR",
                message: "Product not found"
            };
        }

        product.status = product.status === "active"
            ? "inactive"
            : "active";

        await product.save();

        return {
            status: "OK",
            message: "Update product status success",
            data: product
        };
    } catch (error) {
        return {
            status: "ERR",
            message: error.message
        };
    }
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
    getRelatedProducts,
    handleActiveProduct,
    updateProduct
};
