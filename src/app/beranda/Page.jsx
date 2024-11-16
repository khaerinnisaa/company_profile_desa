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
import LoaderImage from "../../components/loaderImage/LoaderImage";
import Navbar from "../../components/navbar/Navbar";
import { Poppins } from "../../components/typography/Poppins";
import Header from "../../components/header/Header";
import Informasi from "../../components/informasi/beranda/Informasi";

export default function Home() {
  const { limitText } = useAppContext();
  const { value, func } = BerandaLogic();
  return (
    <Box>
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
    </Box>
  );
}
