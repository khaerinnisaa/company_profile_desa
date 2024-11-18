import { useEffect, useState } from "react";
import React from "react";
import { fetchDataPublic } from "../../service/api";
import { Container, Stack } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Title } from "@mui/icons-material";
import { Poppins } from "../typography/Poppins";
import Maps from "../../assets/maps.png";

export default function Dropdown() {
  const [category, setCategory] = useState([]); // category dropdown
  const [categoryId, setCategoryId] = useState(); // id category
  const [dropdown, setDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dataCategory();
      if (categoryId) {
        await dataListing();
      }
    };

    fetchData();
  }, [categoryId]);

  // Fetch data dropdown
  const dataCategory = async () => {
    try {
      const res = await fetchDataPublic(`/public/listing-categories`);
      setCategory(res.data);
      // Set default category ID if none is selected
      if (!categoryId && res.data.length > 0) {
        setCategoryId(res.data[0].id);
      }
    } catch (error) {
      console.log("Error fetching categories", error);
    }
  };

  // Fetch data listing
  const dataListing = async () => {
    try {
      const endpoint =
        categoryId === undefined
          ? `/public/listing-locations`
          : `/public/listing-locations/${categoryId}`;
      const res = await fetchDataPublic(endpoint);
      setData(res.data);
    } catch (err) {
      console.log("Error fetching listings", err);
    } finally {
      setLoading(false);
    }
  };

  // Find selected category name
  const selectedCategory = category.find((res) => res.id === categoryId)?.name;

  // Determine position for map
  let position;
  if (data && data.length > 0) {
    // Use the first data entry to determine the map center
    position = [data[0].latitude, data[0].longitude];
  }

  const handleDropdownClick = () => {
    setDropdown(!dropdown);
  };

  // Handle selecting a category from the dropdown
  const handleOptionClick = (id) => {
    setCategoryId(id);
    setDropdown(false);
  };

  const customIcon = new L.Icon({
    iconUrl: Maps,
    iconSize: [37, 39],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  return (
    <>
      <Container maxWidth="lg">
        {/* peta desa */}
        {position && (
          <Stack mt={4}>
            <Title>Peta Desa</Title>
            <MapContainer
              center={position}
              zoom={13}
              style={{
                height: "591px",
                width: "100%",
                marginTop: "5px",
                borderRadius: "10px",
              }}
            >
              {category && (
                <Stack sx={{ position: "relative", zIndex: 1000 }}>
                  {/* Dropdown Button */}
                  <button
                    onClick={handleDropdownClick}
                    style={{
                      backgroundColor: "#444",
                      color: "#fff",
                      padding: "10px 15px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {selectedCategory || "Pilih Kategori"}
                    <span style={{ marginLeft: "10px" }}>▼</span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdown && (
                    <div
                      style={{
                        position: "absolute",
                        backgroundColor: "#fff",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        zIndex: 1,
                        marginTop: "5px",
                        borderRadius: "5px",
                        minWidth: "150px",
                      }}
                    >
                      {category.map((res) => (
                        <Poppins
                          key={res.id}
                          onClick={() => handleOptionClick(res.id)}
                          style={{
                            padding: "10px 15px",
                            cursor: "pointer",
                            color: "#000",
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
              )}

              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {data &&
                data.map((res, idx) => (
                  <Marker
                    key={idx}
                    position={[res.latitude, res.longitude]}
                    icon={customIcon}
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
    </>
  );
}
