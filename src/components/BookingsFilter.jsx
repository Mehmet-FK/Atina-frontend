import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import React, { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

const BookingsFilter = ({
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
  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: xxl ? "90%" : { lg: "1250px" },
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: open ? "12.5rem" : "3rem",
        transition: "all 0.3s",
        position: "sticky",
        top: "3rem",
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

          paddingInline: "2rem",
        }}
      >
        {/* //? == ROW 1 == */}
        <Grid
          container
          sx={{
            width: "95%",
            columnGap: "10px",
            rowGap: "5px",
            paddingLeft: "1rem",
          }}
        >
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
              value={filterVal.date || ""}
              variant="outlined"
              size="small"
              label="Datum"
              name="date"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.bookingType || ""}
              variant="outlined"
              size="small"
              label="Buchungstyp"
              name="bookingType"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.street || ""}
              variant="outlined"
              size="small"
              label="Straße"
              name="street"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.zip || ""}
              variant="outlined"
              size="small"
              label="PLZ "
              name="zip"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.city || ""}
              variant="outlined"
              size="small"
              label="Stadt "
              name="city"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              onChange={handleChange}
              value={filterVal.country || ""}
              variant="outlined"
              size="small"
              label="Land "
              name="country"
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            columnGap: "5px",
            justifyContent: "end",
            paddingInline: "3rem",
          }}
        >
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

export default BookingsFilter;
