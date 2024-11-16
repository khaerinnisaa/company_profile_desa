import * as React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Opacity } from "@mui/icons-material";

export const StyledTableCellStatistika = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0D45810D",
    // color: ,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: 500,
  },
}));

export const StyledTableRowStatistika = styled(TableRow)(({ theme }) => ({
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
