
export const notFoundHandler = (req, res, next) => {
    return res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
};

export const globalErrorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    let statusCode = error.statusCode || error.status || 500;
    let message = error.message || "Internal server error";
    let details = error.details;

    // JWT errors: invalid, expired, or not active token
    if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError" ||
        error.name === "NotBeforeError"
    ) {
        statusCode = 401;
        message = "Invalid or expired token";
        details = [];
    }

    // Database validation errors
    else if (error.name === "ValidationError") {
        statusCode = 400;
        message = "Database validation failed";
        details = Object.values(error.errors).map(
            (item) => item.message
        );
    }

    // Duplicate fields, such as an existing email
    else if (error.code === 11000) {
        statusCode = 409;
        message = "Email already exists";
    }

    // Invalid MongoDB ObjectId
    else if (error.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }

    // Log server errors only
    if (statusCode >= 500) {
        console.error(error);
        message = "Internal server error";
    }

    return res.status(statusCode).json({
        success: false,
        message,
        ...(details ? { details } : {})
    });
};
