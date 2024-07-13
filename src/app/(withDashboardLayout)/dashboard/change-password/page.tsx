"use client";

import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";

import { logoutUser } from "@/services/actions/logoutUser";

const validationSchema = z
  .object({
    oldPassword: z.string().min(6, "Must be at least 6 characters long"),
    newPassword: z.string().min(6, "Must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await changePassword(values).unwrap();

      if (res?.statusCode === 200) {
        toast.success(
          "Password Changed Successfully, Login now with your new password"
        );
        logoutUser(router);
      }
    } catch (error) {
      toast.error("Incorrect Old Password");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Card className="max-w-md w-full shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Change Your Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium"
              >
                Old Password
              </label>
              <Input
                id="oldPassword"
                {...register("oldPassword")}
                type="password"
                placeholder="Old Password"
                className="mt-1 block w-full"
              />
              {errors.oldPassword && (
                <span className="text-red-600 text-sm">
                  {errors.oldPassword.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium"
              >
                New Password
              </label>
              <Input
                id="newPassword"
                {...register("newPassword")}
                type="password"
                placeholder="New Password"
                className="mt-1 block w-full"
              />
              {errors.newPassword && (
                <span className="text-red-600 text-sm">
                  {errors.newPassword.message}
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
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
