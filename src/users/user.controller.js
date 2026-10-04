import { Router } from "express";
import * as authService from "./auth.service.js";

const authController = Router();

authController.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const result = await authService.signUp({
        firstName,
        lastName,
        email,
        password
    });

    res
        .status(201)
        .json({
            message: "User registered successfully",
            user: result
        });
});

export default authController;