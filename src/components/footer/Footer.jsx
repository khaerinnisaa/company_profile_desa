import { Box, Container, Grid2, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Poppins } from "../typography/Poppins";
import CopyrightIcon from "@mui/icons-material/Copyright";
import "leaflet/dist/leaflet.css";
// components/Map.js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { fetchDataPublic } from "../../service/api";
import "./style.css";

// Custom Icon untuk Marker
const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png", // Anda bisa menggunakan URL ikon khusus
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function Footer() {
  // const position = [-5.2103611, 119.5070556];
  // const position = [-5.211674, 119.505829];
  const [data, setData] = useState([]);
  const [sosmed, setSosmed] = useState([]);
  const [contact, setContact] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    getData();
    getDataSosmed();
    getDataContact();
    getDataLocation();
  }, []);

  // get data informasi desa
  const getData = async () => {
    fetchDataPublic(`/public/home/general-information`).then((res) => {
      setData(res.data);
    });
  };
  // get data sosial media desa
  const getDataSosmed = async () => {
    fetchDataPublic(`/public/home/social-media`).then((res) => {
      setSosmed(res.data);
    });
  };
  // get data kontak desa
  const getDataContact = async () => {
    fetchDataPublic(`/public/home/contacts`).then((res) => {
      setContact(res.data);
    });
  };
  // get data lokasi desa
  const getDataLocation = async () => {
    fetchDataPublic(`/public/home/location`).then((res) => {
      setLocation(res.data);
    });
  };

  return (
    <Box>
      <Container maxWidth="lg">
        <Grid2
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <Grid2 size={{ xs: 12, sm: 6, md: 3.5, lg: 3 }}>
            <Stack sx={{ alignItems: { xs: "center", md: "start" } }}>
              <img
                className="logo"
                style={{
                  width: "269px",
                  height: "123px",
                  objectFit: "cover",
                }}
                src={data.logo}
                alt="logo"
              />
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 2.8, lg: 3 }} sx={{}}>
            <Poppins
              sx={{ fontSize: "21px", fontWeight: 700, color: "#0D4581" }}
            >
              Pemerintah {data.nama}
            </Poppins>
            <Poppins sx={{ color: "#0D4581" }}>
              Kabupaten {data.kabupaten}
            </Poppins>
            <Poppins sx={{ color: "#0D4581" }}>{data.provinsi}</Poppins>
            <Poppins sx={{ color: "#0D4581" }}>Indonesia</Poppins>
            <Stack sx={{ display: { xs: "block", sm: "none", md: "block" } }}>
              {/* sosial media */}
              <Poppins
                sx={{
                  fontSize: "21px",
                  fontWeight: 700,
                  color: "#0D4581",
                  mt: 2,
                }}
              >
                Sosial Media
              </Poppins>
              {sosmed.slice(0, 3).map((res) => {
                return (
                  <Stack
                    key={res.id}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignSelf: "center",
                      gap: 1,
                    }}
                  >
                    <img
                      src={res.icon}
                      style={{ width: "18px", alignSelf: "center" }}
                    />
                    <Poppins>{res.username}</Poppins>
                  </Stack>
                );
              })}
              {/* tampilan mobile */}
              {sosmed.slice(3, 100).map((res) => {
                return (
                  <Stack
                    key={res.id}
                    sx={{
                      display: { xs: "flex", lg: "none" },
                      flexDirection: "row",
                      alignSelf: "center",
                      gap: 1,
                    }}
                  >
                    <img
                      src={res.icon}
                      style={{ width: "18px", alignSelf: "center" }}
                    />
                    <Poppins>{res.username}</Poppins>
                  </Stack>
                );
              })}
              {/* tampilan mobile end */}
            </Stack>
          </Grid2>
          {/* sosial media untuk tampilan sm */}
          <Grid2
            size={{ xs: 12, sm: 6, md: 2.7, lg: 3 }}
            mt={-2}
            sx={{
              display: { xs: "none", sm: "block", md: "none" },
              pl: "7%",
            }}
          >
            {/* <Stack sx={{}}> */}
            {/* sosial media */}
            <Poppins
              sx={{
                fontSize: "21px",
                fontWeight: 700,
                color: "#0D4581",
                mt: 2,
              }}
            >
              Sosial Media
            </Poppins>
            {sosmed.map((res) => {
              return (
                <Stack
                  key={res.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignSelf: "center",
                    gap: 1,
                  }}
                >
                  <img
                    src={res.icon}
                    style={{ width: "18px", alignSelf: "center" }}
                  />
                  <Poppins>{res.username}</Poppins>
                </Stack>
              );
            })}
          </Grid2>
          {/* sosial media untuk tampilan sm. end */}

          {/* kontak desa */}
          <Grid2 size={{ xs: 12, sm: 6, md: 2.7, lg: 3 }} sx={{}}>
            <Poppins
              sx={{ fontSize: "21px", fontWeight: 700, color: "#0D4581" }}
            >
              Kontak Desa
            </Poppins>
            {contact.map((res) => {
              return (
                <Stack
                  key={res.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignSelf: "center",
                    gap: 1,
                  }}
                >
                  <img
                    src={res.icon}
                    style={{ width: "16px", alignSelf: "center" }}
                    alt="contact"
                  />
                  <Poppins>
                    {res.number} {res.name}
                  </Poppins>
                </Stack>
              );
            })}
            {/* tampilan desktop sosmed */}
            <Stack mt={10} sx={{ display: { xs: "none", lg: "flex" } }}>
              {sosmed.slice(3, 100).map((res) => {
                return (
                  <Stack
                    key={res.id}
                    sx={{
                      flexDirection: "row",
                      // alignSelf: "center",
                      gap: 1,
                    }}
                  >
                    <img
                      src={res.icon}
                      style={{ width: "18px", alignSelf: "center" }}
                    />
                    <Poppins>{res.username}</Poppins>
                  </Stack>
                );
              })}
            </Stack>

            {/* tampilan desktop end */}
          </Grid2>
          {/* alamat desa */}
          <Grid2 size={{ xs: 12, md: 3, lg: 3 }} sx={{}}>
            <Poppins
              sx={{ fontSize: "21px", fontWeight: 700, color: "#0D4581" }}
            >
              Alamat Desa
            </Poppins>
            {/* maps */}
            {location.length !== 0 && (
              <MapContainer
                center={[location.latitude, location.longitude]}
                // center={(location.latitude, location.longitude)}
                zoom={16}
                style={{ height: "238px", width: "100%", marginTop: "5px" }}
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
          </Grid2>
        </Grid2>
      </Container>
      {/* copy right */}
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignSelf: "center",
          gap: 0.5,
          backgroundColor: "#0D4581",
          height: "63px",
          justifyContent: "center",
        }}
      >
        <CopyrightIcon
          sx={{ fontSize: "20px", alignSelf: "center", color: "#FFFFFF" }}
        />
        <Poppins sx={{ alignSelf: "center", color: "#FFFFFF" }}>
          2024 powered by GoDesaku I PT. Hanan Media Solution
        </Poppins>
      </Stack>
    </Box>
  );
}
