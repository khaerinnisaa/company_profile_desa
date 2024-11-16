import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Container,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Toolbar,
} from "@mui/material";
import React from "react";
import Icon from "../../assets/icon_header_listing.png";
import { Poppins } from "../../components/typography/Poppins";
import { Title } from "../../components/typography/Title";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import Footer from "../../components/footer/Footer";
import Maps from "../../assets/maps.png";
import "./style.css";
import ListingLogic from "./ListingLogic";

// Custom Icon untuk Marker
const customIcon = new L.Icon({
  iconUrl: Maps, // Anda bisa menggunakan URL ikon khusus
  iconSize: [37, 39],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function Page() {
  const { value, func } = ListingLogic();

  const positions = [
    {
      coords: [-5.20196, 119.49466],
      popup: "Perumahan Mutiara Indah",
      location: "Kecamatan Tamalate,kab. Gowa",
    },
    {
      coords: [-5.148760412626431, 119.45385840163603],
      popup: "Lokasi Kedua",
      location: "Kecamatan Tamalate,kab. Gowa",
    },
    // Tambahkan lokasi lain di sini
  ];

  // if (value.loading === true)
  //   return (
  //     <Stack sx={{ alignItems: "center", height: "100vh" }}>
  //       <CircularProgress
  //         sx={{ margin: "auto", color: "#23176D" }}
  //         size={"50px"}
  //       />
  //     </Stack>
  //   );
  return (
    <Box>
      <Navbar />
      <Toolbar />
      {/* header */}
      <Header
        icon={Icon}
        title={"Listing"}
        description={
          "Menggambarkan berbagai aspek penting dari sebuah desa, seperti jumlah penduduk, luas wilayah, tingkat pendidikan, sektor ekonomi utama, serta infrastruktur yang tersedia. Statistik ini memberikan gambaran menyeluruh tentang kondisi demografis, sosial, dan ekonomi desa, yang berguna untuk perencanaan pembangunan dan pengambilan keputusan."
        }
        mt={4}
        imageWidth={"80%"}
      />
      <Container maxWidth="lg">
        {/* peta desa */}
        {value.position && (
          <Stack mt={4}>
            <Title>Peta Desa</Title>
            <MapContainer
              center={value.position}
              // center={positions[0].coords}
              zoom={13}
              style={{
                height: "591px",
                width: "100%",
                marginTop: "5px",
                borderRadius: "10px",
              }}
            >
              <Stack sx={{ position: "relative", zIndex: 1000 }}>
                <FormControl sx={{ px: 4, maxWidth: "240px" }}>
                  {value.category && (
                    <Stack>
                      <Select
                        sx={{
                          height: 40,
                          // width: { xs: "100px", md: "170px" },
                          fontFamily: "Poppins",
                          borderRadius: "5px",
                          mt: 2,
                          fontWeight: 500,
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                          backgroundColor: "white",
                        }}
                        onChange={func.handleCategory}
                        displayEmpty
                        value={value.selectedCategory}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                          if (selected === undefined) {
                            return <em>Pilih Tahun</em>;
                          }
                          return selected;
                        }}
                        MenuProps={value.MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {value.category.map((res) => (
                          <MenuItem
                            key={res.id}
                            sx={{ fontFamily: "Poppins" }}
                            value={res.id}
                          >
                            {res.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  )}
                </FormControl>
              </Stack>

              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {value.data &&
                value.data.map((res, idx) => (
                  <Marker
                    key={idx}
                    position={[res.latitude, res.longitude]}
                    icon={customIcon}
                  >
                    <Popup>
                      <Stack spacing={"3px"} sx={{}}>
                        <Poppins sx={{ color: "#0D4581", fontWeight: 600 }}>
                          {res.name}
                        </Poppins>
                        <Poppins sx={{ color: "#0D4581" }}>
                          {res.location}
                        </Poppins>
                      </Stack>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </Stack>
        )}
      </Container>
      {/* footer */}
      <Footer />
    </Box>
  );
}
