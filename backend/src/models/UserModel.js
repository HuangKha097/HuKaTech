const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type:String},
        email: { type: String },
        phone: { type: Number, required: true},
        address: { type: String},
        password: {type: String, required:true },
        isAdmin: { type: Boolean, default: false },
        access_token: { type: String },
        refresh_token: { type: String },
    },
    {
        // se co thoi gian tao va update
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);
module.exports = User;