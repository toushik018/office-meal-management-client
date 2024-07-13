"use client";

import React from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";
import FInput from "@/components/Forms/FInput";
import FForm from "@/components/Forms/FForms";
import { useForgotPasswordMutation } from "@/redux/api/authApi";

const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
});

const defaultValues = {
  email: "",
};

const ForgetPassword = () => {
  const [forgetPassword] = useForgotPasswordMutation();

  const handleSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Sending reset password link...");
    try {
      await forgetPassword({ email: values.email }).unwrap();
      toast.success("Password reset email sent!", { id: toastId });
    } catch (err: any) {
      toast.error("Failed to send password reset email.");
      console.error(err);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Forgot Password
              </Typography>
            </Box>
          </Stack>

          <Box>
            <FForm
              onSubmit={handleSubmit}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid item xs={12}>
                  <FInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Send Reset Link
              </Button>
            </FForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default ForgetPassword;
