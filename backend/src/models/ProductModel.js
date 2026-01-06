const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        images: [
            {
                url: {type: String, required: true}
            }
        ],
        type: {
            type: String,
            required: true,
        },
        oldPrice: {type: Number, required: false},
        newPrice: {type: Number, required: true},
        countInStock: {type: Number, required: true},
        rating: {type: Number, required: false},
        description: {type: String, required: true},
        category: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
