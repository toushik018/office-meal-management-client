"use client";

import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { useState } from "react";
import { storeUserInfo } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import FInput from "@/components/Forms/FInput";
import FForm from "@/components/Forms/FForms";
// import { useRouter } from "next/navigation";
import { validationSchema } from "@/types/validationSchemas/validationSchemas";

const LoginPage = () => {
  // const router = useRouter();
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      if (res?.data?.token) {
        setMessage({ text: res.message, type: "success" });
        toast.success(res.message);
        storeUserInfo({ accessToken: res.data.token });
        // router.push("/dashboard");
      } else {
        setMessage({ text: res.message, type: "error" });
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
      console.error(err.message);
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
                Flat Share Platform
              </Typography>
            </Box>
          </Stack>

          {message && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: message.type === "error" ? "red" : "green",
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: "2px 4px",
                  borderRadius: "2px",
                  color: "white",
                  marginTop: "5px",
                }}
              >
                {message.text}
              </Typography>
            </Box>
          )}

          <Box>
            <FForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
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
                <Grid item xs={12}>
                  <FInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>

              <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
                <Link href="/forget-password">Forgot Password?</Link>
              </Typography>

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Link href="/register">Create an account</Link>
              </Typography>
            </FForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
