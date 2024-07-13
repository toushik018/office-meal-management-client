// src/app/reset-pass/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import FInput from "@/components/Forms/FInput";
import FForm from "@/components/Forms/FForms";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { ApiResponse, ResetPasswordResponse } from "@/types/response/response";

interface SearchParams {
  userId: string | null;
  token: string | null;
}

const validationSchema = z
  .object({
    password: z.string().min(6, "Must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const defaultValues = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams({
      userId: params.get("userId"),
      token: params.get("token"),
    });
  }, []);

  const handleSubmit = async (values: FieldValues) => {
    if (!searchParams) return;

    try {
      const res: ApiResponse<ResetPasswordResponse> = await resetPassword({
        id: searchParams.userId as string,
        password: values.password,
        token: searchParams.token as string,
      }).unwrap();
      if (res.success === true) {
        toast.success(res.message);
      }
      router.push("/login");
    } catch (err: any) {
      toast.error("Failed to reset password");
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
                Reset Password
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
                    name="password"
                    label="New Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
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
                Reset Password
              </Button>
            </FForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default ResetPassword;
