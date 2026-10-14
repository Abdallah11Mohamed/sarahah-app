import { BadException } from "../errors/bad.exception.js";

// target can be "body", "params", or "query".
export const validationMiddleware = (schema, target = "body") => {
    return (req, res, next) => {
        const validationResult = schema.safeParse(req[target]);

        if (!validationResult.success) {
            return next(new BadException(
                "Validation Error",
                400,
                validationResult.error.issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message
                }))
            ));
        }

        // Use parsed data for body/query. Express 5 params are treated read-only.
        if (target === "body") req.body = validationResult.data;
        if (target === "query") {
            Object.defineProperty(req, "validatedQuery", {
                configurable: true,
                value: validationResult.data
            });
        }
        if (target === "params") {
            Object.defineProperty(req, "validatedParams", {
                configurable: true,
                value: validationResult.data
            });
        }

        next();
    };
};
