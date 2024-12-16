import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Navigation } from "swiper/modules";
import { Box, Card, Container, Grid2, Stack, Toolbar } from "@mui/material";
import Icon from "../../assets/icon_header_beranda.png";
import BerandaLogic from "./BerandaLogic";
import Footer from "../../components/footer/Footer";
import { useAppContext } from "../../contexts/AppContext";
import Navbar from "../../components/navbar/Navbar";
import { Poppins } from "../../components/typography/Poppins";
import Header from "../../components/header/Header";
import Informasi from "../../components/informasi/beranda/Informasi";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Home() {
  const { limitText, desa } = useAppContext();
  const { value, func } = BerandaLogic();
  return (
    <HelmetProvider>
      {/* metadata */}
      <Helmet>
        <title>{desa}</title>
        <meta
          name="description"
          content="Desa Biringkanaya adalah sebuah desa yang terletak di wilayah perbukitan di Kabupaten Maros, Provinsi Sulawesi Selatan. Desa ini berada pada ketinggian sekitar 700 meter di atas permukaan laut, dikelilingi oleh hamparan sawah dan hutan pinus yang subur. Letak geografisnya berada di koordinat 7°20' Lintang Selatan dan 110°30' Bujur Timur."
        />
        <meta name="keywords" content="desa biringkanaya" />
        {/* Open Graph Metadata */}
        <meta property="og:title" content="Desa Biringkanaya" />
        <meta
          property="og:description"
          content="Desa Biringkanaya adalah sebuah desa yang terletak di wilayah perbukitan di Kabupaten Maros, Provinsi Sulawesi Selatan. Desa ini berada pada ketinggian sekitar 700 meter di atas permukaan laut, dikelilingi oleh hamparan sawah dan hutan pinus yang subur. Letak geografisnya berada di koordinat 7°20' Lintang Selatan dan 110°30' Bujur Timur."
        />
        <meta property="og:image" content="https://godesaku.id/logo.png" />
        <meta property="og:url" content="https://godesaku.id" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <Toolbar />
      <Container sx={{ py: { xs: "4%", md: "2%" } }} maxWidth="lg">
        <Stack>
          <Swiper
            // style={{ backgroundColor: "red" }}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {value.dataSlider &&
              value.dataSlider.map((res) => (
                <SwiperSlide key={res.id}>
                  <img
                    className="responsive-image"
                    src={res.image}
                    alt="Beranda"
                  />

                  <Poppins
                    sx={{
                      width: { xs: "75%", md: "65%" },
                      position: "absolute",
                      fontSize: { xs: "18px", md: "40px" },
                      fontWeight: 700,
                      color: "#FFFFFF",
                      mt: { xs: 0, md: 2 },
                    }}
                  >
                    {res.title}
                  </Poppins>
                  <Poppins
                    sx={{
                      position: "absolute",
                      color: "#FFFFFF",
                      mt: { xs: 14, md: 24 },
                      fontSize: { xs: "14px", md: "18px" },
                    }}
                  >
                    {res.description}
                  </Poppins>
                </SwiperSlide>
              ))}
          </Swiper>
        </Stack>
      </Container>
      {/* profil singkat desa */}
      {value.dataProfil.length !== 0 && (
        <Header
          title={value.dataProfil.title}
          description={value.dataProfil && value.dataProfil.deskripsi}
          icon={Icon}
          imageWidth={"100%"}
        />
      )}

      {/* informasi desa */}
      <Informasi title={"Informasi Desa"} />
      {/* berita desa */}
      <Stack sx={{ backgroundColor: "#0D4581", py: 6, mt: 12 }}>
        <Container maxWidth="lg">
          <Poppins
            sx={{
              textAlign: "center",
              fontSize: { xs: "30px", md: "40px" },
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            Berita Desa
          </Poppins>
          <Grid2 container spacing={6} mt={6}>
            {value.data &&
              value.data.map((res) => {
                return (
                  <Grid2
                    key={res.slug}
                    size={{ xs: 12, md: 6, lg: 4 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      sx={{
                        borderRadius: "10px",
                        width: {
                          xs: "90%",
                          md: "382px",
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                        },
                        cursor: "pointer",
                      }}
                      onClick={() => func.handleDetailBerita(res.slug)}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "250px",
                          borderRadius: "10px 10px 0px 0px",
                        }}
                        src={res.images[0]}
                        alt={res.title}
                      />
                      <Poppins
                        sx={{
                          width: "90%",
                          fontSize: "16px",
                          fontWeight: 700,
                          margin: "auto",
                          py: 2,
                        }}
                      >
                        {limitText(res.title, 60)}
                      </Poppins>
                      <Poppins sx={{ width: "90%", margin: "auto", pb: 2 }}>
                        {limitText(res.content, 66)}
                      </Poppins>
                    </Card>
                  </Grid2>
                );
              })}
          </Grid2>
        </Container>
      </Stack>
      {/* footer */}
      <Footer />
    </HelmetProvider>
  );
}
