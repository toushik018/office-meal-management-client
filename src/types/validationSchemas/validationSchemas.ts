import { z } from "zod";

export const validationSchema = z.object({
    email: z.string().email("Please enter your email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});


export const userValidationSchema = z
    .object({
        name: z.string().min(1, "Please enter your name!"),
        email: z.string().email("Please enter a valid email address!"),
        password: z.string().min(6, "Must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
