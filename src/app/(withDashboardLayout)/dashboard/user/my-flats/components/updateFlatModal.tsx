"use client";

import React from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useUpdateFlatMutation } from "@/redux/api/flatApi";
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

const UpdateFlatModal = ({ open, handleClose, flatData }: any) => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      location: flatData?.location,
      description: flatData?.description,
      rentAmount: flatData?.rentAmount,
      bedrooms: flatData?.bedrooms,
      amenities: flatData?.amenities,
      photos: flatData?.photos.join(", "),
    },
  });
  const [updateFlat, { isLoading }] = useUpdateFlatMutation();

  const onSubmit = async (data: any) => {
    const updatedData = {
      ...data,
      rentAmount: Number(data.rentAmount),
      bedrooms: Number(data.bedrooms),
      photos: data.photos.split(",").map((photo: any) => photo.trim()),
    };
    try {
      const res = await updateFlat({
        id: flatData.id,
        data: updatedData,
      }).unwrap();

      if (res?.data.id) {
        toast.success("Flat updated successfully!");
      }
      handleClose();
    } catch (error) {
      toast.error("Failed to update flat.");
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
          Update Flat
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={2}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Location"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="rentAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Rent Amount"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="bedrooms"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Bedrooms"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="amenities"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Amenities"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="photos"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Photos (comma-separated)"
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

export default UpdateFlatModal;
