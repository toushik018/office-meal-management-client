"use client";

import { useGetMyProfileQuery } from "@/redux/api/userApi";
import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Avatar,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import UpdateFormModal from "./components/updateFormMadal";

const ProfileContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  maxWidth: 900,
  margin: "auto",
  backgroundColor: theme.palette.background.default,
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const ProfileDetails = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingLeft: theme.spacing(3),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
}));

const ProfileBackground = styled(Box)(({ theme }) => ({
  position: "relative",
  height: 250,
  backgroundColor: theme.palette.primary.main,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

const ProfileBackgroundImage = styled(CardMedia)(({ theme }) => ({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius,
  filter: "brightness(0.6)",
}));

const ProfileContent = styled(CardContent)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
}));

const Profile = () => {
  const { data, isLoading } = useGetMyProfileQuery("");
  console.log(data);
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ProfileContainer>
      <ProfileBackground>
        <ProfileBackgroundImage image="https://picsum.photos/600/300" />
        <ProfileContent>
          <Typography variant="h3" component="div" gutterBottom>
            {data?.data.username}
          </Typography>
          <Typography variant="h6" component="div">
            {data?.data.role}
          </Typography>
        </ProfileContent>
      </ProfileBackground>
      <ProfileCard>
        <ProfileAvatar
          src={data?.data.profilePhoto}
          alt={data?.data.username}
        />
        <ProfileDetails>
          <Typography variant="h5" component="div" gutterBottom>
            {data?.data.username}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {data?.data.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {data?.data.contactNumber}
          </Typography>
          <IconButton onClick={handleOpen} aria-label="edit">
            <EditIcon />
          </IconButton>
        </ProfileDetails>
      </ProfileCard>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Additional Information
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong> {data?.data.isActive}
          </Typography>
          <Typography variant="body1">
            <strong>Joined:</strong>{" "}
            {new Date(data?.data.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            <strong>Last Updated:</strong>{" "}
            {new Date(data?.data.updatedAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
      <UpdateFormModal
        open={open}
        handleClose={handleClose}
        userData={data?.data}
      />
    </ProfileContainer>
  );
};

export default Profile;
