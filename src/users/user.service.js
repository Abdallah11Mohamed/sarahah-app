import userModel from "../../DB/Models/user.model.js";

export const signUp = async (body) => {
    const { firstName, lastName, email, password } = body;

    const isEmailExists = await userModel.findOne({ email });

    console.log({ isEmailExists });

    if (isEmailExists) {
        throw new Error("Email already exists");
    }

    return userModel.insertOne({
        firstName,
        lastName,
        email,
        password
    });
};