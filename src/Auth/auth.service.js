
import { userModel } from "../Db/Models/user.model.js";
import { hash, compareHash } from "../common/Utils/Security/hash.security.js";
import {
    generateToken,
    decodeToken
} from "../common/Utils/Security/token.utils.js";

import { tokenTypeEnum } from "../common/constants.js";
import { config } from "../Config/config.js";
import { BadException } from "../common/errors/bad.exception.js";

const publicUser = (user) => ({
    _id: user._id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

// Sign up
export const signup = async (body) => {
    const { username, email, password, phone } = body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        throw new BadException("Email already exists", 409);
    }

    const user = await userModel.create({
        username,
        email,
        password: await hash(password),
        phone
    });

    return publicUser(user);
};

// Login

export const login = async (body) => {
    const { email, password } = body;

    const user = await userModel
        .findOne({ email })
        .select("+password");

    if (!user || !(await compareHash(password, user.password))) {
        throw new BadException("Invalid email or password", 401);
    }

    const userJwtConfig = config.jwt.user;

    const accessToken = generateToken(
        {
            _id: user._id.toString(),
            email: user.email,
            role: user.role
        },
        userJwtConfig.access_token_secret,
        {
            expiresIn: userJwtConfig.access_token_expires_in
        }
    );

    const refreshToken = generateToken(
        {
            _id: user._id.toString(),
            email: user.email,
            role: user.role
        },
        userJwtConfig.refresh_token_secret,
        {
            expiresIn: userJwtConfig.refresh_token_expires_in
        }
    );

    return {
        user: publicUser(user),
        accessToken,
        refreshToken
    };
};





export const refreshToken = async (userRefreshToken) => {
    const user = await decodeToken({
        token: userRefreshToken,
        tokenType: tokenTypeEnum.REFRESH_TOKEN
    });

    const userJwtConfig = config.jwt.user;

    const accessToken = generateToken(
        {
            _id: user._id.toString(),
            email: user.email,
            role: user.role
        },
        userJwtConfig.access_token_secret,
        {
            expiresIn: userJwtConfig.access_token_expires_in
        }
    );

    return {
        message: "Token refreshed successfully",
        accessToken
    };
};


