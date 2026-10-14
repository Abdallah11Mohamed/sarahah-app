
import { Router } from "express";
import * as userService from "./user.service.js";
import { authenticate } from "../middleware/authentication.middleware.js";
import { authorize } from "../middleware/Authorization.middleware.js";
import { roleEnum } from "../common/constants.js";

const userController = Router();

// Health check route
userController.get("/health", (req, res) => {
    res.status(200).json({
        message: "User service is healthy"
    });
});

// Get profile
// Roles: user, admin
userController.get(
    "/profile",
    authenticate,
    authorize([roleEnum.USER, roleEnum.ADMIN]),
    (req, res) => {
        res.status(200).json({
            message: "User profile retrieved successfully",
            data: req.authUser
        });
    }
);

// List all users
// Roles: admin only
userController.get(
    "/",
    authenticate,
    authorize([roleEnum.ADMIN]),
    async (req, res, next) => {
        try {
            const result = await userService.getAllUsers();

            res.status(200).json({
                message: "Users retrieved successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
);

// Update user profile
// Roles: user, admin

 // Update user profile
userController.patch(
    "/update/:userId",
    authenticate,
    authorize([roleEnum.USER, roleEnum.ADMIN]),
    async (req, res, next) => {
        try {
            const { userId } = req.params;
            const loggedInUser = req.authUser;

            // Users can update only their own profiles.
            // Admins can update any user's profile.
            if (
                loggedInUser.role === roleEnum.USER &&
                loggedInUser._id.toString() !== userId
            ) {
                return next(
                    new BadException(
                        "You can only update your own profile",
                        403
                    )
                );
            }

            const {
                firstName,
                lastName,
                email,
                gender,
                age
            } = req.body;

            const updates = Object.fromEntries(
                Object.entries({
                    firstName,
                    lastName,
                    email,
                    gender,
                    age
                }).filter(([, value]) => value !== undefined)
            );

            const result = await userService.updateProfile(
                updates,
                userId
            );

            return res.status(200).json({
                message: "User profile updated successfully",
                data: result
            });
        } catch (error) {
            return next(error);
        }
    }
);


// Delete user profile
// Roles: admin only
userController.delete(
    "/delete/:userId",
    authenticate,
    authorize([roleEnum.ADMIN]),
    async (req, res, next) => {
        try {
            const { userId } = req.params;

            const result = await userService.deleteProfile(userId);

            res.status(200).json({
                message: "User profile deleted successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
);

export default userController;
