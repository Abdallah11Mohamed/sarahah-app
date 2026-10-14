
import { BadException } from "../common/errors/bad.exception.js";

export const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const loggedInUserRole = req.authUser?.role;

        if (!allowedRoles.includes(loggedInUserRole)) {
            return next(
                new BadException(
                    "User is not authorized to access this resource",
                    403
                )
            );
        }

        return next();
    };
};
