"use client";

import { useState } from "react";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.service";
import { validationSchema } from "@/types/validationSchemas/validationSchemas";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";

const defaultValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      if (res?.data?.token) {
        setMessage({ text: res.message, type: "success" });
        toast.success(res.message);
        storeUserInfo({ accessToken: res.data.token });
        // router.push("/dashboard");
      } else {
        setMessage({ text: res.message, type: "error" });
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
      console.error(err.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Card className="max-w-md w-full shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <div
              className={`text-center p-2 rounded mb-4 ${
                message.type === "error"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white mt-4"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
