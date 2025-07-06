import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }}, { timestamps: true } );

module.exports = mongoose.model("imageContent", imageSchema);
