import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
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
import "./style.css";
import ListingLogic from "./ListingLogic";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAppContext } from "../../contexts/AppContext";

export default function Page() {
  const { value, func } = ListingLogic();
  const { desa } = useAppContext();
  return (
    <HelmetProvider>
      <Helmet>
        <title>Listing | {desa}</title>
        <meta
          name="description"
          content="Menggambarkan berbagai aspek penting dari sebuah desa, seperti jumlah penduduk, luas wilayah, tingkat pendidikan, sektor ekonomi utama, serta infrastruktur yang tersedia. "
        />
        <meta name="keywords" content="listing desa biringkanaya" />
        {/* Open Graph Metadata */}
        <meta property="og:title" content="Listing Desa Biringkanaya" />
        <meta property="og:description" content="Menggambarkan berbagai aspek penting dari sebuah desa, seperti jumlah penduduk, luas wilayah, tingkat pendidikan, sektor ekonomi utama, serta infrastruktur yang tersedia. " />
        <meta property="og:image" content="https://godesaku.id/logo.png" />
        <meta property="og:url" content="https://godesaku.id/listing" />
        <meta property="og:type" content="website" />
      </Helmet>
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
              zoom={13}
              style={{
                height: "591px",
                width: "100%",
                marginTop: "5px",
                borderRadius: "10px",
              }}
            >
              {value.category && (
                <Stack sx={{ position: "relative", zIndex: 1000 }}>
                  {/* <Stack sx={{ px: 4, width: "auto" }}> */}
                  {/* Dropdown Button */}
                  <button
                    onClick={func.handleDropdownClick}
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      padding: "10px 15px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      alignItems: "center",
                      width: "fit-content",
                      minWidth: "150px",
                      margin: "20px",
                      maxHeight: "45px",
                    }}
                  >
                    <Poppins sx={{ display: "flex", justifyContent: "center" }}>
                      {value.selectedCategory || "Pilih Kategori"}

                      {value.dropdown === true ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </Poppins>
                  </button>

                  {/* Dropdown Menu */}
                  {value.dropdown && (
                    <div
                      style={{
                        position: "absolute",
                        backgroundColor: "#fff",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        zIndex: 1,
                        marginTop: "70px",
                        marginLeft: "20px",
                        borderRadius: "5px",
                        minWidth: "150px",
                      }}
                    >
                      {value.category.map((res) => (
                        <Poppins
                          key={res.id}
                          onClick={() => func.handleOptionClick(res.id)}
                          style={{
                            padding: "10px 15px",
                            cursor: "pointer",
                            color: "#000",
                            backgroundColor:
                              value.selectedCategory === res.name
                                ? "#f0f0f0"
                                : "#fff",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#f0f0f0")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "#fff")
                          }
                        >
                          {res.name}
                        </Poppins>
                      ))}
                    </div>
                  )}
                </Stack>
                // </Stack>
              )}

              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {value.data &&
                value.data.map((res, idx) => (
                  <Marker
                    key={idx}
                    position={[res.latitude, res.longitude]}
                    icon={value.customIcon}
                  >
                    <Popup>
                      <Stack spacing={"3px"}>
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
    </HelmetProvider>
  );
}
