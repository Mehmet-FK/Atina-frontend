import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/attensam-logo.svg";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#ddd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "25rem",
          backgroundColor: "#e10000",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
        }}
      >
        <img src={logo} alt="logo" />
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
          sx={{ backgroundColor: "#fff" }}
        />
        <TextField
          label="password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
          sx={{ backgroundColor: "#fff" }}
        />
        <Button
          onClick={() => navigate("atina")}
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
