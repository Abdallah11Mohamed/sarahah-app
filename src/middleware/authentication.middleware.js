import { userModel } from "../Db/Models/user.model.js";
import { BadException } from "../common/errors/bad.exception.js";
import { verifyToken } from "../common/Utils/Security/token.utils.js";
import { config } from "../Config/config.js";

export const authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new BadException(
                "Authorization header is missing",
                401
            );
        }

        const [prefix, token] = authorization.split(" ");

        if (prefix !== "Bearer" || !token) {
            throw new BadException(
                "Invalid authorization header format",
                401
            );
        }

   const decodedData = verifyToken(
    token,
    config.jwt.user.access_token_secret
);

        const user = await userModel
           .findById(decodedData._id)
            .select("-password -__v");

        if (!user) {
            throw new BadException("User not found", 404);
        }

        req.authUser = user;

        return next();
    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError" ||
            error.name === "NotBeforeError"
        ) {
            return next(
                new BadException(
                    "Invalid or expired access token",
                    401
                )
            );
        }

        return next(error);
    }
};