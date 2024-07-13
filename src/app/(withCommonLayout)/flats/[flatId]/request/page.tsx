"use client";
// app/(withCommonLayout)/flats/[flatId]/page.tsx
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Avatar,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useGetSingleFlatQuery } from "@/redux/api/flatApi";
import { useSubmitFlatRequestMutation } from "@/redux/api/requestFlatApi";
import FForm from "@/components/Forms/FForms";
import FInput from "@/components/Forms/FInput";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { getUserInfo } from "@/services/auth.service";
import { useGetMyProfileQuery } from "@/redux/api/userApi";

const FlatRequestPage = () => {
  const router = useRouter();
  const params = useParams();
  const { flatId } = params;

  const {
    data: flat,
    error,
    isLoading,
  } = useGetSingleFlatQuery(flatId as string);

  const [submitFlatRequest, { isLoading: isSubmitting }] =
    useSubmitFlatRequestMutation();
  const { data: profileData, isLoading: profileLoading } =
    useGetMyProfileQuery("");
  const userInfo = getUserInfo();
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async (values: FieldValues) => {
    if (!agreeToTerms) {
      toast.error(
        "You must agree to the terms and conditions before submitting."
      );
      return;
    }
    try {
      const res = await submitFlatRequest({
        flatId,
        moveInDate: values.moveInDate,
        lengthOfStay: values.lengthOfStay,
      }).unwrap();
      toast.success("Flat share request submitted successfully!");
      router.push(`/dashboard/${userInfo.role}/my-requests`);
    } catch (error) {
      console.error("Failed to submit flat share request:", error);
      toast.error("Failed to submit flat share request.");
    }
  };

  if (isLoading || profileLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error) return <Alert severity="error">Error loading flat details</Alert>;

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {flat?.data.location}
      </Typography>
      <Card
        sx={{
          mt: 4,

          mx: "auto",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={flat?.data.photos[0]}
          alt="Flat image"
          sx={{
            objectFit: "cover",
            height: { xs: 200, md: 300 },
          }}
        />
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {flat?.data.description}
          </Typography>
          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
            Rent: ${flat?.data.rentAmount}
          </Typography>
          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
            Bedrooms: {flat?.data.bedrooms}
          </Typography>
          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
            Amenities
          </Typography>
          <Typography variant="body1">{flat?.data.amenities}</Typography>
        </CardContent>
      </Card>

      {profileData ? (
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Box display="flex" alignItems="center">
            <Avatar
              alt={profileData.data.username}
              src={profileData.data.profilePhoto}
              sx={{ mr: 2 }}
            />
            <Box>
              <Typography variant="h6" component="h2">
                {profileData.data.username}
              </Typography>
              <Typography variant="body1">
                Contact: {profileData.data.contactNumber}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Request to Share
            </Typography>
            <FForm
              onSubmit={handleSubmit}
              defaultValues={{ moveInDate: "", lengthOfStay: "" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FInput
                    name="moveInDate"
                    label="Move-In Date"
                    type="date"
                    required
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FInput
                    name="lengthOfStay"
                    label="Length of Stay"
                    required
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        name="agreeToTerms"
                        color="primary"
                      />
                    }
                    label="I agree to the terms and conditions"
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 4 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </FForm>
          </Box>
        </Paper>
      ) : (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={() => router.push(`/login`)}
        >
          Login to Request
        </Button>
      )}
    </Container>
  );
};

export default FlatRequestPage;
