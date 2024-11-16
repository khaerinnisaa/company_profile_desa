import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Poppins } from "../../../components/typography/Poppins";
import {
  Card,
  CircularProgress,
  Container,
  Grid2,
  Stack,
  Toolbar,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { ButtonStyle } from "../../../components/button/ButtonStyle";
import { Title } from "../../../components/typography/Title";
import { useAppContext } from "../../../contexts/AppContext";
import { fetchDataPublic } from "../../../service/api";

export default function BeritaPage({}) {
  const { setLoadingRoute } = useAppContext();
  const router = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingId, setLoadingId] = useState(false);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    async function fetchDataProduct() {
      try {
        fetchDataPublic(`/public/products/${slug}`).then((res) => {
          console.log(res, "res bang");
          setProduct(res.data);
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setLoadingRoute(false);
      }
    }
    fetchDataProduct();
    getData();
  }, [slug]);

  // get data produk lainnya
  const getData = async () => {
    try {
      fetchDataPublic(`/public/other-products/${slug}?limit=${4}`).then(
        (res) => {
          setData(res.data);
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // buy
  const buy = (wa) => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Encode pesan untuk menghindari karakter spesial bermasalah
    const message = encodeURIComponent(
      `Halo, saya ingin membeli ${product.nama},Apakah masih ada?`
    );

    const whatsappUrl = isMobile
      ? `https://wa.me/${wa}?text=${message}` // Untuk mobile
      : `https://web.whatsapp.com/send?phone=${wa}&text=${message}`; // Untuk desktop

    window.location.href = whatsappUrl; // Redirect langsung
  };

  //   detail produk
  const handleDetails = (slug) => {
    try {
      setLoadingId(true);
      setSelectedId(slug);
      router(`/produk/${slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading)
    return (
      <Stack sx={{ alignItems: "center", height: "100vh" }}>
        <CircularProgress
          sx={{ margin: "auto", color: "#23176D" }}
          size={"50px"}
        />
      </Stack>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <Toolbar />
      <Container maxWidth="lg">
        {/* Detail produk */}
        {product && (
          <Card
            sx={{
              px: 3,
              borderRadius: "10px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
              mt: 4,
              py: 4,
              height: { xs: "100%", md: "310px" },
            }}
          >
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, md: 3 }}>
                <img
                  style={{
                    width: "100%",
                    height: "246px",
                    borderRadius: "10px",
                  }}
                  src={product.gambar}
                  alt={product.nama}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 9 }}>
                <Stack sx={{ gap: 1 }}>
                  <Poppins sx={{ fontSize: "32px", fontWeight: 600 }}>
                    {product.nama}
                  </Poppins>
                  {/* rating */}
                  <Stack sx={{ display: "flex", flexDirection: "row" }}>
                    <StarIcon sx={{ color: "#F7B100" }} />
                    <StarIcon sx={{ color: "#F7B100" }} />
                    <StarIcon sx={{ color: "#F7B100" }} />
                    <StarIcon sx={{ color: "#F7B100" }} />
                    <StarBorderIcon />
                    <Poppins sx={{ px: 1, fontWeight: 500 }}>
                      {product.rate}
                    </Poppins>
                    <Poppins sx={{ fontWeight: 500 }}>
                      | Terjual {product.terjual}
                    </Poppins>
                  </Stack>
                  {/* harga */}
                  <Poppins sx={{ fontSize: "32px", fontWeight: 600 }}>
                    {product.harga}
                  </Poppins>
                  {/* deskripsi */}
                  <Poppins>{product.deskripsi}</Poppins>
                  {/* button */}
                  <ButtonStyle
                    sx={{
                      width: { xs: "52%", md: "23%", borderRadius: "10px" },
                    }}
                    onClick={() => buy(product.kontak_wa)}
                  >
                    Beli Via Whatsapp
                  </ButtonStyle>
                </Stack>
              </Grid2>
            </Grid2>
          </Card>
        )}
        {/* Produk lainnya */}
        <Stack sx={{ mt: 4 }}>
          <Title style={{ textAlign: "left", fontSize: "32px", color: "#000" }}>
            Produk Lainnya
          </Title>
          <Grid2 container spacing={2} mt={2}>
            {data &&
              data.slice(0, 8).map((res) => {
                return (
                  <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={res.slug}>
                    <Card
                      sx={{
                        borderRadius: "10px",
                        pb: 2,
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "280px",
                          borderRadius: "10px 10px 0px 0px",
                        }}
                        src={res.gambar}
                        alt={res.nama}
                      />
                      <Stack sx={{ px: 2, gap: 1 }}>
                        <Poppins sx={{ fontWeight: 600 }}>{res.nama}</Poppins>
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                          }}
                        >
                          <Poppins>{res.terjual} Terjual</Poppins>
                          <Stack
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 1,
                            }}
                          >
                            <StarIcon
                              sx={{
                                color: "#595959",
                                fontSize: "18px",
                                alignSelf: "center",
                              }}
                            />
                            <Poppins>{res.rate}</Poppins>
                          </Stack>
                        </Stack>
                        <ButtonStyle
                          onClick={() => handleDetails(res.slug)}
                          sx={{
                            // width:
                            //   loadingId === true && selectedId === res.id
                            //     ? "50%"
                            //     : "40%",
                            borderRadius: "10px",
                          }}
                        >
                          {res.harga}{" "}
                          {loadingId === true && selectedId === res.slug && (
                            <CircularProgress
                              size={"20px"}
                              sx={{ color: "#FFFFFF", ml: 1 }}
                            />
                          )}
                        </ButtonStyle>
                      </Stack>
                    </Card>
                  </Grid2>
                );
              })}
          </Grid2>
          {/* pagination */}
          {/* <Stack spacing={2} sx={{ margin: "auto", mt: 3 }}>
            <ThemeProvider theme={themePagination}>
              <Pagination
                sx={{}}
                count={10}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                  />
                )}
              />
            </ThemeProvider>
          </Stack> */}
        </Stack>
      </Container>
      <Footer mt={{ xs: 4, md: 10 }} />
    </>
  );
}
