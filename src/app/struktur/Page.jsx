import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Poppins } from "../../components/typography/Poppins";
import { Toolbar } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Footer from "../../components/footer/Footer";
import StrukturLogic from "./StrukturLogic";
import { useAppContext } from "../../contexts/AppContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Page() {
  const { value, func } = StrukturLogic();
  const { desa } = useAppContext();
  return (
    <HelmetProvider>
      {/* metadata */}
      <Helmet>
        <title>Struktur | {desa}</title>
        <meta
          name="description"
          content="Struktur Desa Biringkanaya"
        />
        <meta name="keywords" content="struktur desa biringkanaya" />
        {/* Open Graph Metadata */}
        <meta property="og:title" content="Struktur Desa Biringkanaya" />
        <meta property="og:description" content="Struktur Desa Biringkanaya" />
        <meta property="og:image" content="https://godesaku.id/logo.png" />
        <meta property="og:url" content="https://godesaku.id/struktur" />
        <meta property="og:type" content="website" />
      </Helmet>
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
    </HelmetProvider>
  );
}
