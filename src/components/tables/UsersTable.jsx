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
import useAtinaCalls from "../../hooks/useAtinaCalls";
import ColumnSelect from "../ColumnSelect";

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
      transition: "0.3s all",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(2.5)",
        zIndex: "4",
      },
    },
  },
};

const tableColumns = [
  "firstname",
  "lastname",
  "username",
  "password",
  "personnelnumber",
  "image",
];

const UsersTable = () => {
  const { atinaUsers } = useSelector((state) => state.atina);

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState([]);
  const handlePagination = () => {
    let currentPage = rowsPerPage * page;
    const newArray = atinaUsers?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  };
  // ===pagination states END===

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});
  const handleFilter = () => {
    const flag = Object.values(filterVal).some((x) => x !== "");
    const filteredData = atinaUsers.filter((item) =>
      flag
        ? item.id === parseInt(filterVal.id) ||
          (item?.firstname?.toLowerCase() ===
            filterVal?.firstname?.toLowerCase() &&
            filterVal.firstname !== "") ||
          (item?.lastname?.toLowerCase() ===
            filterVal?.lastname?.toLowerCase() &&
            filterVal.lastname !== "") ||
          (item?.username?.toLowerCase() ===
            filterVal?.username?.toLowerCase() &&
            filterVal.username !== "") ||
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

  // === Column Select START ===
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  // === Column Select END ===

  const { getUsersData } = useAtinaCalls();
  useEffect(() => {
    getUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handlePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, atinaUsers]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: "2rem" }}>
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
          <ColumnSelect
            tableColumns={tableColumns}
            selectedColumns={selectedColumns}
            setSelectedColumns={setSelectedColumns}
          />
          <Pagination
            data={atinaUsers}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableStyle.th.cell} align="left">
                ID
              </TableCell>
              {selectedColumns.map((item, i) => (
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
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
