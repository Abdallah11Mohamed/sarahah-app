import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID");

export const userIdParamsSchema = z.object({
    userId: objectIdSchema
});

export const listUsersQuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(10),
    page: z.coerce.number().int().min(1).default(1)
});

export const updateUserSchema = z.object({
    username: z.string().trim().min(3).max(30).optional(),
    email: z.string().trim().email().toLowerCase().optional(),
    phone: z.string().trim().regex(/^01[0125][0-9]{8}$/).optional()
}).refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update"
});
