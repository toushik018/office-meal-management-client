"use client";

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetFlatRequestQuery } from "@/redux/api/requestFlatApi";

const MyRequest = () => {
  const { data, isLoading, error } = useGetFlatRequestQuery("");


  if (isLoading) {
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
  }

  if (error) {
    return (
      <Box>
        <Typography color="error">Failed to load requests</Typography>
      </Box>
    );
  }

  const columns: GridColDef[] = [
    { field: "location", headerName: "Location", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "rentAmount", headerName: "Rent Amount", flex: 1 },
    { field: "bedrooms", headerName: "Bedrooms", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  // Transform data to match the columns
  const rows =
    data?.data.map((request: any) => ({
      id: request.id,
      location: request.flat.location,
      description: request.flat.description,
      rentAmount: request.flat.rentAmount,
      bedrooms: request.flat.bedrooms,
      status: request.status,
    })) || [];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Requests
      </Typography>
      <Box
        sx={{
          height: 600,
          mt: 2,
          mx: 2,
          "& .MuiDataGrid-root": { backgroundColor: "background.paper" },
        }}
      >
        <DataGrid rows={rows} columns={columns} hideFooter />
      </Box>
    </Box>
  );
};

export default MyRequest;
