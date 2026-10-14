import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().trim().email("Please enter a valid email").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters").max(100)
});

export const signupSchema = z.object({
    username: z.string().trim().min(3, "Username must be at least 3 characters").max(30, "Username must be at most 30 characters"),
    email: z.string().trim().email("Please enter a valid email").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters").max(100),
    phone: z.string().trim().regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number")
});
