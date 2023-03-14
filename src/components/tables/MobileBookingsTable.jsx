import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import useAtinaCalls from "../../hooks/useAtinaCalls";
import ColumnSelect from "../ColumnSelect";
import BookingsFilter from "../BookingsFilter";
import useSortColumn from "../../hooks/useSortColumn";

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
      padding: "10px",
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
  "datum",
  "zeitpunkt",
  "buchungstyp",
  "straße",
  "straßennummer",
  "plz",
  "stadt",
  "land",
];

const MobileBookingsTable = () => {
  const { mobileBookings } = useSelector((state) => state.atina);
  const { getMobileBookingsData } = useAtinaCalls();

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(mobileBookings?.length);
  const [shownData, setShownData] = useState(mobileBookings);
  const handlePagination = () => {
    let currentPage = rowsPerPage * page;
    const newArray = mobileBookings?.slice(
      currentPage,
      currentPage + rowsPerPage
    );
    return setShownData(newArray);
  };
  // ===pagination states END===

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});
  console.log(filterVal);
  const handleFilter = () => {
    const flag = Object.values(filterVal).some((x) => x !== "");
    const filteredData = mobileBookings?.filter((item) =>
      flag
        ? item.id === parseInt(filterVal.id) ||
          (item?.date?.toLowerCase() === filterVal?.date?.toLowerCase() &&
            filterVal.date !== "") ||
          (item?.bookingType?.toLowerCase() ===
            filterVal?.bookingType?.toLowerCase() &&
            filterVal.bookingType !== "") ||
          (item?.street?.toLowerCase() === filterVal?.street?.toLowerCase() &&
            filterVal.street !== "") ||
          (item?.zip?.toLowerCase() === filterVal?.zip?.toLowerCase() &&
            filterVal.zip !== "") ||
          (item?.city?.toLowerCase() === filterVal?.city?.toLowerCase() &&
            filterVal.city !== "") ||
          (item?.country?.toLowerCase() === filterVal?.country?.toLowerCase() &&
            filterVal.country !== "")
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

  useEffect(() => {
    getMobileBookingsData();
  }, []);

  useEffect(() => {
    handlePagination();
  }, [page, rowsPerPage, mobileBookings]);

  return (
    <>
      <BookingsFilter
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
            data={mobileBookings}
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
            {shownData?.map((booking) => {
              let date = new Date(booking?.date);
              let time = booking?.time;
              time = time.slice(0, time?.indexOf("."));

              return (
                <TableRow
                  key={booking.id}
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
                    {booking?.id}
                  </TableCell>
                  {selectedColumns.includes("datum") && (
                    <TableCell sx={tableStyle.tr.cell} align="left" scope="row">
                      {date.toLocaleDateString("de-DE")}
                    </TableCell>
                  )}
                  {selectedColumns.includes("zeitpunkt") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {/* {booking?.time} */}
                      {time}
                    </TableCell>
                  )}
                  {selectedColumns.includes("buchungstyp") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {booking?.bookingType}
                    </TableCell>
                  )}
                  {selectedColumns.includes("straße") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {booking?.street}
                    </TableCell>
                  )}
                  {selectedColumns.includes("straßennummer") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {booking?.streetnumber}
                    </TableCell>
                  )}
                  {selectedColumns.includes("plz") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {booking?.zip}
                    </TableCell>
                  )}
                  {selectedColumns.includes("stadt") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {booking?.city}
                    </TableCell>
                  )}
                  {selectedColumns.includes("land") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {booking?.country}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MobileBookingsTable;
