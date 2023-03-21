import { Avatar, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import UserModal from "./UserModal";

const CustomTableRow = ({ user, selectedColumns, tableStyle }) => {
  const [openUserModal, setOpenUserModal] = useState(false);
  const handleDblClick = (e) => {
    if (e.detail === 2) {
      setOpenUserModal(true);
    }
  };
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "&:hover": { backgroundColor: "#ddd" },
        cursor: "pointer",
      }}
      onClick={handleDblClick}
    >
      <TableCell
        sx={{ ...tableStyle.tr.cell, paddingLeft: "10px" }}
        component="th"
        scope="row"
      >
        <UserModal
          setOpenUserModal={setOpenUserModal}
          openUserModal={openUserModal}
          user={user}
        />
        {user?.id}
      </TableCell>
      {selectedColumns.includes("firstname") && (
        <TableCell sx={tableStyle.tr.cell} align="left" scope="row">
          {user?.firstname}
        </TableCell>
      )}
      {selectedColumns.includes("lastname") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {user?.lastname}
        </TableCell>
      )}
      {selectedColumns.includes("username") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {user?.username}
        </TableCell>
      )}
      {selectedColumns.includes("password") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          ********
        </TableCell>
      )}
      {selectedColumns.includes("personnelnumber") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          {user?.personnelnumber}
        </TableCell>
      )}
      {selectedColumns.includes("image") && (
        <TableCell sx={tableStyle.tr.cell} align="left">
          <Avatar
            sx={tableStyle.tr.image}
            src={`data:image/png;base64,${user?.image}`}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default CustomTableRow;
