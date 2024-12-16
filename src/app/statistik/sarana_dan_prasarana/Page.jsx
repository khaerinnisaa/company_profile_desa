import Navbar from "../../../components/navbar/Navbar";
import { Poppins } from "../../../components/typography/Poppins";
import {
  Box,
  Card,
  Container,
  Grid2,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/tabel/Tabel";
import React from "react";
import Footer from "../../../components/footer/Footer";
import { Title } from "../../../components/typography/Title";
import SaranaLogic from "./SaranaLogic";
import { useAppContext } from "../../../contexts/AppContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Page() {
  const { value } = SaranaLogic();
  const { desa } = useAppContext();
  return (
    <HelmetProvider>
      {/* metadata */}
      <Helmet>
        <title>Sarana dan Prasarana | {desa}</title>
        <meta
          name="description"
          content="Informasi Sarana dan Prasana Desa Biringkanaya"
        />
        <meta
          name="keywords"
          content="sarana dan prasarana desa biringkanaya"
        />
        {/* Open Graph Metadata */}
        <meta
          property="og:title"
          content="Sarana dan Prasarana Desa Biringkanaya"
        />
        <meta
          property="og:description"
          content="Informasi Sarana dan Prasana Desa Biringkanaya"
        />
        <meta property="og:image" content="https://godesaku.id/logo.png" />
        <meta
          property="og:url"
          content="https://godesaku.id/statistik/sarana_dan_prasarana"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <Toolbar />
      <Container maxWidth="lg">
        {/* informasi sarana dan prasarana */}
        <Stack sx={{ mt: 2 }}>
          <Title>Informasi Sarana dan Prasarana</Title>
          <Grid2 container spacing={2} columns={24} sx={{ mt: 4 }}>
            <Grid2 container size={{ xs: 24, md: 15 }}>
              {value.data &&
                value.data.map((res) => {
                  return (
                    <Grid2 size={{ xs: 24, md: 12 }} key={res.id}>
                      <Card
                        sx={{
                          width: { xs: "100%", md: "100%" },
                          display: "flex",
                          px: 2,
                          borderRadius: "10px",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                          gap: 4,
                          height: "96px",
                        }}
                      >
                        <Stack>
                          <img
                            style={{
                              width: "78px",
                              // height: "78px",
                              alignSelf: "center",
                              margin: "auto",
                              // objectFit: "cover",
                            }}
                            src={res.icon}
                            alt={res.nama}
                          />
                        </Stack>
                        <Stack sx={{ alignSelf: "center" }}>
                          <Poppins
                            sx={{ fontSize: { xs: "16px", md: "16px" } }}
                          >
                            {res.nama}
                          </Poppins>
                          <Poppins
                            sx={{
                              fontSize: { xs: "16px", md: "16px" },
                              color: "#0D4581",
                              fontWeight: 500,
                            }}
                          >
                            {res.jumlah}{" "}
                          </Poppins>
                        </Stack>
                      </Card>
                    </Grid2>
                  );
                })}
            </Grid2>
            {/* sarana dan prasarana list  */}
            <Grid2 size={{ xs: 24, md: 9 }}>
              {value.dataList && (
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: 430,
                    overflow: "auto",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell sx={{ fontFamily: "Poppins" }}>
                          Sarana dan Prasarana
                        </StyledTableCell>
                        <StyledTableCell sx={{ fontFamily: "Poppins" }}>
                          Jumlah
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {value.dataList.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row">
                            {row.nama}
                          </StyledTableCell>
                          <StyledTableCell>{row.jumlah}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid2>
          </Grid2>
        </Stack>
      </Container>
      {/* footer */}
      <Footer />
    </HelmetProvider>
  );
}
