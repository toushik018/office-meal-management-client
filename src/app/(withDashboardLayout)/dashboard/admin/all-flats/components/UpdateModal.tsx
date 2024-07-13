import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IFlat } from "@/types/flat/flat";

interface UpdateModalProps {
  open: boolean;
  handleClose: () => void;
  flat: IFlat;
  onUpdate: (data: Partial<IFlat>) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  open,
  handleClose,
  flat,
  onUpdate,
}) => {
  const { control, handleSubmit, reset } = useForm<Partial<IFlat>>({
    defaultValues: flat,
  });

  useEffect(() => {
    reset(flat);
  }, [flat, reset]);

  const onSubmit = (data: Partial<IFlat>) => {
    onUpdate(data);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Update Flat
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Location" variant="outlined" />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Description" variant="outlined" />
            )}
          />
          <Controller
            name="rentAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Rent Amount"
                type="number"
                variant="outlined"
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
                type="number"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="amenities"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Amenities" variant="outlined" />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateModal;
