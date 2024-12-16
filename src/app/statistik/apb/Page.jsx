import Navbar from "../../../components/navbar/Navbar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid2,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import React from "react";

import "./style.css";
import { Poppins } from "../../../components/typography/Poppins";
import Footer from "../../../components/footer/Footer";
import { Title } from "../../../components/typography/Title";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  StyledTableCellStatistika,
  StyledTableRowStatistika,
} from "../../../components/tabel/TabelStatistik";
import BelanjaDesa from "../../../components/apb/belanja/BelanjaDesa";
import PembiayaanDesa from "../../../components/apb/pembiayaan/PembiayaanDesa";
import PendapatanDesa from "../../../components/apb/pendapatan_terbaru/PendapatanTerbaru";
import Pendapatan from "../../../components/apb/pendapatan/Pendapatan";
import ApbLogic from "./ApbLogic";
import { useAppContext } from "../../../contexts/AppContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function Page() {
  const { value, func } = ApbLogic();
  const { desa } = useAppContext();
  return (
    <HelmetProvider>
      {/* metadata */}
      <Helmet>
        <title>Apb | {desa}</title>
        <meta name="description" content="Informmasi Apb Desa Biringkanaya." />
        <meta name="keywords" content="apb desa biringkanaya" />
        {/* Open Graph Metadata */}
        <meta property="og:title" content="Informmasi Apb Desa Biringkanaya" />
        <meta
          property="og:description"
          content="Informmasi Apb Desa Biringkanaya."
        />
        <meta property="og:image" content="https://godesaku.id/logo.png" />
        <meta property="og:url" content="https://godesaku.id/statistik/apb" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <Toolbar />
      <Container maxWidth="lg">
        {/* informasi apb desa */}
        <Stack mt={2}>
          <Title>Informasi Apb Desa</Title>
          {/* dropdown tahun */}
          {value.tahun && (
            <Stack ref={value.dropdownRef} sx={{ width: "150px" }}>
              {/* Dropdown Button */}
              <Button
                onClick={func.onClickDropdown}
                sx={{
                  mt: 2,
                  backgroundColor: "#fff",
                  color: "#000",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "150px",
                  justifyContent: "start",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Poppins sx={{ display: "flex" }}>
                  {value.dropdown === true ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                  {value.selectedTahun || "Pilih Tahun"}
                </Poppins>
              </Button>

              {/* Dropdown Menu */}
              {value.dropdown && (
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    zIndex: 1,
                    marginTop: "65px",
                    borderRadius: "5px",
                    minWidth: "150px",
                  }}
                >
                  {value.tahun.map((res) => (
                    <Poppins
                      key={res.id}
                      onClick={() => func.handleTahun(res.year)}
                      sx={{
                        padding: "10px 15px",
                        cursor: "pointer",
                        color:
                          value.selectedTahun === res.year ? "#fff" : "#000",
                        backgroundColor:
                          value.selectedTahun === res.year ? "#0D4581" : "#fff",
                        "&:hover": {
                          backgroundColor: "#0D4581",
                          color: "#fff",
                        },
                      }}
                    >
                      {res.year}
                    </Poppins>
                  ))}
                </div>
              )}
            </Stack>
          )}

          <Grid2 container spacing={2} mt={4}>
            {value.informasi.map((res) => {
              return (
                <Grid2 size={{ xs: 12, md: 4 }} key={res.id}>
                  <Card
                    sx={{
                      display: "flex",
                      px: 3,
                      borderRadius: "10px",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                      gap: 3,
                    }}
                  >
                    <Stack>
                      <img
                        style={{ width: "80px", height: "80px" }}
                        src={res.icon}
                        alt={res.title}
                      />
                    </Stack>
                    <Stack sx={{ alignSelf: "center" }}>
                      <Poppins sx={{ fontSize: { xs: "16px", md: "16px" } }}>
                        {res.title}
                      </Poppins>
                      <Poppins
                        sx={{
                          fontSize: { xs: "16px", md: "16px" },
                          color: "#0D4581",
                          fontWeight: 500,
                        }}
                      >
                        Rp {res.total}
                      </Poppins>
                    </Stack>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        </Stack>
        {/* pendapatan desa 5 tahun terakhir */}
        <Stack mt={4}>
          <Title>{value.pendapatanBelanja.title}</Title>
          <Pendapatan />
        </Stack>
        {/* Pendapatan desa 2024 */}
        <Stack mt={4}>
          <Title>{value.pendapatan.title}</Title>
          {/* chart pendapatan */}
          <PendapatanDesa
            category={value.pendapatan.data.map((item) => item.name)}
            total={value.pendapatan.data.map((item) => item.total)}
          />
          {/* accordion / detail pendapatan */}
          {/* accordion */}
          <Stack sx={{ mt: 4 }}>
            {value.pendapatan.accordion.map((res) => {
              return (
                <Accordion
                  key={res.id}
                  expanded={!!value.expandedPanelsPendapatan[res.id]}
                  onChange={func.handleChange(res.id)}
                >
                  <AccordionSummary
                    expandIcon={
                      <ArrowDropDownIcon
                        sx={{
                          color: value.expandedPanelsPendapatan[res.id]
                            ? "white"
                            : "black",
                        }}
                      />
                    }
                    aria-controls="panel2-content"
                    id="panel2-header"
                    style={func.handleAccordionToggle(res.id)}
                  >
                    <Stack
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Poppins sx={{ fontWeight: 500 }}>{res.title}</Poppins>
                      <Poppins sx={{ fontWeight: 500 }}>{res.total}</Poppins>
                    </Stack>
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
                              sx={{
                                fontFamily: "Poppins",
                              }}
                            >
                              Rincian
                            </StyledTableCellStatistika>
                            <StyledTableCellStatistika
                              sx={{ fontFamily: "Poppins", textAlign: "end" }}
                            >
                              Jumlah
                            </StyledTableCellStatistika>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {res.rincian.map((rincianItem, idx) => (
                            <StyledTableRowStatistika key={idx}>
                              <StyledTableCellStatistika
                                component="th"
                                scope="row"
                              >
                                {rincianItem}
                              </StyledTableCellStatistika>
                              <StyledTableCellStatistika
                                sx={{ textAlign: { xs: "unset", md: "end" } }}
                              >
                                {res.jumlah[idx]}
                              </StyledTableCellStatistika>
                            </StyledTableRowStatistika>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Stack>
        </Stack>
        {/* belanja desa  */}
        <Stack mt={4}>
          <Title>{value.belanja.title}</Title>
          {/* chart belanja */}
          <BelanjaDesa
            category={value.belanja.chart.map((res) => res.name)}
            total={value.belanja.chart.map((res) => res.total)}
          />
          {/* accordion belanja desa */}
          <Stack sx={{ mt: 4 }}>
            {value.belanja.accordion.map((res) => {
              return (
                <Accordion
                  key={res.id}
                  expanded={!!value.expandedPanelsBelanja[res.id]}
                  onChange={func.handleChangeBelanja(res.id)}
                >
                  <AccordionSummary
                    expandIcon={
                      <ArrowDropDownIcon
                        sx={{
                          color: value.expandedPanelsBelanja[res.id]
                            ? "white"
                            : "black",
                        }}
                      />
                    }
                    aria-controls="panel2-content"
                    id="panel2-header"
                    style={func.handleAccordionToggleBelanja(res.id)}
                  >
                    <Stack
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Poppins sx={{ fontWeight: 500 }}>{res.title}</Poppins>
                      <Poppins sx={{ fontWeight: 500 }}>{res.total}</Poppins>
                    </Stack>
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
                              Rincian
                            </StyledTableCellStatistika>
                            <StyledTableCellStatistika
                              sx={{ fontFamily: "Poppins", textAlign: "end" }}
                            >
                              Jumlah
                            </StyledTableCellStatistika>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {res.rincian.map((rincianItem, idx) => (
                            <StyledTableRowStatistika key={idx}>
                              <StyledTableCellStatistika
                                component="th"
                                scope="row"
                              >
                                {rincianItem}
                              </StyledTableCellStatistika>
                              <StyledTableCellStatistika
                                sx={{ textAlign: { xs: "unset", md: "end" } }}
                              >
                                {res.jumlah[idx]}
                              </StyledTableCellStatistika>
                            </StyledTableRowStatistika>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Stack>
        </Stack>
        {/* Pembiayaan desa  */}
        <Stack mt={4}>
          <Title>{value.pembiayaan.title}</Title>
          {/* chart belanja */}
          <PembiayaanDesa
            category={value.pembiayaan.chart.map((res) => res.name)}
            data={value.pembiayaan.chart.map((res) => res.total)}
          />
          {/* accordion pembiayaan desa */}
          <Stack sx={{ mt: 4 }}>
            {value.pembiayaan.accordion.map((res) => {
              return (
                <Accordion
                  key={res.id}
                  expanded={!!value.expandedPanelsPembiayaan[res.id]}
                  onChange={func.handleChangePembiayaan(res.id)}
                >
                  <AccordionSummary
                    expandIcon={
                      <ArrowDropDownIcon
                        sx={{
                          color: value.expandedPanelsPembiayaan[res.id]
                            ? "white"
                            : "black",
                        }}
                      />
                    }
                    aria-controls="panel2-content"
                    id="panel2-header"
                    style={func.handleAccordionTogglePembiayaan(res.id)}
                  >
                    <Stack
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Poppins sx={{ fontWeight: 500 }}>{res.title}</Poppins>
                      <Poppins sx={{ fontWeight: 500 }}>{res.total}</Poppins>
                    </Stack>
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
                              Rincian
                            </StyledTableCellStatistika>
                            <StyledTableCellStatistika
                              sx={{ fontFamily: "Poppins", textAlign: "end" }}
                            >
                              Jumlah
                            </StyledTableCellStatistika>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {res.rincian.map((rincianItem, idx) => (
                            <StyledTableRowStatistika key={idx}>
                              <StyledTableCellStatistika
                                component="th"
                                scope="row"
                              >
                                {rincianItem}
                              </StyledTableCellStatistika>
                              <StyledTableCellStatistika
                                sx={{ textAlign: { xs: "unset", md: "end" } }}
                              >
                                {res.jumlah[idx]}
                              </StyledTableCellStatistika>
                            </StyledTableRowStatistika>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Stack>
        </Stack>
      </Container>
      {/* footer */}
      <Footer />
    </HelmetProvider>
  );
}
