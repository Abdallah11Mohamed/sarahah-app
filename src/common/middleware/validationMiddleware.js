import { BadException } from "../errors/bad.exception.js";

export const validationMiddleware = (schema) => {
    return (req, res, next) => {

        const validationResult = schema.safeParse(req.body);

        if (!validationResult.success) {
            throw new BadException(
                "Validation Error",
                validationResult.error.issues
            );
        }

        req.body = validationResult.data;

        next();
    };
};