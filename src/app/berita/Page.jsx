import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import {
  Box,
  Card,
  Container,
  Grid2,
  Pagination,
  PaginationItem,
  Stack,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import React from "react";
import Icon from "../../assets/icon_header_berita.png";
import { Poppins } from "../../components/typography/Poppins";
import BeritaLogic from "./BeritaLogic";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { themePagination } from "../../components/pagination/Pagination";
import Kalender from "../../components/kalender/Kalender";
import Footer from "../../components/footer/Footer";
import { useAppContext } from "../../contexts/AppContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Page() {
  const { limitText, desa } = useAppContext();
  const { value, func } = BeritaLogic();
  return (
    <HelmetProvider>
      {/* metadata */}
      <Helmet>
        <title>Berita | {desa}</title>
        <meta name="description" content="Menggambarkan berbagai aspek penting dari sebuah desa, seperti jumlah penduduk, luas wilayah, tingkat pendidikan, sektor ekonomi utama, serta infrastruktur yang tersedia." />
        <meta name="keywords" content="berita desa biringkanaya" />
        {/* Open Graph Metadata */}
        <meta property="og:title" content="Berita Desa Biringkanaya" />
        <meta
          property="og:description"
          content="Berita desa biringkanaya"
        />
        <meta
          property="og:image"
          content="https://godesaku.id/logo.png"
        />
        <meta property="og:url" content="https://godesaku.id/berita" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <Toolbar />
      {/* header */}
      <Header
        title={"Berita Desa"}
        description={
          "Menggambarkan berbagai aspek penting dari sebuah desa, seperti jumlah penduduk, luas wilayah, tingkat pendidikan, sektor ekonomi utama, serta infrastruktur yang tersedia. Statistik ini memberikan gambaran menyeluruh tentang kondisi demografis, sosial, dan ekonomi desa, yang berguna untuk perencanaan pembangunan dan pengambilan keputusan."
        }
        icon={Icon}
        mt={4}
        imageWidth={"80%"}
      />
      <Container maxWidth="lg">
        {/* list berita */}
        <Stack sx={{ py: 6 }}>
          <Grid2 container spacing={6} mt={6}>
            {value.data &&
              value.data.map((res) => {
                return (
                  <Grid2
                    key={res.slug}
                    size={{ xs: 12, md: 6, lg: 4 }}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Card
                      sx={{
                        borderRadius: "10px",
                        width: { xs: "90%", md: "382px" },
                        cursor: "pointer",
                        // height: "450px",
                      }}
                      onClick={() => func.handleDetails(res.slug)}
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
                      <Stack
                        sx={{
                          backgroundColor: "#0D4581",
                          float: "right",
                          borderRadius: "10px 0px 10px 0px",
                          display: "flex",
                          flexDirection: "row",
                          px: 2,
                          py: 1,
                          gap: 1,
                          alignSelf: "flex-end",
                        }}
                      >
                        <DateRangeIcon
                          sx={{ color: "#FFFFFF", alignSelf: "center" }}
                        />
                        <Poppins sx={{ color: "#FFFFFF", alignSelf: "center" }}>
                          {res.published}
                        </Poppins>
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
        {/* kalender */}
        <Kalender />
      </Container>
      {/* footer */}
      <Footer />
    </HelmetProvider>
  );
}
