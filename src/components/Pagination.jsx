import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import { useSelector } from "react-redux";

const Pagination = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  handlePagination,
}) => {
  const { AtinaUsers } = useSelector((state) => state.atina);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      showFirstButton={true}
      showLastButton={true}
      component="div"
      count={AtinaUsers.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
