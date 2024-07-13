"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/actions/registerUser";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.service";
import FInput from "@/components/Forms/FInput";
import FForm from "@/components/Forms/FForms";
import { userValidationSchema } from "@/types/validationSchemas/validationSchemas";

const defaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  profilePhoto: "",
  contactNumber: "",
};

const RegisterUserPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    try {
      const { confirmPassword, ...rest } = values;
      const res = await registerUser(rest);
      if (res?.data?.id) {
        toast.success("User registered successfully!");
        const result = await userLogin({
          email: values.email,
          password: values.password,
        });
        if (result?.data?.token) {
          storeUserInfo({ accessToken: result?.data?.token });
          router.push("/dashboard");
        }
      } else {
        const errorMessage = res.message || "Registration failed!";
        // Check for unique constraint error message
        if (res.message && res.message.includes("Unique constraint failed")) {
          const match = res.message.match(
            /Unique constraint failed on the fields: \(([^)]+)\)/
          );
          if (match && match[1]) {
            toast.error(
              `Registration failed! The ${match[1]} is already in use.`
            );
          } else {
            toast.error(errorMessage);
          }
        } else {
          toast.error(errorMessage);
        }
        console.log("Error:", res);
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error("Exception:", err.message);
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
                User Registration
              </Typography>
            </Box>
          </Stack>

          <Box>
            <FForm
              onSubmit={handleRegister}
              resolver={zodResolver(userValidationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid item xs={12}>
                  <FInput name="username" label="Username" fullWidth={true} />
                </Grid>
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
                <Grid item xs={12}>
                  <FInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FInput
                    name="profilePhoto"
                    label="Profile Photo URL"
                    type="url"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FInput
                    name="contactNumber"
                    label="Contact Number"
                    type="tel"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{ margin: "10px 0px" }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Already have an account? <Link href="/login">Login</Link>
              </Typography>
            </FForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterUserPage;
