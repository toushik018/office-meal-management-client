"use client";
// app/(withCommonLayout)/flats/[flatId]/page.tsx
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";
import { useGetSingleFlatQuery } from "@/redux/api/flatApi";

const FlatDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const { flatId } = params;

  const {
    data: flat,
    error,
    isLoading,
  } = useGetSingleFlatQuery(flatId as string);

  if (isLoading) return <div>Loading...</div>;


  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {flat?.data.location}
      </Typography>
      <Grid container spacing={4}>
        {flat?.data.photos.map((photo: string, index: number) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Image
              src={photo}
              alt={`Photo ${index + 1}`}
              width={500}
              height={500}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" component="h2" sx={{ mt: 4 }}>
        Description
      </Typography>
      <Typography variant="body1">{flat?.data.description}</Typography>
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
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => router.push(`/flats/${flatId}/request`)}
      >
        Request to Share
      </Button>
    </Container>
  );
};

export default FlatDetailsPage;
