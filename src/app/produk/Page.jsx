import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Card,
  CircularProgress,
  Container,
  Grid2,
  Pagination,
  PaginationItem,
  Stack,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import React from "react";
import Icon from "../../assets/icon_header_produk.png";
import { Poppins } from "../../components/typography/Poppins";
import { ButtonStyle } from "../../components/button/ButtonStyle";
import StarIcon from "@mui/icons-material/Star";
import Footer from "../../components/footer/Footer";
import { themePagination } from "../../components/pagination/Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Title } from "../../components/typography/Title";
import ProdukLogic from "./ProdukLogic";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAppContext } from "../../contexts/AppContext";

export default function Page() {
  const { value, func } = ProdukLogic();
  const { desa } = useAppContext();
  return (
    <HelmetProvider>
      {/* metadata */}
      <Helmet>
        <title>Produk | {desa}</title>
        <meta
          name="description"
          content="Produk desa adalah produk yang dihasilkan dari potensi lokal yang khas, meliputi hasil pertanian, kerajinan tangan, dan produk olahan tradisional. Produk ini mencerminkan budaya dan kearifan lokal, serta didukung oleh sumber daya alam yang melimpah di wilayah pedesaan."
        />
        <meta name="keywords" content="produk desa biringkanaya" />
        {/* Open Graph Metadata */}
        <meta property="og:title" content="Produk Desa Biringkanaya" />
        <meta
          property="og:description"
          content="Produk desa adalah produk yang dihasilkan dari potensi lokal yang khas, meliputi hasil pertanian, kerajinan tangan, dan produk olahan tradisional. Produk ini mencerminkan budaya dan kearifan lokal, serta didukung oleh sumber daya alam yang melimpah di wilayah pedesaan"
        />
        <meta property="og:image" content="https://godesaku.id/logo.png" />
        <meta property="og:url" content="https://godesaku.id/produk" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <Toolbar />
      {/* Produk Desa */}
      <Header
        mt={4}
        title={"Produk Desa"}
        description={
          "Produk desa adalah produk yang dihasilkan dari potensi lokal yang khas, meliputi hasil pertanian, kerajinan tangan, dan produk olahan tradisional. Produk ini mencerminkan budaya dan kearifan lokal, serta didukung oleh sumber daya alam yang melimpah di wilayah pedesaan. Dengan kualitas yang terjaga dan nilai historis yang tinggi, produk desa sering kali menjadi incaran para wisatawan dan pasar ekspor. Selain itu, pengembangan produk desa turut mendukung perekonomian lokal dan keberlanjutan lingkungan."
        }
        icon={Icon}
        imageWidth={"80%"}
      />
      <Container maxWidth="lg">
        {/* produk hasil desa */}
        <Stack sx={{ mt: 4 }}>
          <Title>Produk Hasil Desa</Title>
          <Grid2 container spacing={2} mt={2}>
            {value.data &&
              value.data.map((res) => {
                return (
                  <Grid2 size={{ xs: 12, md: 6, lg: 4 }} key={res.slug}>
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
                          height: "385px",
                          borderRadius: "10px 10px 0px 0px",
                        }}
                        src={res.gambar}
                        alt={res.nama}
                      />
                      <Stack sx={{ px: 2, gap: 1 }}>
                        <Poppins
                          sx={{
                            color: "#000000",
                            fontSize: "21px",
                            fontWeight: 600,
                          }}
                        >
                          {res.nama}
                        </Poppins>
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
                          onClick={() => func.handleDetails(res.slug)}
                          sx={{ width: "40%", borderRadius: "10px" }}
                        >
                          {res.harga}{" "}
                          {value.loading === true &&
                            value.selectedId === res.slug && (
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
          <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
            <ThemeProvider theme={themePagination}>
              <Pagination
                sx={{}}
                count={value.totalPage}
                page={value.page}
                onChange={func.handleChangePage}
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
          </Stack>
        </Stack>
      </Container>
      {/* footer */}
      <Footer />
    </HelmetProvider>
  );
}
