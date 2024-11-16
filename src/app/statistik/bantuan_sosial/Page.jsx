import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import { Poppins } from "../../../components/typography/Poppins";
import { Title } from "../../../components/typography/Title";
import { bantuanSosial } from "../../../values/Constant";
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

export default function Page() {
  const { value, func } = BantuanLogic();
  return (
    <Box>
      <Navbar />
      <Toolbar />
      <Container maxWidth="lg">
        {/* informasi bantuan sosial */}
        <Stack sx={{ mt: 2 }}>
          <Title sx={{ fontSize: { xs: "26px", md: "40px" } }}>
            Informasi Bantuan Sosial
          </Title>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            {bantuanSosial.map((res) => {
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
                      src={res.image}
                      alt={res.title}
                    />
                    <Stack sx={{ alignSelf: "center" }}>
                      <Poppins>{res.title}</Poppins>
                      <Poppins sx={{ color: "#0D4581", fontWeight: 500 }}>
                        {res.total}{" "}
                        <span style={{ fontWeight: 400, color: "#000000" }}>
                          {res.ket}
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
              value={value.query}
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

          {value.filteredData &&
            value.filteredData.map((res) => {
              return (
                <Card
                  key={res.id}
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
                  <Poppins sx={{ fontWeight: 500 }}>{res.name}s</Poppins>
                  <Poppins sx={{ fontWeight: 500 }}>{res.nik}</Poppins>
                </Card>
              );
            })}
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
              <Stack sx={{}}>
                {/* nama */}
                <Stack sx={{ display: "flex", flexDirection: "row" }}>
                  <Poppins>Nama </Poppins>
                  <Poppins>: Dhimas Jaya Kusuma Sarma</Poppins>
                </Stack>
                {/* nik */}
                <Stack sx={{ display: "flex", flexDirection: "row" }}>
                  <Poppins>Nik </Poppins>
                  <Poppins> : 73310829330002</Poppins>
                </Stack>
                {/* jenis bantuan */}
                <Stack sx={{ display: "flex", flexDirection: "row" }}>
                  <Poppins>Jenis Bantuan </Poppins>
                  <Poppins sx={{ fontWeight: 600 }}> : PKH</Poppins>
                </Stack>
                {/* keterangan */}
                <Stack sx={{ display: "flex", flexDirection: "row" }}>
                  <Poppins>Keterangan </Poppins>
                  <Poppins> : Sudah proses Kemensos</Poppins>
                </Stack>
                {/* periode */}
                <Stack sx={{ display: "flex", flexDirection: "row" }}>
                  <Poppins>Periode </Poppins>
                  <Poppins> : 15 Agustus 2024</Poppins>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      </Container>
      {/* Footer */}
      <Footer />
    </Box>
  );
}
