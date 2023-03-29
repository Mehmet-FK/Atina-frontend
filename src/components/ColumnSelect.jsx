import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { IconButton, Tooltip } from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ColumnSelect = ({
  tableColumns,
  selectedColumns,
  setSelectedColumns,
}) => {
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;

    setSelectedColumns(typeof value === "string" ? value.split(",") : value);
  };

  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: "flex", width: "60%" }}>
      <Tooltip title={open ? "Spalten verstecken" : "Spalten zeigen"}>
        <IconButton onClick={() => setOpen(!open)}>
          <ViewColumnIcon fontSize={"large"} />
        </IconButton>
      </Tooltip>

      {open && (
        <div
          style={{
            width: "100%",
            opacity: open ? 1 : 0,
          }}
        >
          <FormControl
            sx={{
              m: 1,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <InputLabel id="checkbox-label">Angezeigte Spalten</InputLabel>
            <Select
              labelId="checkbox-label"
              id="checkbox"
              multiple
              value={selectedColumns}
              onChange={handleChange}
              input={<OutlinedInput label="Angezeigte Spalten" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              size="small"
            >
              {tableColumns.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedColumns.indexOf(name) > -1} />
                  <ListItemText
                    sx={{ textTransform: "capitalize" }}
                    primary={name}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
};
export default ColumnSelect;
