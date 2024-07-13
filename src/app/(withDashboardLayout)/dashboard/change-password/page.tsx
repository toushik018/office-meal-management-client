"use client";

import FForm from "@/components/Forms/FForms";
import FInput from "@/components/Forms/FInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import KeyIcon from "@mui/icons-material/Key";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { logoutUser } from "@/services/actions/logoutUser";
import Link from "next/link";

const validationSchema = z
  .object({
    oldPassword: z.string().min(6, "Must be at least 6 characters long"),
    newPassword: z.string().min(6, "Must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await changePassword(values).unwrap();

      if (res?.statusCode === 200) {
        toast.success(
          "Password Changed Successfully, Login now with your new password"
        );
        logoutUser(router);
      }
    } catch (error) {
      toast.error("Incorrect Old Password");
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 4,
        maxWidth: 600,
        width: "100%",
        borderRadius: 1,
        mx: "auto",
        mt: {
          xs: 2,
          md: 5,
        },
        backgroundColor: "white",
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: -1.5 }}>
          Change Your Password
        </Typography>
      </Stack>
      <FForm
        onSubmit={onSubmit}
        defaultValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FInput
              name="oldPassword"
              type="password"
              label="Old Password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FInput
              name="newPassword"
              type="password"
              label="New Password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FInput
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
          <Link href="/forget-password">Forgot Password?</Link>
        </Typography>
        <Button type="submit" sx={{ width: "100%", my: 2 }}>
          Change Password
        </Button>
      </FForm>
    </Box>
  );
};

export default ChangePassword;
