import * as React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0D4581",
    color: theme.palette.common.white,
    fontFamily: "Poppins",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  border: "1px solid #dee2e6", // Adjust the border color and width
  padding: theme.spacing(1),
  // backgroundColor: theme.palette.common.white, // Ensure background remains white when sticky
  position: "sticky",
  top: 0,
  zIndex: 2, // Set z-index to ensure it stays above the subsequent header row
  //   backgroundColor: "#0D4581",
}));

export const GroupHeaderTableCell = styled(StyledTableCell)(({ theme }) => ({
  top: 0, // Maintain the top position
  zIndex: 3, // Higher z-index for group headers to stay on top
  backgroundColor: "#0D4581",
}));

export const SubHeaderTableCell = styled(StyledTableCell)(({ theme }) => ({
  top: 40, // Position relative to group header height
  zIndex: 2,
  backgroundColor: "#0D4581",
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    // backgroundColor: "#0D4581",
    // opacity: "20%",
    backgroundColor: "#0D45810D",
    // backgroundColor: "rgba(13, 69, 129, 0.2)",
  },
  "&:nth-of-type(odd)": {
    // backgroundColor: "#0D4581",
    // opacity: "20%",
    backgroundColor: "#0D458109",
  },
  // Hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
