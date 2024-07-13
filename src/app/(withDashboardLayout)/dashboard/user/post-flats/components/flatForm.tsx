"use client";

import React from "react";
import { Container, Box, Button, Grid, Typography } from "@mui/material";
import FInput from "@/components/Forms/FInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues } from "react-hook-form";
import FForm from "@/components/Forms/FForms";
import { useCreateFlatMutation } from "@/redux/api/flatApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Updated validation schema to coerce string inputs to numbers
const flatValidationSchema = z.object({
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  rentAmount: z.coerce
    .number()
    .positive("Rent amount must be a positive number"),
  bedrooms: z.coerce
    .number()
    .int()
    .positive("Number of bedrooms must be a positive integer"),
  amenities: z.string().min(1, "Amenities are required"),
  photos: z.string().min(1, "Photos are required"),
});

const defaultValues = {
  location: "",
  description: "",
  rentAmount: "",
  bedrooms: "",
  amenities: "",
  photos: "",
};

const FlatForm = () => {
  const [createFlat, { isLoading }] = useCreateFlatMutation();
  const router = useRouter();

  const handleSubmit = async (values: FieldValues) => {
    try {
      // Split the photos string into an array
      values.photos = values.photos
        .split(",")
        .map((photo: string) => photo.trim());

      const response = await createFlat(values).unwrap();
      if (response.statusCode === 200) {
        toast.success(response.message);
        router.push("/dashboard/user/my-flats");
      }
      // Reset form if necessary
    } catch (error) {
      console.error("Failed to add flat", error);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4, backgroundColor: "white", py: 4, px: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Flat Share Post Information
        </Typography>
        <FForm
          onSubmit={handleSubmit}
          resolver={zodResolver(flatValidationSchema)}
          defaultValues={defaultValues}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FInput name="location" label="Location" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FInput name="description" label="Description" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FInput
                name="rentAmount"
                label="Rent Amount"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FInput
                name="bedrooms"
                label="Number of Bedrooms"
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FInput name="amenities" label="Amenities" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FInput
                name="photos"
                label="Photos (comma-separated URLs)"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Share Post"}
              </Button>
            </Grid>
          </Grid>
        </FForm>
      </Box>
    </Container>
  );
};

export default FlatForm;
