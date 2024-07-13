"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { Label } from "@/components/UI/label";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/button";

const UpdateFormModal = ({ open, handleClose, userData }: any) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
    },
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onSubmit = async (data: any) => {
    try {
      const res = await updateProfile(data).unwrap();

      toast.success("Profile updated successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Update error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="name" className="col-span-3" />
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    className="col-span-3"
                    disabled
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFormModal;
