import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    videoUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }}, { timestamps: true });

module.exports = mongoose.model("videoContent", mediaSchema);
