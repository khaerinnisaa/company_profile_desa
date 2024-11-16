import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { Box, Stack, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import Icon from "../../assets/icon_header_profil.png";
import Informasi from "../../components/informasi/profil/Informasi";
import VisiMisi from "../../components/visi-misi/VisiMisi";
import Sejarah_desa from "../../components/sejarah_desa/SejarahDesa";
import Footer from "../../components/footer/Footer";
import "leaflet/dist/leaflet.css";
// components/Map.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Poppins } from "../../components/typography/Poppins";
import "./style.css";
import ProfilLogic from "./ProfilLogic";

export default function Page() {
  const position = [-5.2103611, 119.5070556];
  const { value, func } = ProfilLogic();
  return (
    <Box>
      <Navbar />
      <Toolbar />
      {/* profil desa */}
      <Header
        mt={4}
        title={"Profil Desa"}
        description={
          "Manfaat informasi desa adalah sebagai alat untuk meningkatkan transparansi dan partisipasi masyarakat dalam pembangunan desa. Informasi ini membantu warga untuk lebih memahami program dan kebijakan pemerintah desa, sehingga mereka dapat terlibat aktif dalam pengambilan keputusan. Selain itu, informasi desa juga berperan penting dalam mengidentifikasi potensi dan kebutuhan desa, mendorong pembangunan yang lebih tepat sasaran, serta memperkuat hubungan antara pemerintah desa dan masyarakat."
        }
        icon={Icon}
        imageWidth={"90%"}
      />
      {/* informasi desa */}
      <Informasi title={"Informasi Desa"} />
      {/* visi misi */}
      <VisiMisi mt={14} />
      {/* sejarah desa */}
      <Sejarah_desa />
      {/* peta wilayah */}
      <Stack
        sx={{
          width: { xs: "100%", md: "93%" },
          backgroundColor: "#0D4581",
          borderRadius: { xs: "0px", md: "0px 50px 317px 0px" },
          height: {
            xs: "auto",
            md: "500px",
          },
          py: { xs: 4, md: 0 },
          mt: 2,
          background: {
            xs: "#0D4581",
            md: `linear-gradient(123.52deg, #0D4581 55.27%, #FFFFFF 179.96%)`,
          },
        }}
      >
        <Grid
          // minWidth={"100vw"}
          container
          spacing={2}
          sx={{
            width: { xs: "100%", md: "90%" },
            // alignSelf: "center",
            margin: "auto",
          }}
        >
          <Grid
            size={{ xs: 12, md: 6, lg: 5 }}
            sx={{
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <Poppins
              sx={{
                fontSize: { xs: "30px", md: "40px", lg: "40px" },
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: { xs: "unset", md: "58px" },
                textAlign: { xs: "center", md: "unset" },
              }}
            >
              Peta Wilayah
            </Poppins>
            <Poppins
              sx={{
                width: { xs: "90%", md: "100%" },
                color: "#FFFFFF",
                mt: 2,
                textAlign: { xs: "justify", md: "justify" },
                margin: "20px auto 0 auto",
                // back
              }}
            >
              {value.peta.deskripsi}
            </Poppins>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6, lg: 7 }}
            sx={{ margin: "auto", alignSelf: "center" }}
          >
            {value.peta.length !== 0 && (
              <MapContainer
                center={[value.peta.latitude, value.peta.longitude]}
                zoom={13}
                style={{
                  height: "238px",
                  width: "75%",
                  margin: "auto",
                }}
                className="maps"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* <Marker position={position} icon={customIcon}>
                <Popup>Perumahan Mutiara Indah</Popup>
              </Marker> */}
              </MapContainer>
            )}
          </Grid>
        </Grid>
      </Stack>
      {/* footer */}
      <Footer />
    </Box>
  );
}
