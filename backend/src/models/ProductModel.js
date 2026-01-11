const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        images: [
            {
                url: {type: String, required: true},
                public_id: {type: String, required: true}
            }
        ],
        type: {type: String, required: true},
        oldPrice: {type: Number},
        newPrice: {type: Number, required: true},
        countInStock: {type: Number, required: true},
        rating: {type: Number},
        description: {type: String, required: true},
        category: {type: String, required: true},
        status: {
            type: String,
            enum: ["active", "inactive", "low-stock", "out-of-stock"],
            default: "active"
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);
