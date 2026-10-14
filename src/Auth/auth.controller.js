import { Router } from "express";
import { successResponse } from "../common/Utils/Response/success.response.js";
import { login, signup, refreshToken } from "./auth.service.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
import { validationMiddleware } from "../common/middleware/validationMiddleware.js";

const router = Router();

router.post("/signup", validationMiddleware(signupSchema), async (req, res, next) => {
    try {
        const result = await signup(req.body);
        return successResponse({
            res,
            status: 201,
            message: "User registered successfully",
            data: result
        });
    } catch (error) {
        return next(error);
    }
});

router.post("/login", validationMiddleware(loginSchema), async (req, res, next) => {
    try {
        const result = await login(req.body);
        return successResponse({
            res,
            message: "Login successful",
            data: result
        });
    } catch (error) {
        return next(error);
    }
});





router.post("/refresh-token", async (req, res, next) => {
    try {
        const { refreshtoken } = req.headers;

        if (!refreshtoken) {
            throw new Error("Refresh token is required");
        }

        const result = await refreshToken(refreshtoken);

        return res.status(200).json({
            message: "Token refreshed successfully",
            data: result
        });
    } catch (error) {
        return next(error);
    }
});








export default router;
