import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Card,
  Container,
  Grid2,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import React from "react";
import Icon from "../../assets/icon_header_potensi.png";
import { Poppins } from "../../components/typography/Poppins";
import PotensiLogic from "./PotensiLogic";
import { StyledTableCell, StyledTableRow } from "../../components/tabel/Tabel";
import Footer from "../../components/footer/Footer";
import { Title } from "../../components/typography/Title";
import { themePagination } from "../../components/pagination/Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAppContext } from "../../contexts/AppContext";

export default function Page() {
  const { value, func } = PotensiLogic();
  const { desa } = useAppContext();
  return (
    <HelmetProvider>
      {/* metadata */}
      <Helmet>
        <title>Potensi | {desa}</title>
        <meta name="description" content="Potensi Desa biringkanaya Menggambarkan berbagai aspek penting dari sebuah desa, seperti jumlah penduduk, luas wilayah, tingkat pendidikan, sektor ekonomi utama, serta infrastruktur yang tersedia." />
        <meta name="keywords" content="potensi desa biringkanaya" />
        {/* Open Graph Metadata */}
        <meta property="og:title" content="Potensi Desa Biringkanaya" />
        <meta property="og:description" content="Menggambarkan berbagai aspek penting dari sebuah desa, seperti jumlah penduduk, luas wilayah, tingkat pendidikan, sektor ekonomi utama, serta infrastruktur yang tersedia." />
        <meta property="og:image" content="https://godesaku.id/logo.png" />
        <meta property="og:url" content="https://godesaku.id/potensi" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <Toolbar />
      {/* potensi desa */}
      <Header
        mt={4}
        title={"Potensi Desa"}
        description={
          "Menggambarkan berbagai aspek penting dari sebuah desa, seperti jumlah penduduk, luas wilayah, tingkat pendidikan, sektor ekonomi utama, serta infrastruktur yang tersedia. Statistik ini memberikan gambaran menyeluruh tentang kondisi demografis, sosial, dan ekonomi desa, yang berguna untuk perencanaan pembangunan dan pengambilan keputusan."
        }
        icon={Icon}
        imageWidth={"80%"}
      />
      {/* wisata desa */}
      <Stack sx={{ py: 6, mt: 2 }}>
        <Container maxWidth="lg">
          <Title>Wisata Desa</Title>
          <Grid2 container spacing={2} mt={2}>
            {value.data &&
              value.data.map((res) => {
                return (
                  <Grid2
                    key={res.slug}
                    size={{ xs: 12, md: 6 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      sx={{
                        borderRadius: "10px",
                        width: {
                          xs: "90%",
                          md: "100%",
                        },
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                        cursor: "pointer",
                      }}
                      onClick={() => func.handleDetails(res.slug)}
                    >
                      {res.assets[0].type === "image" ? (
                        <img
                          style={{
                            width: "100%",
                            height: "250px",
                            borderRadius: "10px 10px 0px 0px",
                            objectFit: "cover",
                          }}
                          src={res.assets[0].url}
                          alt={res.title}
                        />
                      ) : (
                        <video
                          style={{
                            width: "100%",
                            height: "250px",
                            borderRadius: "10px 10px 0px 0px",
                            objectFit: "cover",
                          }}
                          controls
                          preload="none"
                          poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-GwBWO82SDhf6q-IDxzTm06rATH45qELJyw&s"
                        >
                          <source src={res.assets[0].url} type="video/mp4" />
                          {/* <track
                            src="/path/to/captions.vtt"
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                          /> */}
                          Your browser does not support the video tag.
                        </video>
                      )}

                      <Poppins
                        sx={{
                          width: "90%",
                          fontSize: "16px",
                          fontWeight: 700,
                          margin: "auto",
                          py: 2,
                        }}
                      >
                        {res.title}
                      </Poppins>
                      <Poppins sx={{ width: "90%", margin: "auto", pb: 2 }}>
                        {func.limitText(res.content, 170)}
                      </Poppins>
                    </Card>
                  </Grid2>
                );
              })}
          </Grid2>
          {/* pagination */}
          <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
            <ThemeProvider theme={themePagination}>
              <Pagination
                sx={{}}
                count={value.totalPage}
                page={value.page}
                onChange={func.handleChangePage}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                  />
                )}
              />
            </ThemeProvider>
          </Stack>
        </Container>
      </Stack>
      {/* pertanian desa */}
      <Stack sx={{ mt: 2 }}>
        <Container maxWidth="lg">
          <Title>Pertanian Desa</Title>
          <Grid2 container spacing={2} columns={24} mt={2}>
            <Grid2 container size={{ xs: 24, md: 16 }}>
              {value.dataPertanian &&
                value.dataPertanian.map((res) => {
                  return (
                    <Grid2 size={{ xs: 24, md: 8 }} key={res.id}>
                      <Card
                        sx={{
                          width: { xs: "100%", md: "100%" },
                          display: "flex",
                          px: 2,
                          borderRadius: "10px",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                          gap: 2,
                          height: "96px",
                        }}
                      >
                        <Stack>
                          <img
                            style={{
                              width: "50px",
                              alignSelf: "center",
                              margin: "auto",
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
                            <span
                              style={{
                                color: "black",
                                fontWeight: 400,
                                // marginLeft: "5px",
                              }}
                            >
                              {res.keterangan}
                            </span>
                          </Poppins>
                        </Stack>
                      </Card>
                    </Grid2>
                  );
                })}
            </Grid2>
            {/* jenis pertanian */}

            <Grid2 size={{ xs: 24, md: 8 }}>
              <TableContainer
                component={Paper}
                sx={{
                  maxHeight: 320,
                  overflow: "auto",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell sx={{ fontFamily: "Poppins" }}>
                        Jenis Pertanian
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontFamily: "Poppins" }}>
                        Jumlah
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {value.pertanian.length !== 0 ? (
                      value.pertanian &&
                      value.pertanian.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row">
                            {row.nama}
                          </StyledTableCell>
                          <StyledTableCell>{row.jumlah}</StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                          -
                        </StyledTableCell>
                        <StyledTableCell>-</StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid2>
          </Grid2>
        </Container>
      </Stack>
      {/* Sarana dan prasarana */}
      <Stack sx={{ mt: 6 }}>
        <Container maxWidth="lg">
          <Title>Sarana dan Prasarana</Title>
          <TableContainer
            component={Paper}
            sx={{
              mt: 2,
              maxHeight: 427,
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
                {value.sarana.length !== 0 ? (
                  value.sarana &&
                  value.sarana.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.nama}
                      </StyledTableCell>
                      <StyledTableCell>{row.jumlah}</StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      -
                    </StyledTableCell>
                    <StyledTableCell>-</StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Stack>
      {/* footer */}
      <Footer />
    </HelmetProvider>
  );
}
