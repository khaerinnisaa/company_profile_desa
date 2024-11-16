import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { Poppins } from "../../../components/typography/Poppins";
import Pagination from "@mui/material/Pagination";
import {
  Card,
  CircularProgress,
  Container,
  Grid2,
  PaginationItem,
  Stack,
  ThemeProvider,
  Toolbar,
  // Pagination,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination as SwiperPagination,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { themePagination } from "../../../components/pagination/Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { fetchDataPublic } from "../../../service/api";
import { useAppContext } from "../../../contexts/AppContext";

export default function WisataPage({}) {
  const { setLoadingRoute, limitText } = useAppContext();
  const router = useNavigate();
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(6);
  const [totalPage, setTotalPage] = useState();
  const [totalItem, setTotalItem] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBeritaData() {
      try {
        fetchDataPublic(`/public/travel-articles/${slug}`).then((res) => {
          setTour(res.data);
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setLoadingRoute(false);
      }
    }
    fetchBeritaData();
    getData();
  }, [slug, page, perpage, totalPage, totalItem]);

  const getData = async () => {
    try {
      fetchDataPublic(
        `/public/travel-articles-except/${slug}?page=${page}&perpage=${perpage}`
      ).then((res) => {
        setData(res.data);
        setPage(res.meta.page);
        setPerpage(res.meta.perpage);
        setTotalPage(res.meta.total_page);
        setTotalItem(res.meta.total_item);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // ketika wisata d klik
  const handleDetail = (slug) => {
    router(`/potensi/${slug}`);
    setLoadingRoute(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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

  console.log({ tour });

  return (
    <>
      <Navbar />
      <Toolbar />
      <Container maxWidth="lg">
        {/* Detail berita */}
        <Stack sx={{}}>
          {tour && (
            <>
              <Stack>
                <Poppins sx={{ mt: 3, fontSize: "30px", fontWeight: 600 }}>
                  {tour.title}
                </Poppins>
                {/* <Poppins>{tour.}</Poppins> */}
              </Stack>
              {/* Image */}
              <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, SwiperPagination, Mousewheel, Keyboard]}
                className="mySwiper"
              >
                {tour.assets &&
                  tour.assets.map((res,i) => {
                    return (
                      <SwiperSlide key={i} style={{}}>
                        {res.type === "image" ? (
                          <img
                            style={{
                              width: "100%", // Mengisi seluruh lebar kontainer
                              height: "444px", // Sesuaikan tinggi di berbagai tampilan
                              borderRadius: "10px",
                              objectFit: "cover", // Memastikan gambar menutupi kontainer
                            }}
                            src={res.url}
                            alt="images"
                          />
                        ) : (
                          <video
                            style={{
                              width: "100%",
                              height: "444px",
                              borderRadius: "10px",
                              objectFit: "cover",
                            }}
                            controls
                            preload="none"
                            poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-GwBWO82SDhf6q-IDxzTm06rATH45qELJyw&s"
                          >
                            <source src={res.url} type="video/mp4" />
                            {/* <track
                            src="/path/to/captions.vtt"
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                          /> */}
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
              <span
                style={{
                  textAlign: "justify",
                  marginTop: "20px",
                  fontFamily: "Poppins",
                }}
                dangerouslySetInnerHTML={{
                  __html: tour.content,
                }}
              />
            </>
          )}
          {/* list wisata */}
          <Stack sx={{ mt: 2 }}>
            <Grid2 container spacing={2} mt={2}>
              {data &&
                data.map((res) => {
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
                            md: "100%",
                          },
                          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDetail(res.slug)}
                      >
                        {res.assets[0].type === "image" ? (
                          <img
                            style={{
                              width: "100%",
                              height: "250px",
                              borderRadius: "10px 10px 0px 0px",
                              objectFit: "cover",
                            }}
                            src={res.assets[0].url}
                            alt={res.title}
                          />
                        ) : (
                          <video
                            style={{
                              width: "100%",
                              height: "250px",
                              borderRadius: "10px 10px 0px 0px",
                              objectFit: "cover",
                            }}
                            controls
                            preload="none"
                            poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-GwBWO82SDhf6q-IDxzTm06rATH45qELJyw&s"
                          >
                            <source src={res.assets[0].url} type="video/mp4" />
                            {/* <track
                            src="/path/to/captions.vtt"
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                          /> */}
                            Your browser does not support the video tag.
                          </video>
                        )}
                        <Poppins
                          sx={{
                            width: "90%",
                            fontSize: "16px",
                            fontWeight: 700,
                            margin: "auto",
                            py: 2,
                          }}
                        >
                          {res.title}
                        </Poppins>
                        <Poppins sx={{ width: "90%", margin: "auto", pb: 2 }}>
                          {limitText(res.content, 100)}
                        </Poppins>
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
                  count={totalPage}
                  page={page}
                  onChange={handleChangePage}
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
        </Stack>
      </Container>
      <Footer mt={{ xs: 4, md: 10 }} />
    </>
  );
}
