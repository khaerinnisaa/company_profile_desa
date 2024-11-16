import Navbar from "../../../components/navbar/Navbar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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
import ApbLogic from "./apbLogic";
import "./style.css";
import { Poppins } from "../../../components/typography/Poppins";
import {
  belanjaApb,
  informasiApb,
  pembiayaanApb,
  pendapatanApb,
} from "../../../values/Constant";
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

export default function Page() {
  const { value, func } = ApbLogic();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <Box>
      <Navbar />
      <Toolbar />
      <Container maxWidth="lg">
        {/* informasi apb desa */}
        <Stack mt={2}>
          <Title>Informasi Apb Desa</Title>
          <FormControl sx={{}}>
            {value.menu && (
              <Stack>
                <Select
                  sx={{
                    height: 40,
                    width: { xs: "100px", md: "265px" },
                    fontFamily: "Poppins",
                    borderRadius: "5px",
                    mt: 2,
                    fontWeight: 500,
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                    color: "#0D4581",
                  }}
                  // onChange={func.handleCategory}
                  displayEmpty
                  // value={value.selectedKabinet}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected === undefined) {
                      return <em>2024</em>;
                    }
                    return selected;
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {value.menu.map((res) => {

                    return (
                      <MenuItem
                        key={res.id}
                        sx={{
                          fontFamily: "Poppins",
                          backgroundColor: "#fff",
                          "&:hover": {
                            backgroundColor: "#0D4581",
                            color: '#fff'
                          },
                        }}
                        value={res.value}
                      >
                        {res.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Stack>
            )}
          </FormControl>
          <Grid2 container spacing={2} mt={4}>
            {informasiApb.map((res) => {
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
                        src={res.image}
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
        {/* pendapatan desa 2020-2024 */}
        <Stack mt={4}>
          <Title>Pendapatan dan belanja desa 2020-2024</Title>
          <Pendapatan />
        </Stack>
        {/* Pendapatan desa 2024 */}
        <Stack mt={4}>
          <Title>Pendapatan desa 2024</Title>
          {/* chart pendapatan */}
          <PendapatanDesa />
          {/* accordion / detail pendapatan */}
          {/* accordion */}
          <Stack sx={{ mt: 4 }}>
            {pendapatanApb.map((res) => {
              return (
                <Accordion
                  key={res.id}
                  expanded={!!value.expandedPanels[res.id]}
                  onChange={func.handleChange(res.id)}
                >
                  <AccordionSummary
                    expandIcon={
                      <ArrowDropDownIcon
                        sx={{
                          color: value.expandedPanels[res.id]
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
          <Title>Belanja desa 2024</Title>
          {/* chart belanja */}
          <BelanjaDesa />
          {/* accordion belanja desa */}
          <Stack sx={{ mt: 4 }}>
            {belanjaApb.map((res) => {
              return (
                <Accordion
                  key={res.id}
                  expanded={!!value.expandedPanels[res.id]}
                  onChange={func.handleChange(res.id)}
                >
                  <AccordionSummary
                    expandIcon={
                      <ArrowDropDownIcon
                        sx={{
                          color: value.expandedPanels[res.id]
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
          <Title>Pembiayaan desa 2024</Title>
          {/* chart belanja */}
          <PembiayaanDesa />
          {/* accordion pembiayaan desa */}
          <Stack sx={{ mt: 4 }}>
            {pembiayaanApb.map((res) => {
              return (
                <Accordion
                  key={res.id}
                  expanded={!!value.expandedPanels[res.id]}
                  onChange={func.handleChange(res.id)}
                >
                  <AccordionSummary
                    expandIcon={
                      <ArrowDropDownIcon
                        sx={{
                          color: value.expandedPanels[res.id]
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
    </Box>
  );
}
