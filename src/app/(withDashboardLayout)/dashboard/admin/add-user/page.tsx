"use client";

import { useState } from "react";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/actions/registerUser";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.service";
import { userValidationSchema } from "@/types/validationSchemas/validationSchemas";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterUserPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userValidationSchema),
    defaultValues,
  });

  const handleRegister = async (values: FieldValues) => {
    try {
      const { confirmPassword, ...rest } = values;
      const res = await registerUser(rest);
      if (res?.data?.id) {
        toast.success("User registered successfully!");
        const result = await userLogin({
          email: values.email,
          password: values.password,
        });
        if (result?.data?.token) {
          storeUserInfo({ accessToken: result?.data?.token });
          router.push("/dashboard");
        }
      } else {
        const errorMessage = res.message || "Registration failed!";
        if (res.message && res.message.includes("Unique constraint failed")) {
          const match = res.message.match(
            /Unique constraint failed on the fields: \(([^)]+)\)/
          );
          if (match && match[1]) {
            toast.error(
              `Registration failed! The ${match[1]} is already in use.`
            );
          } else {
            toast.error(errorMessage);
          }
        } else {
          toast.error(errorMessage);
        }
        console.log("Error:", res);
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error("Exception:", err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Card className="max-w-md w-full shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Create A User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                {...register("name")}
                type="text"
                placeholder="name"
                className="mt-1 block w-full"
              />
              {errors.name && (
                <span className="text-red-600 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Email"
                className="mt-1 block w-full"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                {...register("password")}
                type="password"
                placeholder="Password"
                className="mt-1 block w-full"
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Password"
                className="mt-1 block w-full"
              />
              {errors.confirmPassword && (
                <span className="text-red-600 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white mt-4"
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterUserPage;
