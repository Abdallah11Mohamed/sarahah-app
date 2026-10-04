import { userModel } from "../Db/Models/user.model.js";

export const signup = async (body) => {

    const {
        username,
        email,
        password,
        phone
    } = body;

    const isExistingUser = await userModel.findOne({ email });

    if (isExistingUser) {
        throw new Error("User already exists");
    }

    const user = await userModel.create({
        username,
        email,
        password,
        phone
    });

    return user;
};


export const login = async (body) => {

    const {
        email,
        password
    } = body;

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    return user;
};