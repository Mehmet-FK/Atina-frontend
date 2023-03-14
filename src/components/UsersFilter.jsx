import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import React, { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

const UsersFilter = ({
  filterVal,
  setFilterVal,
  handleFilter,
  handleReset,
}) => {
  const [open, setOpen] = useState(true);

  const handleChange = (e) => {
    setFilterVal({
      ...filterVal,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        width: "1250px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: open ? "10rem" : "3rem",
        transition: "all 0.3s",
        position: "sticky",
        top: "4.1rem",
        zIndex: "3",
        backgroundColor: "#fff",
        border: "1px solid #ddd5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          transition: "all 1s",
        }}
      >
        <IconButton onClick={() => setOpen(!open)}>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "900",
              paddingInline: "0.6rem",
              borderRadius: "50%",
            }}
          >
            {open ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          </Typography>
        </IconButton>
        <Typography
          fontSize={12}
          sx={{ display: open && "none", width: open ? "0px" : "auto" }}
        >
          Öffnen Sie hier den Suchfenster
        </Typography>
      </Box>
      <Box
        sx={{
          transition: "all 0.3s",
          display: open ? "flex" : "none",
          flexDirection: "column",
          rowGap: "15px",
        }}
      >
        {/* //? == ROW 1 == */}
        <Grid container sx={{ width: "95%", columnGap: "10px" }}>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.id || ""}
              variant="outlined"
              type={"number"}
              size="small"
              label="ID"
              name="id"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.firstname || ""}
              variant="outlined"
              size="small"
              label="Firstname"
              name="firstname"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.lastname || ""}
              variant="outlined"
              size="small"
              label="Lastname"
              name="lastname"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.username || ""}
              variant="outlined"
              size="small"
              label="Username"
              name="username"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.personnelNumber || ""}
              variant="outlined"
              size="small"
              label="Personnel Number"
              name="personnelNumber"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", columnGap: "5px" }}>
          <Button
            color={"error"}
            variant="contained"
            onClick={() => handleFilter()}
          >
            {" "}
            Suchen{" "}
          </Button>
          <Button
            color={"error"}
            variant="contained"
            onClick={() => handleReset()}
          >
            {" "}
            Löschen{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersFilter;
