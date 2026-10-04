import { Router } from "express";
import { successResponse } from "../Utils/Response/success.response.js";
import { login, signup } from "./auth.service.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
import { validationMiddleware } from "../common/middleware/validationMiddleware.js";

const router = Router();

router.post(
    "/signup",
    validationMiddleware(signupSchema),
    async (req, res) => {

        const result = await signup(req.body);

        return successResponse({
            res,
            status: 201,
            data: result
        });
    }
);


router.post(
    "/login",
    validationMiddleware(loginSchema),
    async (req, res) => {

        const result = await login(req.body);

        return successResponse({
            res,
            data: result
        });
    }
);


export default router;