import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          name="email"
          id="email"
          type="email"
          variant="outlined"
        />
        <TextField
          label="password"
          name="password"
          id="password"
          type="password"
          variant="outlined"
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
