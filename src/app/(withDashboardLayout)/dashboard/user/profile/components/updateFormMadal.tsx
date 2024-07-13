"use client";

import React from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useUpdateProfileMutation } from "@/redux/api/userApi";
import { toast } from "sonner";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UpdateFormModal = ({ open, handleClose, userData }: any) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      username: userData?.username,
      email: userData?.email,
      contactNumber: userData?.contactNumber,
      profilePhoto: userData?.profilePhoto,
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={2}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="contactNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="profilePhoto"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Profile Photo, paste the link"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateFormModal;
