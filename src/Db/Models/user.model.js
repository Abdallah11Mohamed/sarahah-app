import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: [3, "Username must be at least 3 characters long"],
            maxlength: [30, "Username must be at most 30 characters long"],
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user"
        }

    },
    { timestamps: true }
);

export const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
