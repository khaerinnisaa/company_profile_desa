import Navbar from "../../../components/navbar/Navbar";
import { Poppins } from "../../../components/typography/Poppins";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Container,
  Grid2,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RumahIbadah from "./RumahIbadahLogic";
import {
  StyledTableCellStatistika,
  StyledTableRowStatistika,
} from "../../../components/tabel/TabelStatistik";
import Footer from "../../../components/footer/Footer";
import "./style.css";
import { Title } from "../../../components/typography/Title";

export default function Page() {
  const { value, func } = RumahIbadah();
  return (
    <Box>
      <Navbar />
      <Toolbar />
      {/* Informasi Tempat Ibadah */}
      <Container maxWidth="lg">
        <Stack sx={{ mt: 2 }}>
          <Title>Informasi Tempat Ibadah</Title>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            {value.data &&
              value.data.map((res) => {
                return (
                  <Grid2 size={{ xs: 12, md: 4 }} key={res.id}>
                    <Card
                      sx={{
                        display: "flex",
                        py: 2,
                        px: 4,
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                        borderRadius: "10px",
                        gap: 2,
                      }}
                    >
                      <img
                        style={{ width: "80px", height: "80px" }}
                        src={res.icon}
                        alt={res.nama}
                      />
                      <Stack sx={{ margin: "auto 0" }}>
                        <Poppins sx={{ fontWeight: 500 }}>{res.nama}</Poppins>
                        <Poppins sx={{ color: "#0D4581", fontWeight: 600 }}>
                          {res.jumlah}
                        </Poppins>
                      </Stack>
                    </Card>
                  </Grid2>
                );
              })}
          </Grid2>
        </Stack>
        {/* accordion */}
        <Stack sx={{ mt: 4 }}>
          {Object.entries(value.dataList && value.dataList).map(
            ([key, places]) => (
              <Accordion
                key={key}
                expanded={!!value.expandedPanels[key]}
                onChange={func.handleChange(key)}
              >
                <AccordionSummary
                  expandIcon={
                    <ArrowDropDownIcon
                      sx={{
                        color: value.expandedPanels[key] ? "white" : "black",
                      }}
                    />
                  }
                  aria-controls={`${key}-content`}
                  id={`${key}-header`}
                  style={func.handleAccordionToggle(key)}
                >
                  <Poppins sx={{ fontWeight: 500 }}>{key}</Poppins>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer
                    component={Paper}
                    sx={{
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCellStatistika
                            sx={{ fontFamily: "Poppins" }}
                          >
                            Nama
                          </StyledTableCellStatistika>
                          <StyledTableCellStatistika
                            sx={{ fontFamily: "Poppins", textAlign: "end" }}
                          >
                            Lokasi
                          </StyledTableCellStatistika>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {places.map((place, index) => (
                          <StyledTableRowStatistika key={index}>
                            <StyledTableCellStatistika
                              component="th"
                              scope="row"
                            >
                              {place.nama}
                            </StyledTableCellStatistika>
                            <StyledTableCellStatistika
                              sx={{ textAlign: { xs: "unset", md: "end" } }}
                            >
                              {place.lokasi}
                            </StyledTableCellStatistika>
                          </StyledTableRowStatistika>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            )
          )}
        </Stack>
      </Container>
      {/* Footer */}
      <Footer />
    </Box>
  );
}
