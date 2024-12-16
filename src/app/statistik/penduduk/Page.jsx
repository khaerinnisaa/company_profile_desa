import Header from "../../../components/header/Header";
import Navbar from "../../../components/navbar/Navbar";
import {
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
import React from "react";
import Icon from "../../../assets/icon_header_penduduk.png";
import { Poppins } from "../../../components/typography/Poppins";
import { Title } from "../../../components/typography/Title";
import Footer from "../../../components/footer/Footer";
import JumlahPenduduk from "../../../components/penduduk/jumlah_penduduk/JumlahPenduduk";
import Kematian from "../../../components/penduduk/kematian/Kematian";
import JenisKelamin from "../../../components/penduduk/jenis_kelamin/JenisKelamin";
import Pendidikan from "../../../components/penduduk/pendidikan/Pendidikan";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/tabel/Tabel";
import PendudukLogic from "./PendudukLogic";
import { useAppContext } from "../../../contexts/AppContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Page() {
  const { value, func } = PendudukLogic();
  const { desa } = useAppContext();
  return (
    <HelmetProvider>
      {/* metadata */}
      <Helmet>
        <title>Penduduk | {desa}</title>
        <meta
          name="description"
          content="Menggambarkan berbagai aspek penting dari sebuah desa, seperti jumlah penduduk, luas wilayah, tingkat pendidikan, sektor ekonomi utama, serta infrastruktur yang tersedia. Statistik ini memberikan gambaran menyeluruh tentang kondisi demografis, sosial, dan ekonomi desa, yang berguna untuk perencanaan pembangunan dan pengambilan keputusan."
        />
        <meta name="keywords" content="penduduk desa biringkanaya" />
        {/* Open Graph Metadata */}
        <meta
          property="og:title"
          content="Statistik Penduduk Desa Biringkanaya"
        />
        <meta
          property="og:description"
          content="Menggambarkan berbagai aspek penting dari sebuah desa, seperti jumlah penduduk, luas wilayah, tingkat pendidikan, sektor ekonomi utama, serta infrastruktur yang tersedia. Statistik ini memberikan gambaran menyeluruh tentang kondisi demografis, sosial, dan ekonomi desa, yang berguna untuk perencanaan pembangunan dan pengambilan keputusan."
        />
        <meta property="og:image" content="https://godesaku.id/logo.png" />
        <meta
          property="og:url"
          content="https://godesaku.id/statistik/penduduk"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <Toolbar />
      {/* header */}
      <Header
        title={"Statistik Desa"}
        description={
          "Menggambarkan berbagai aspek penting dari sebuah desa, seperti jumlah penduduk, luas wilayah, tingkat pendidikan, sektor ekonomi utama, serta infrastruktur yang tersedia. Statistik ini memberikan gambaran menyeluruh tentang kondisi demografis, sosial, dan ekonomi desa, yang berguna untuk perencanaan pembangunan dan pengambilan keputusan."
        }
        icon={Icon}
        mt={4}
        imageWidth={"85%"}
      />
      <Container maxWidth="lg">
        {/* informasi penduduk */}
        <Stack mt={4}>
          <Title>Informasi Penduduk</Title>
          <Grid2 container spacing={2} mt={2}>
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
                        src={res.image}
                        alt={res.title}
                      />
                      <Stack sx={{ margin: "auto 0" }}>
                        <Poppins sx={{ fontWeight: 500 }}>{res.title}</Poppins>
                        <Poppins sx={{ color: "#0D4581", fontWeight: 600 }}>
                          {res.total}{" "}
                          <span
                            style={{
                              color: "black",
                              fontWeight: 400,
                              // marginLeft: "5px",
                              fontFamily: "Poppins",
                            }}
                          >
                            Jiwa
                          </span>
                        </Poppins>
                      </Stack>
                    </Card>
                  </Grid2>
                );
              })}
          </Grid2>
        </Stack>
        {/* berdasarkan jumlah penduduk */}
        <Stack mt={4}>
          <Title style={{ textAlign: "left" }}>
            Berdasarkan Jumlah Penduduk
          </Title>
          {/* chart */}
          <JumlahPenduduk />
        </Stack>
        {/* berdasarkan kematian */}
        <Stack mt={4}>
          <Title style={{ textAlign: "left" }}>Berdasarkan Kematian</Title>
          {/* chart */}
          <Kematian />
        </Stack>
        {/* berdasarkan jenis kelamin */}
        <Stack mt={4}>
          <Title style={{ textAlign: "left" }}>Berdasarkan Jenis kelamin</Title>
          {/* chart */}
          <JenisKelamin />
        </Stack>
        {/* berdasarkan Pendidikan */}
        <Stack mt={4}>
          <Title style={{ textAlign: "left" }}>Berdasarkan Pendidikan</Title>
          {/* chart */}
          <Pendidikan />
        </Stack>
        {/* Berdasarkan Pekerjaan */}
        <Stack sx={{ mt: 6 }}>
          <Title style={{ textAlign: "left" }}>Berdasarkan Pekerjaan</Title>
          <TableContainer
            component={Paper}
            sx={{
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
                    Jenis Pekerjaan
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontFamily: "Poppins" }}>
                    Jumlah
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {value.pekerjaan &&
                  value.pekerjaan.map((row) => {
                    return (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.title}
                        </StyledTableCell>
                        <StyledTableCell>{row.total} Orang</StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        {/* berdasarkan status perkawinan */}
        <Stack mt={4}>
          <Title style={{ textAlign: "left" }}>
            Berdasarkan Status Perkawinan
          </Title>
          <Grid2 container spacing={2} mt={2}>
            {value.perkawinan &&
              value.perkawinan.map((res) => {
                return (
                  <Grid2
                    key={res.id}
                    size={{ xs: 12, md: 4 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      sx={{
                        width: { xs: "100%", md: "395px" },
                        display: "flex",
                        px: 3,
                        borderRadius: "10px",
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Stack>
                        <img
                          style={{ width: "100px" }}
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
                          {res.total}
                          <span
                            style={{
                              color: "black",
                              fontWeight: 400,
                              marginLeft: "5px",
                              fontFamily: "Poppins",
                            }}
                          >
                            Jiwa
                          </span>
                        </Poppins>
                      </Stack>
                    </Card>
                  </Grid2>
                );
              })}
          </Grid2>
        </Stack>
        {/* berdasarkan Agama */}
        <Stack mt={4}>
          <Title style={{ textAlign: "left" }}>Berdasarkan Agama</Title>
          <Grid2 container spacing={2} mt={2}>
            {value.agama &&
              value.agama.map((res) => {
                return (
                  <Grid2
                    key={res.id}
                    size={{ xs: 12, md: 4 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      sx={{
                        width: { xs: "100%", md: "395px" },
                        display: "flex",
                        px: 3,
                        borderRadius: "10px",
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Stack>
                        <img
                          style={{ width: "100px" }}
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
                          {res.total}
                          <span
                            style={{
                              color: "black",
                              fontWeight: 400,
                              marginLeft: "5px",
                              fontFamily: "Poppins",
                            }}
                          >
                            Jiwa
                          </span>
                        </Poppins>
                      </Stack>
                    </Card>
                  </Grid2>
                );
              })}
          </Grid2>
        </Stack>
        {/* berdasarkan Kewarganegaraan */}
        <Stack mt={4}>
          <Title style={{ textAlign: "left" }}>
            Berdasarkan Kewarganegaraan
          </Title>
          <Grid2 container spacing={2} mt={2}>
            {value.kewarganegaraan &&
              value.kewarganegaraan.map((res) => {
                
                return (
                  <Grid2
                    key={res.id}
                    size={{ xs: 12, md: 4 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      sx={{
                        width: { xs: "100%", md: "395px" },
                        display: "flex",
                        px: 3,
                        borderRadius: "10px",
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <Stack>
                        <img
                          style={{ width: "100px" }}
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
                          {res.total}
                          <span
                            style={{
                              color: "black",
                              fontWeight: 400,
                              marginLeft: "5px",
                              fontFamily: "Poppins",
                            }}
                          >
                            Jiwa
                          </span>
                        </Poppins>
                      </Stack>
                    </Card>
                  </Grid2>
                );
              })}
          </Grid2>
        </Stack>
      </Container>
      {/* Footer */}
      <Footer />
    </HelmetProvider>
  );
}
