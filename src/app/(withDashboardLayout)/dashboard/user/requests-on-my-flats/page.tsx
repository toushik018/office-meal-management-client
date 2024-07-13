"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Avatar,
  Card,
  CardContent,
  Divider,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  useGetRequestsOnMyFlatsQuery,
  useUpdateRequestStatusMutation,
} from "@/redux/api/requestFlatApi";
import { styled } from "@mui/system";
import { IFlat, IRequest } from "@/types/flat/flat";
import { toast } from "sonner";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  "&:last-child": {
    marginBottom: 0,
  },
}));

const getStatusColor = (status: any) => {
  switch (status) {
    case "PENDING":
      return "orange";
    case "APPROVED":
      return "green";
    case "REJECTED":
      return "red";
    default:
      return "black";
  }
};

const FlatsWithRequests = () => {
  const { data, error, isLoading } = useGetRequestsOnMyFlatsQuery("");
  const [updateRequestStatus] = useUpdateRequestStatusMutation();
  const [statusMap, setStatusMap] = useState<{ [key: string]: string }>({});

  const handleStatusChange = async (requestId: any, newStatus: any) => {
    setStatusMap((prev) => ({ ...prev, [requestId]: newStatus }));
    try {
      await updateRequestStatus({ requestId, status: newStatus }).unwrap();
      toast.success(`Updated request status  to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update request status:", error);
    }
  };

  if (isLoading)
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

  if (error) return <Alert severity="error">Error loading data</Alert>;

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Flats and Requests
      </Typography>
      {data?.data.length ? (
        data.data.map((flat: IFlat) => (
          <StyledCard key={flat.id}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {flat.location}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {flat.description}
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" gutterBottom>
                Requests
              </Typography>
              {flat.requests.length ? (
                flat.requests.map((request: any) => (
                  <StyledPaper key={request.id}>
                    <Avatar
                      alt={request.user.username}
                      src={request.user.profilePhoto}
                      sx={{ width: 70, height: 70, mr: 2 }}
                    />
                    <Box flex={1}>
                      <Typography variant="h6" component="h2">
                        {request.user.username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Contact: {request.user.contactNumber}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Move-In Date: {request.moveInDate}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Length of Stay: {request.lengthOfStay}
                      </Typography>
                      <FormControl fullWidth sx={{ mt: 4, width: "250px" }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={statusMap[request.id] || request.status}
                          label="Status"
                          onChange={(e) =>
                            handleStatusChange(request.id, e.target.value)
                          }
                          sx={{
                            color: getStatusColor(
                              statusMap[request.id] || request.status
                            ),
                          }}
                        >
                          <MenuItem
                            value="PENDING"
                            sx={{ color: getStatusColor("PENDING") }}
                          >
                            Pending
                          </MenuItem>
                          <MenuItem
                            value="APPROVED"
                            sx={{ color: getStatusColor("APPROVED") }}
                          >
                            Approved
                          </MenuItem>
                          <MenuItem
                            value="REJECTED"
                            sx={{ color: getStatusColor("REJECTED") }}
                          >
                            Rejected
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </StyledPaper>
                ))
              ) : (
                <Typography variant="body1">
                  No requests for this flat.
                </Typography>
              )}
            </CardContent>
          </StyledCard>
        ))
      ) : (
        <Typography variant="body1">No flats posted.</Typography>
      )}
    </Container>
  );
};

export default FlatsWithRequests;
