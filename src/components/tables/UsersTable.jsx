import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

import { Avatar } from "@mui/material";
import UsersFilter from "../UsersFilter";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import useUsersCalls from "../../hooks/useUsersCalls";

const tableStyle = {
  th: {
    cell: {
      textTransform: "capitalize",
      fontWeight: "600",
      paddingInline: "5px",
    },
  },
  tr: {
    cell: {
      fontSize: "0.8em",
      padding: "5px",
    },
    image: {
      transition: "0.5s all",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(2.5)",
        zIndex: "4",
      },
    },
  },
};

const tableColumns = [
  "id",
  "firstname",
  "lastname",
  "username",
  "password",
  "personnelnumber",
  "image",
];

const UsersTable = () => {
  const { AtinaUsers } = useSelector((state) => state.atina);

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(AtinaUsers?.length);
  const [shownData, setShownData] = useState([]);
  const handlePagination = () => {
    let currentPage = rowsPerPage * page;
    const newArray = AtinaUsers?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  };
  // ===pagination states END===

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});
  const handleFilter = () => {
    const flag = Object.values(filterVal).some((x) => x != "");
    const filteredData = AtinaUsers.filter((item) =>
      flag
        ? item.id === parseInt(filterVal.id) ||
          (item?.firstname?.toLowerCase() ===
            filterVal?.firstname?.toLowerCase() &&
            filterVal.firstname != "") ||
          (item?.lastname?.toLowerCase() ===
            filterVal?.lastname?.toLowerCase() &&
            filterVal.lastname != "") ||
          (item?.username?.toLowerCase() ===
            filterVal?.username?.toLowerCase() &&
            filterVal.username != "") ||
          item?.personnelnumber?.toLowerCase() ===
            filterVal?.personnelNumber?.toLowerCase()
        : true
    );
    setShownData(filteredData);
  };

  const handleReset = () => {
    setFilterVal({});
    handlePagination();
  };

  // ===Table Filter END===
  const { getUsersData } = useUsersCalls();
  useEffect(() => {
    getUsersData();
  }, []);

  useEffect(() => {
    handlePagination();
  }, [page, rowsPerPage, AtinaUsers]);

  return (
    <>
      <UsersFilter
        handleReset={handleReset}
        handleFilter={handleFilter}
        filterVal={filterVal}
        setFilterVal={setFilterVal}
      />
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "1250px",
          margin: "auto",
          paddingInline: "10px",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Pagination
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            handlePagination={handlePagination}
          />
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableColumns.map((item, i) => (
                <TableCell sx={tableStyle.th.cell} key={i} align="left">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {shownData?.map((user) => {
              return (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#ddd" },
                  }}
                >
                  <TableCell
                    sx={{ ...tableStyle.tr.cell, paddingLeft: "10px" }}
                    component="th"
                    scope="row"
                  >
                    {user?.id}
                  </TableCell>
                  <TableCell sx={tableStyle.tr.cell} align="left" scope="row">
                    {user?.firstname}
                  </TableCell>
                  <TableCell sx={tableStyle.tr.cell} align="left">
                    {user?.lastname}
                  </TableCell>
                  <TableCell sx={tableStyle.tr.cell} align="left">
                    {user?.username}
                  </TableCell>
                  <TableCell sx={tableStyle.tr.cell} align="left">
                    ********
                  </TableCell>
                  <TableCell sx={tableStyle.tr.cell} align="left">
                    {user?.personnelnumber}
                  </TableCell>
                  <TableCell sx={tableStyle.tr.cell} align="left">
                    <Avatar
                      sx={tableStyle.tr.image}
                      src={`data:image/png;base64,${user?.image}`}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
