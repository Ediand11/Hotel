"use client";

import { loginUser } from "@/src/api/auth/login";
import { validatorPassword, validatorUsername } from "@/src/helper/validators";
import { useUserStore } from "@/src/store/user";
import { IUser } from "@/src/types";
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./Login.module.scss";

const Login = () => {
  const setUser = useUserStore((state) => state.setName);
  const router = useRouter();

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    response: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const passwordUser = formData.get("password") as string;

    const isUsernameValid = validatorUsername(username, (usernameError) =>
      setErrors((prev) => ({ ...prev, username: usernameError }))
    );
    const isPasswordValid = validatorPassword(passwordUser, (passwordError) =>
      setErrors((prev) => ({ ...prev, password: passwordError }))
    );

    if (!isUsernameValid || !isPasswordValid) {
      return;
    }

    setErrors({
      username: "",
      password: "",
      response: "",
    });

    const response = await loginUser({ username, passwordUser });
    if (!response.error && response.username) {
      const user: IUser = {
        username: response.username,
        email: response.email,
      };
      setUser(user);
      router.push("/main");
    } else if (response.error) {
      setErrors((prev) => ({ ...prev, response: "User not found" }));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={style.root}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              color={"secondary"}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={!!errors.username || !!errors.response}
              helperText={errors.username || errors.response}
            />
            <TextField
              color={"secondary"}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href={"/signup"}>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
    </Container>
  );
};

export default Login;
