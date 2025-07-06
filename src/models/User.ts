import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        default: "/media/images/default.png",
    },
    description: {
        type: String,
        default: "",
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", UserSchema);
