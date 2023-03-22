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
import NfcFilter from "../filters/NfcFilter";

import { useMediaQuery } from "@mui/material";

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
  "artikeltyp",
  "artikelnummer",
  "straße",
  "straßennummer",
  "plz",
  "stadt",
  "land",
  "data1",
  "data2",
  "data3",
  "data4",
  "data5",
  "data6",
  "data7",
  "data8",
  "data9",
  "data10",
];

const NfcTable = () => {
  const { nfcTags } = useSelector((state) => state.atina);
  const { getNfcTagsData } = useAtinaCalls();

  // ===pagination states START===
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [shownData, setShownData] = useState(nfcTags);
  const handlePagination = () => {
    let currentPage = rowsPerPage * page;
    const newArray = nfcTags?.slice(currentPage, currentPage + rowsPerPage);
    return setShownData(newArray);
  };
  // ===pagination states END===

  // ===Table Filter START===
  const [filterVal, setFilterVal] = useState({});

  const handleFilter = () => {
    // const flag = Object.values(filterVal).some((x) => x !== "");
    // const filteredData = mobileBookings?.filter((item) =>
    //   flag
    //     ? item.id === parseInt(filterVal.id) ||
    //       (item?.date?.toLowerCase() === filterVal?.date?.toLowerCase() &&
    //         filterVal.date !== "") ||
    //       (item?.bookingType?.toLowerCase() ===
    //         filterVal?.bookingType?.toLowerCase() &&
    //         filterVal.bookingType !== "") ||
    //       (item?.street?.toLowerCase() === filterVal?.street?.toLowerCase() &&
    //         filterVal.street !== "") ||
    //       (item?.zip?.toLowerCase() === filterVal?.zip?.toLowerCase() &&
    //         filterVal.zip !== "") ||
    //       (item?.city?.toLowerCase() === filterVal?.city?.toLowerCase() &&
    //         filterVal.city !== "") ||
    //       (item?.country?.toLowerCase() === filterVal?.country?.toLowerCase() &&
    //         filterVal.country !== "")
    //     : true
    // );
    // setShownData(filteredData);
  };

  const handleReset = () => {
    setFilterVal({});
    handlePagination();
  };
  // ===Table Filter END===

  // === Column Select START ===
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  // === Column Select END ===

  //==== MediaQuery ===
  const xxl = useMediaQuery("(min-width:1400px)");

  useEffect(() => {
    getNfcTagsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handlePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, nfcTags]);

  return (
    <>
      <NfcFilter
        handleReset={handleReset}
        handleFilter={handleFilter}
        filterVal={filterVal}
        setFilterVal={setFilterVal}
      />
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: xxl ? "90%" : { lg: "1250px" },
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
            data={nfcTags}
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
            {shownData?.map((tag) => {
              const { item } = tag;

              return (
                <TableRow
                  key={item.id}
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
                    {item?.id}
                  </TableCell>
                  {selectedColumns.includes("artikeltyp") && (
                    <TableCell sx={tableStyle.tr.cell} align="left" scope="row">
                      {item?.itemType}
                    </TableCell>
                  )}
                  {selectedColumns.includes("artikelnummer") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.itemNumber}
                    </TableCell>
                  )}

                  {selectedColumns.includes("straße") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.street}
                    </TableCell>
                  )}
                  {selectedColumns.includes("straßennummer") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.streetnumber}
                    </TableCell>
                  )}
                  {selectedColumns.includes("plz") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.zip}
                    </TableCell>
                  )}
                  {selectedColumns.includes("stadt") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.city}
                    </TableCell>
                  )}
                  {selectedColumns.includes("land") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.country}
                    </TableCell>
                  )}

                  {selectedColumns.includes("data1") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.data1 ? item?.data1 : "X"}
                    </TableCell>
                  )}

                  {selectedColumns.includes("data2") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.data2 ? item?.data2 : "X"}
                    </TableCell>
                  )}

                  {selectedColumns.includes("data3") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.data3 ? item?.data3 : "X"}
                    </TableCell>
                  )}

                  {selectedColumns.includes("data4") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.data4 ? item?.data4 : "X"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("data5") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.data5 ? item?.data5 : "X"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("data6") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.data6 ? item?.data6 : "X"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("data7") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.data7 ? item?.data7 : "X"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("data8") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.data8 ? item?.data8 : "X"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("data9") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.data9 ? item?.data9 : "X"}
                    </TableCell>
                  )}
                  {selectedColumns.includes("data10") && (
                    <TableCell sx={tableStyle.tr.cell} align="left">
                      {item?.data10 ? item?.data10 : "X"}
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

export default NfcTable;
