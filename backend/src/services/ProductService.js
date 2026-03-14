const Product = require("../models/ProductModel");
const {uploadToCloudinary, deleteFromCloudinary} = require("../middlewares/cloudinary");

const calculateStatusByStock = (countInStock, currentStatus) => {
    if (currentStatus === "inactive") return "inactive";

    const stock = Number(countInStock);
    if (stock <= 0) return "out-of-stock";
    if (stock <= 5) return "low-stock";

    return "active";
};

const addNewProduct = async (newProduct) => {
    try {
        const {name} = newProduct;

        const checkProduct = await Product.findOne({name: name});
        if (checkProduct !== null) {
            return {
                status: "ERR",
                message: "Tên sản phẩm đã tồn tại",
            };
        }

        newProduct.status = calculateStatusByStock(newProduct.countInStock, newProduct.status);

        const createdProduct = await Product.create(newProduct);

        if (createdProduct) {
            return {
                status: "OK",
                message: "SUCCESS",
                data: createdProduct,
            };
        }
    } catch (error) {
        return error;
    }
};
const updateProduct = async (productUpdate) => {
    try {
        const {_id, name, countInStock, status} = productUpdate;

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

        const existingProduct = await Product.findById(_id);
        if (!existingProduct) {
            return {
                status: "ERR",
                message: "Không tìm thấy sản phẩm"
            };
        }

        const updatedStock = countInStock !== undefined ? countInStock : existingProduct.countInStock;
        const targetStatus = status !== undefined ? status : existingProduct.status;

        productUpdate.status = calculateStatusByStock(updatedStock, targetStatus);

        const updatedProduct = await Product.findByIdAndUpdate(
            _id,
            productUpdate,
            {new: true}
        );

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

const getAllProducts = async () => {
    try {
        const products = await Product.find({status: {$ne: "inactive"}});

        return {
            status: "OK",
            message: "SUCCESS",
            data: products,
        };
    } catch (error) {
        return error;
    }

};

const advancedSearchProductAdmin = async (payload) => {
    try {
        const {name, type, status} = payload;
        const query = {};
        if (!name && !type && !status) {
            return reject({
                status: "ERR",
                message: "Cần ít nhất một trường dữ liệu để tìm kiếm",
            })
        }
        if (name) {
            query.name = {$regex: name, $options: 'i'};

        }
        if (type) {
            query.type = type;
        }

        if (status) {
            query.status = status;
        }

        const searchResults = await Product.find(query);

        return {
            status: "OK",
            message: "Success",
            data: searchResults,
            total: searchResults.length
        };

    } catch (e) {
        return {
            status: "ERR",
            message: "Lỗi hệ thống",
            error: e
        };
    }

};
const advancedSearchProductClient = async (payload) => {
    const {name, type, brand, priceRange} = payload;
    const query = {status: {$ne: "inactive"}};

    if (
        !name &&
        (!type || type.length === 0) &&
        (!brand || brand.length === 0) &&
        !priceRange
    ) {
        return {status: "OK", data: [], total: 0};
    }

    if (name) {
        query.name = {$regex: name, $options: "i"};
    }

    if (type?.length) {
        query.type = {$in: type};
    }

    if (brand?.length) {
        query.brand = {$in: brand};
    }

    if (priceRange) {
        switch (priceRange) {
            case "< 500,000 đ":
                query.newPrice = {$lt: 500000};
                break;
            case "500,000 đ - 1,500,000 đ":
                query.newPrice = {$gte: 500000, $lte: 1500000};
                break;
            case "1,500,001 đ - 3,500,000 đ":
                query.newPrice = {$gte: 1500000, $lte: 3500000};
                break;
            case "> 3,500,000 đ":
                query.newPrice = {$gt: 3500000};
                break;
        }
    }

    const products = await Product.find(query);

    return {
        status: "OK",
        data: products,
        total: products.length
    };
};

const getProductToShowHome = async () => {
    try {
        // $ne = not equal
        const products = await Product.find({status: {$ne: "inactive"}}).limit(3);
        return {
            status: "OK",
            message: "SUCCESS",
            data: products,
        };
    } catch (error) {
        return error;
    }

};


const getProductsByCategory = async (category, limit, skip) => {
    try {
        const query = {category: category, status: {$ne: "inactive"}};

        const limitNum = limit ? Number(limit) : 9;
        const skipNum = skip ? Number(skip) : 0;

        const products = await Product.find(query)
            .skip(skipNum)
            .limit(limitNum);


        const total = await Product.countDocuments(query);

        return {
            status: "OK",
            message: "SUCCESS",
            data: products,
            total: total,
        };
    } catch (error) {
        return {
            status: "ERR",
            message: error.message
        };
    }
};

const getProductsByName = async (name) => {

    try {
        const products = await Product.find({
            name: {$regex: name, $options: "i"}, status: {$ne: "inactive"}
            // $regex: name: tìm các name có chứa chuỗi da nhập ( chuoi con).
            // $options: "i": không phân biệt chữ hoa/thường.
        });
        return {
            status: "OK",
            message: "SUCCESS",
            data: products,
        };
    } catch (error) {
        return error;
    }

};
const getProductsByType = async (type) => {

    try {
        const searchType = String(type); // ép về string an toàn
        const products = await Product.find({
            type: {$regex: searchType, $options: "i"}, status: {$ne: "inactive"}
        });

        return {
            status: "OK",
            message: "SUCCESS",
            data: products,
        };
    } catch (error) {
        return error;
    }

};

const getRelatedProducts = async (type, currentProductId) => {
    try {
        const products = await Product.find({
            type: {$regex: String(type), $options: "i"},
            _id: {$ne: currentProductId},
            status: {$ne: "inactive"}
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


const getProductById = async (id) => {
    try {
        const product = await Product.findOne({_id: id});
        return {
            status: "OK",
            message: "SUCCESS",
            data: product,
        };
    } catch (error) {
        return error;
    }

};
const deleteProduct = async (id) => {

    try {

        const checkProduct = await Product.findOne({_id: id});

        if (checkProduct === null) {
            return resolve({
                status: "ERR",
                message: "Sản phẩm không tồn tại",
            });
        }

        // Xóa ảnh trên Cloudinary (nếu có)
        // Kiểm tra xem mảng images có dữ liệu không
        if (checkProduct.images && checkProduct.images.length > 0) {
            // Dùng Promise.all xóa nhiều ảnh cùng lúc
            const deletePromises = checkProduct.images.map(img => {
                if (img.public_id) {
                    return deleteFromCloudinary(img.public_id);
                }
                return Promise.resolve();
            });

            await Promise.all(deletePromises);
        }

        await Product.findByIdAndDelete(id);

        return {
            status: "OK",
            message: "Delete product & images success",
        };
    } catch (error) {
        return error;
    }

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

        if (product.status === "inactive") {
            product.status = calculateStatusByStock(product.countInStock, "active");
        } else {
            product.status = "inactive";
        }

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
    updateProduct,
    advancedSearchProductAdmin,
    advancedSearchProductClient
};
