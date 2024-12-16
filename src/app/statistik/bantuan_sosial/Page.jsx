import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import { Poppins } from "../../../components/typography/Poppins";
import { Title } from "../../../components/typography/Title";
import {
  Box,
  Card,
  Container,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
  SliderValueLabel,
  Stack,
  Toolbar,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import BantuanLogic from "./BantuanLogic";
import Succes from "../../../assets/succes.png";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAppContext } from "../../../contexts/AppContext";

export default function Page() {
  const { value, func } = BantuanLogic();
  const { desa } = useAppContext();
  return (
    <HelmetProvider>
      {/* metadata */}
      <Helmet>
        <title>Bantuan Sosial | {desa}</title>
        <meta
          name="description"
          content="Informasi Bantuan Sosial Desa Biringkanaya"
        />
        <meta
          name="keywords"
          content="Informasi Bantuan Sosial Desa Biringkanaya"
        />
        {/* Open Graph Metadata */}
        <meta property="og:title" content="Informasi Bantuan Sosial Desa Biringkanaya" />
        <meta property="og:description" content="Informasi Bantuan Sosial Desa Biringkanaya" />
        <meta property="og:image" content="https://godesaku.id/logo.png" />
        <meta property="og:url" content="https://godesaku.id/statistik/bantuan_sosial" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <Toolbar />
      <Container maxWidth="lg">
        {/* informasi bantuan sosial */}
        <Stack sx={{ mt: 2 }}>
          <Title sx={{ fontSize: { xs: "26px", md: "40px" } }}>
            Informasi Bantuan Sosial
          </Title>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            {value.informasi &&
              value.informasi.map((res) => {
                return (
                  <Grid2 key={res.id} size={{ xs: 12, md: 6 }}>
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
                      <img
                        style={{
                          width: "78px",
                          alignSelf: "center",
                        }}
                        src={res.icon}
                        alt={res.nama_bantuan}
                      />
                      <Stack sx={{ alignSelf: "center" }}>
                        <Poppins>{res.nama_bantuan}</Poppins>
                        <Poppins sx={{ color: "#0D4581", fontWeight: 500 }}>
                          {res.jumlah_penerima}{" "}
                          <span style={{ fontWeight: 400, color: "#000000" }}>
                            {res.keterangan}
                          </span>
                        </Poppins>
                      </Stack>
                    </Card>
                  </Grid2>
                );
              })}
          </Grid2>
        </Stack>
        {/* cek bantuan */}
        <Stack mt={4}>
          <Poppins
            sx={{
              fontSize: {
                xs: "26px",
                md: "40px",
                color: "#0D4581",
                fontWeight: 600,
              },
            }}
          >
            cek bantuan sosial disini!
          </Poppins>
          {/* search */}
          <FormControl variant="outlined" size="small">
            <OutlinedInput
              sx={{
                fontFamily: "Poppins",
                borderRadius: "10px",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
              }}
              value={value.nik}
              onChange={func.handleSearch}
              placeholder="Masukkan Nik"
              // id="outlined-adornment-password"
              startAdornment={
                <InputAdornment position="start">
                  <IconButton aria-label="toggle password visibility">
                    <SearchIcon sx={{ color: "rgba(0,0,0, 0.3)" }} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {/* list data terdaftar */}

          {value.data.length !== 0 && (
            <Card
              sx={{
                mt: 2,
                width: { xs: "100%", md: "30%" },
                p: 2,
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px",
                border: "0.5px solid #B2B2B2;",
                cursor: "pointer",
              }}
              onClick={func.handleOpenModal}
            >
              <Poppins sx={{ fontWeight: 500 }}>{value.data.nama}</Poppins>
              <Poppins sx={{ fontWeight: 500 }}>{value.data.nik}</Poppins>
            </Card>
          )}
        </Stack>
        {/* modal */}
        <Modal
          open={value.open}
          onClose={func.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableAutoFocus={true}
        >
          <Box sx={value.style}>
            <Stack sx={{ gap: 2 }}>
              {/* icon */}
              <Stack sx={{ alignItems: "center" }}>
                <img src={Succes} alt="succes" style={{ width: "103px" }} />
              </Stack>
              {/* title */}
              <Stack sx={{ alignItems: "center" }}>
                <Poppins
                  sx={{
                    fontWeight: 600,
                    fontSize: "21px",
                    textAlign: "center",
                  }}
                >
                  Peserta terdaftar dalam bantuan sosial!
                </Poppins>
              </Stack>
              {/* data */}
              {value.data.bansos &&
                value.data.bansos.map((res) => {
                  return (
                    <Stack sx={{}} key={res.id}>
                      {/* nama */}
                      <Stack sx={{ display: "flex", flexDirection: "row" }}>
                        <Poppins>Nama </Poppins>
                        <Poppins>: {res.nama}</Poppins>
                      </Stack>
                      {/* nik */}
                      <Stack sx={{ display: "flex", flexDirection: "row" }}>
                        <Poppins>Nik </Poppins>
                        <Poppins> : {res.nik}</Poppins>
                      </Stack>
                      {/* jenis bantuan */}
                      <Stack sx={{ display: "flex", flexDirection: "row" }}>
                        <Poppins>Jenis Bantuan </Poppins>
                        <Poppins sx={{ fontWeight: 600 }}>
                          {" "}
                          : {res.nama_bansos}
                        </Poppins>
                      </Stack>
                      {/* keterangan */}
                      <Stack sx={{ display: "flex", flexDirection: "row" }}>
                        <Poppins>Keterangan </Poppins>
                        <Poppins> : {res.deskripsi_bansos}</Poppins>
                      </Stack>
                      {/* periode */}
                      <Stack sx={{ display: "flex", flexDirection: "row" }}>
                        <Poppins>Periode </Poppins>
                        <Poppins> : {res.periode}</Poppins>
                      </Stack>
                    </Stack>
                  );
                })}
            </Stack>
          </Box>
        </Modal>
      </Container>
      {/* Footer */}
      <Footer />
    </HelmetProvider>
  );
}
