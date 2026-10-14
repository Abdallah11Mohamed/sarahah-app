
import { userModel } from "../Db/Models/user.model.js";
import { BadException } from "../common/errors/bad.exception.js";
import { config } from "../Config/config.js";
import { verifyToken } from "../common/Utils/Security/token.utils.js";


const publicUserProjection = "-password -__v";

// get profile by token
export const getProfileById = async (token) => {
    let decodedData;

    try {
        decodedData = verifyToken(token, config.jwtSecret);
    } catch (error) {
        throw new BadException("Invalid or expired access token", 401);
    }

    const user = await userModel
        .findById(decodedData.userId)
        .select(publicUserProjection);

    if (!user) {
        throw new BadException("User not found", 404);
    }

    return user;
};

// list all users
export const getAllUsers = async () => {
    return userModel
        .find()
        .select(publicUserProjection)
        .sort({ createdAt: -1 });
};

// update profile
export const updateProfile = async (updates, userId) => {
    const user = await userModel.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
    ).select(publicUserProjection);

    if (!user) {
        throw new BadException("User not found", 404);
    }

    return user;
};

// delete profile
export const deleteProfile = async (userId) => {
    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
        throw new BadException("User not found", 404);
    }

    return {
        _id: user._id,
        message: "User deleted successfully"
    };
};
