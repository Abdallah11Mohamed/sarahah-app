import { z } from "zod";

const loginSchema = z.object({
    email: z.string()
        .email("Please enter a valid email"),

    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(15, "Password must be at most 15 characters")
});

export const signupSchema = loginSchema.extend({

    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters"),

    phone: z.string()
        .regex(
            /^01[0125][0-9]{8}$/,
            "Please enter a valid Egyptian phone number"
        )
});

export { loginSchema };