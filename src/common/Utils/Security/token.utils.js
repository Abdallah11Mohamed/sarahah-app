
import jwt from "jsonwebtoken";
import { BadException } from "../../errors/bad.exception.js";
import envConfig from "../../../Config/config.js";
import { userRepo } from "../../../Db/Repositories/user.repository.js";
import { tokenTypeEnum } from "../../constants.js";

const jwtConfig = envConfig.jwt;

export const generateToken = (
    payload = {},
    secret = "",
    options = {}
) => {
    return jwt.sign(payload, secret, options);
};

export const verifyToken = (
    token,
    secret = "",
    options = {}
) => {
    return jwt.verify(token, secret, options);
};

export const decodeToken = async ({ token, tokenType }) => {
    const data = jwt.decode(token);

    if (!data?.role) {
        throw new BadException(
            "Role not found in token",
            401,
            ["MISSING_ROLE"]
        );
    }

    const roleConfig = jwtConfig[data.role];

    if (!roleConfig) {
        throw new BadException(
            "Invalid role in token",
            401,
            ["UNAUTHORIZED"]
        );
    }

    let signature;

    if (tokenType === tokenTypeEnum.REFRESH_TOKEN) {
        signature = roleConfig.refresh_token_secret;
    } else if (tokenType === tokenTypeEnum.ACCESS_TOKEN) {
        signature = roleConfig.access_token_secret;
    } else {
        throw new BadException(
            "Invalid token type",
            401,
            ["INVALID_TOKEN_TYPE"]
        );
    }

    const decodedData = verifyToken(token, signature);

    const user = await userRepo.findDocumentById(
        decodedData._id,
        "-password"
    );

    if (!user) {
        throw new BadException(
            "User not found",
            401,
            ["UNAUTHORIZED"]
        );
    }

    return user;
};
