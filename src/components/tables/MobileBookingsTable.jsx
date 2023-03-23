import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import useAtinaCalls from "../../hooks/useAtinaCalls";
import ColumnSelect from "../ColumnSelect";
// import BookingsFilter from "../BookingsFilter";
import { useMediaQuery } from "@mui/material";
import BookingsFilter from "../filters/BookingsFilter";
import CustomTableRow from "../BookingsTableRow";

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState();
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
    handleFilter();
  };
  // ===Table Filter END===

  // === Column Select START ===
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  // === Column Select END ===

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");

  useEffect(() => {
    getMobileBookingsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handlePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, mobileBookings]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <BookingsFilter
        handleReset={handleReset}
        handleFilter={handleFilter}
        filterVal={filterVal}
        setFilterVal={setFilterVal}
      />
      <TableContainer
        component={Paper}
        // elevation={0}
        sx={{
          maxWidth: xxl ? "90%" : { lg: "1250px" },
          margin: "auto",
          padding: "1rem 10px",
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
              return (
                <CustomTableRow
                  key={booking?.id}
                  tableStyle={tableStyle}
                  selectedColumns={selectedColumns}
                  booking={booking}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MobileBookingsTable;
