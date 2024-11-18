import Header from "../../../components/header/Header";
import Navbar from "../../../components/navbar/Navbar";
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
import React from "react";
import Icon from "../../../assets/icon_header_idm.png";
import { Poppins } from "../../../components/typography/Poppins";
import Footer from "../../../components/footer/Footer";
import { idm, iks, statusIdm } from "../../../values/Constant";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/tabel/Tabel";
import "./style.css";
import { Title } from "../../../components/typography/Title";
import SkorIdm from "../../../components/idm/skor_idm/SkorIdm";

export default function Page() {
  return (
    <Box>
      <Navbar />
      <Toolbar />
      {/* idm */}
      <Header
        mt={4}
        icon={Icon}
        title={"Indeks Desa Membangun (IDM)"}
        description={
          "Indeks Desa Membangun (IDM) adalah alat pengukuran yang digunakan oleh pemerintah Indonesia untuk menilai tingkat kemajuan pembangunan desa berdasarkan tiga dimensi utama: ketahanan sosial, ketahanan ekonomi, dan ketahanan lingkungan. IDM mengklasifikasikan desa ke dalam beberapa kategori, seperti desa mandiri, maju, berkembang, tertinggal, dan sangat tertinggal. Tujuannya adalah untuk memetakan kondisi desa, menentukan kebijakan pembangunan yang tepat, dan mengalokasikan dana desa sesuai kebutuhan."
        }
      />
      <Container maxWidth="lg">
        {/* status & skor idm */}
        <Grid2 container spacing={2} sx={{ mt: 8 }}>
          {statusIdm.map((res) => {
            return (
              <Grid2 size={{ xs: 12, md: 6 }} key={res.id}>
                <Card
                  sx={{
                    width: { xs: "100%" },
                    display: "flex",
                    px: 4,
                    borderRadius: "10px",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <img
                    style={{
                      width: "90px",
                      height: "90px",
                    }}
                    src={res.image}
                    alt="status"
                  />
                  <Stack sx={{ alignSelf: "center" }}>
                    <Poppins>{res.title}</Poppins>
                    <Poppins sx={{ color: "#0D4581", fontWeight: 500 }}>
                      {res.ket}
                    </Poppins>
                  </Stack>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
        {/* Informasi IDM */}
        <Stack sx={{ mt: 6 }}>
          <Title>Informasi IDM</Title>
          <Grid2 container spacing={2} sx={{ mt: 4 }}>
            {idm.map((res) => {
              return (
                <Grid2 size={{ xs: 12, md: 4 }} key={res.id}>
                  <Card
                    sx={{
                      width: { xs: "100%" },
                      display: "flex",
                      px: 3,
                      borderRadius: "10px",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <img
                      style={{ width: "90px" }}
                      src={res.image}
                      alt="status"
                    />
                    <Stack sx={{ alignSelf: "center" }}>
                      <Poppins>{res.title}</Poppins>
                      <Poppins sx={{ color: "#0D4581", fontWeight: 500 }}>
                        {res.total}
                      </Poppins>
                    </Stack>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        </Stack>
        {/* Skor IDM Pertahun */}
        <Stack sx={{ mt: 6 }}>
          <Title>Skor IDM Pertahun</Title>
          {/* chart skor idm */}
          <SkorIdm />
        </Stack>
        {/* IKL */}
        <Stack sx={{ mt: 6 }}>
          <Title>IKL 2023 = 0.1233</Title>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 580,
              overflow: "auto",
              borderRadius: "10px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
              mt: 2,
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    No
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Indikator IDM
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Skor
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Keterangan
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                    }}
                    rowSpan={2}
                  >
                    Kegiatan yang dapat dilakukan
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Nilai
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      // position: "sticky",
                      top: 0,
                      zIndex: 2,
                    }}
                    colSpan={6}
                    align="center"
                  >
                    Yang dapat melaksanakan kegiatan
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell
                    className="th"
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Pusat
                  </StyledTableCell>
                  <StyledTableCell
                    className="th"
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Provinsi
                  </StyledTableCell>
                  <StyledTableCell
                    className="th"
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Kab
                  </StyledTableCell>
                  <StyledTableCell
                    className="th"
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Desa
                  </StyledTableCell>
                  <StyledTableCell
                    className="th"
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Csr
                  </StyledTableCell>
                  <StyledTableCell
                    className="th"
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Lainnya
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {iks.map((res) => {
                  return (
                    <StyledTableRow key={res.id}>
                      <StyledTableCell>{res.id}</StyledTableCell>
                      <StyledTableCell>{res.indikator}</StyledTableCell>
                      <StyledTableCell>{res.skor}</StyledTableCell>
                      <StyledTableCell>{res.keterangan}</StyledTableCell>
                      <StyledTableCell>{res.kegiatan}</StyledTableCell>
                      <StyledTableCell>{res.nilai}</StyledTableCell>
                      <StyledTableCell>{res.pusat}</StyledTableCell>
                      <StyledTableCell>{res.provinsi}</StyledTableCell>
                      <StyledTableCell>{res.kab}</StyledTableCell>
                      <StyledTableCell>{res.desa}</StyledTableCell>
                      <StyledTableCell>{res.csr}</StyledTableCell>
                      <StyledTableCell>{res.lainnya}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        {/* IKS */}
        <Stack sx={{ mt: 6 }}>
          <Title>IKS 2023 = 0.1233</Title>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 580,
              overflow: "auto",
              borderRadius: "10px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
              mt: 2,
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    No
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Indikator IDM
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Skor
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Keterangan
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Kegiatan yang dapat dilakukan
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Nilai
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6", zIndex: 0 }}
                    colSpan={6}
                    align="center"
                  >
                    Yang dapat melaksanakan kegiatan
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Pusat
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Provinsi
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Kab
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Desa
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Csr
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Lainnya
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {iks.map((res) => {
                  return (
                    <StyledTableRow key={res.id}>
                      <StyledTableCell>{res.id}</StyledTableCell>
                      <StyledTableCell>{res.indikator}</StyledTableCell>
                      <StyledTableCell>{res.skor}</StyledTableCell>
                      <StyledTableCell>{res.keterangan}</StyledTableCell>
                      <StyledTableCell>{res.kegiatan}</StyledTableCell>
                      <StyledTableCell>{res.nilai}</StyledTableCell>
                      <StyledTableCell>{res.pusat}</StyledTableCell>
                      <StyledTableCell>{res.provinsi}</StyledTableCell>
                      <StyledTableCell>{res.kab}</StyledTableCell>
                      <StyledTableCell>{res.desa}</StyledTableCell>
                      <StyledTableCell>{res.csr}</StyledTableCell>
                      <StyledTableCell>{res.lainnya}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        {/* IKE */}
        <Stack sx={{ mt: 6 }}>
          <Title>IKE 2023 = 0.1233</Title>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 580,
              overflow: "auto",
              borderRadius: "10px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
              mt: 2,
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    No
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Indikator IDM
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Skor
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Keterangan
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Kegiatan yang dapat dilakukan
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6" }}
                    rowSpan={2}
                  >
                    Nilai
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ border: "1px solid #dee2e6", zIndex: 0 }}
                    colSpan={6}
                    align="center"
                  >
                    Yang dapat melaksanakan kegiatan
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Pusat
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Provinsi
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Kab
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Desa
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Csr
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      border: "1px solid #dee2e6",
                      top: { xs: 65, md: 65 },
                      backgroundColor: "white",
                      zIndex: 1,
                    }}
                  >
                    Lainnya
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {iks.map((res) => {
                  return (
                    <StyledTableRow key={res.id}>
                      <StyledTableCell>{res.id}</StyledTableCell>
                      <StyledTableCell>{res.indikator}</StyledTableCell>
                      <StyledTableCell>{res.skor}</StyledTableCell>
                      <StyledTableCell>{res.keterangan}</StyledTableCell>
                      <StyledTableCell>{res.kegiatan}</StyledTableCell>
                      <StyledTableCell>{res.nilai}</StyledTableCell>
                      <StyledTableCell>{res.pusat}</StyledTableCell>
                      <StyledTableCell>{res.provinsi}</StyledTableCell>
                      <StyledTableCell>{res.kab}</StyledTableCell>
                      <StyledTableCell>{res.desa}</StyledTableCell>
                      <StyledTableCell>{res.csr}</StyledTableCell>
                      <StyledTableCell>{res.lainnya}</StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
        {/* ket ikl idm status idm */}
        <Stack
          sx={{
            mt: 6,
            backgroundColor: "#0D4581",
            p: 4,
            width: { xs: "100%", md: "300px" },
            borderRadius: "10px",
            background: `linear-gradient(180deg, #0D4581 42.5%, #000000 236.79%)`,
          }}
        >
          <Poppins sx={{ fontWeight: 600, color: "#FFFFFF" }}>
            IKL 2023 = 0.1223
          </Poppins>
          <Poppins sx={{ fontWeight: 600, color: "#FFFFFF" }}>
            IDM 2023 = 0.1223
          </Poppins>
          <Poppins sx={{ fontWeight: 600, color: "#FFFFFF" }}>
            Status IDM 2023 = Maju
          </Poppins>
        </Stack>
      </Container>
      {/* footer */}
      <Footer />
    </Box>
  );
}
