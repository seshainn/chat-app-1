import mongoose from "mongoose";

const userModel = mongoose.Schema(
    {
        name: {
            type: String, required: true,
        },
        email: {
            type: String, required: true, unique: true,
        },
        password: {
            type: String, required: true,
        },
        picThr: {
            type: Boolean, required: true,
        },
        picName: {
            type: String, required: true,
        }
    },
    {
        timestamps: true,
    },
)

export const User = mongoose.model("User", userModel)