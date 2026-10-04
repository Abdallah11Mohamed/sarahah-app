import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minLength: [3, "Username must be at least 3 characters long"],
            maxLength: [30, "Username must be at most 30 characters long"],
            trim: true,
            lowercase: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        toJSON: { getters: true, virtuals: true },
        toObject: { getters: true, virtuals: true }
    }
);

export const userModel = mongoose.model("User", userSchema);