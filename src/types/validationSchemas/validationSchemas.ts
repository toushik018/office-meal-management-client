import { z } from "zod";

export const validationSchema = z.object({
    email: z.string().email("Please enter your email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});


export const userValidationSchema = z
    .object({
        username: z.string().min(1, "Please enter your username!"),
        email: z.string().email("Please enter a valid email address!"),
        password: z.string().min(6, "Must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Must be at least 6 characters"),
        profilePhoto: z.string().url("Please enter a valid URL!").optional(),
        contactNumber: z
            .string()
            .regex(/^\d{11}$/, "Please enter a valid contact number"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
