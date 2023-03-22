import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/slices/settingsSlice";

const Settings = () => {
  const { darkMode } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleSwitch = () => {
    dispatch(setTheme("dark"));
    // if (darkMode === "light"){

    // }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>Einstellungen</h1>
      <Button onClick={() => handleSwitch()}>Change Theme</Button>
    </div>
  );
};

export default Settings;
