import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Poppins } from "../../components/typography/Poppins";
import { Toolbar } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Footer from "../../components/footer/Footer";
import StrukturLogic from "./StrukturLogic";

export default function Page() {
  const { value, func } = StrukturLogic();
  return (
    <Box>
      <Navbar />
      <Toolbar />
      {/* struktur pemerintah desa */}
      {value.pemerintah && (
        <Stack sx={{ py: 6, alignItems: "center" }}>
          <Poppins
            sx={{
              fontSize: { xs: "26px", md: "40px" },
              fontWeight: 600,
              color: "#0D4581",
            }}
          >
            Struktur Pemerintah Desa
          </Poppins>
          <img
            style={{ width: "70%", borderRadius: "10px", marginTop: "30px" }}
            src={value.pemerintah.image}
            alt="Struktur Pemerintahan Desa"
          />
        </Stack>
      )}

      {/* Struktur organisasi desa */}
      {value.organisasi && (
        <Stack sx={{ py: 6, alignItems: "center", backgroundColor: "#0D4581" }}>
          <Poppins
            sx={{
              fontSize: { xs: "26px", md: "40px" },
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            Struktur Organisasi Desa
          </Poppins>
          <img
            style={{ width: "70%", borderRadius: "10px", marginTop: "30px" }}
            src={value.organisasi.image}
            alt="Struktur Organisasi Desa"
          />
        </Stack>
      )}

      {/* footer */}
      <Footer />
    </Box>
  );
}
