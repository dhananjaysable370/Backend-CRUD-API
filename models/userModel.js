import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true
    },

}, { timestamps: true });
export const User = mongoose.model('User', userModel);