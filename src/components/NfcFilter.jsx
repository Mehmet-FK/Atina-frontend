import { IconButton, Typography } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/system";
import React, { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

const NfcFilter = () =>
  //   {
  //        filterVal,
  //        setFilterVal,
  //        handleFilter,
  //        handleReset,
  //   }
  {
    const [open, setOpen] = useState(false);

    //   const handleChange = (e) => {
    //     setFilterVal({
    //       ...filterVal,
    //       [e.target.name]: e.target.value,
    //     });
    //   };

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
        {open && (
          <Typography variant="h2">Filterpanel Noch Nicht Bereit</Typography>
        )}
      </Box>
    );
  };

export default NfcFilter;
