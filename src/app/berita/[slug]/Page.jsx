import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { Poppins } from "../../../components/typography/Poppins";
import {
  Card,
  CircularProgress,
  Container,
  Stack,
  Toolbar,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAppContext } from "../../../contexts/AppContext";
import { fetchDataPublic } from "../../../service/api";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function BeritaPage({}) {
  const { setLoadingRoute, desa } = useAppContext();
  const router = useNavigate();
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBeritaData() {
      try {
        fetchDataPublic(`/public/news/${slug}`).then((res) => {
          setNews(res.data);
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
  }, [slug]);

  const getData = async () => {
    try {
      fetchDataPublic(`/public/latest-news/${slug}?limit=${7}`).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // ketika wisata d klik
  const handleDetail = (slug) => {
    router(`/berita/${slug}`);
    setLoadingRoute(true);
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
    <HelmetProvider>
      {/* metadata */}
      <Helmet>
        <title>Berita | {desa}</title>
        <meta name="description" content={news?.title} />
        <meta name="keywords" content={news?.content} />
        {/* Open Graph Metadata */}
        <meta property="og:title" content={news?.title} />
        <meta property="og:description" content={news?.content} />
        <meta property="og:image" content={news?.images[0]} />
        <meta
          property="og:url"
          content={`https://godesaku.id/berita/${news?.slug}`}
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <Toolbar />
      <Container maxWidth="lg">
        {/* Detail berita */}
        <Stack sx={{ gap: 2 }}>
          {news && (
            <>
              <Stack>
                <Poppins sx={{ mt: 3, fontSize: "30px", fontWeight: 600 }}>
                  {news.title}
                </Poppins>
                <Poppins>
                  {news.day_published} / {news.published}
                </Poppins>
              </Stack>
              {/* Image */}
              <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
              >
                {news.images &&
                  news.images.map((res, i) => (
                    <SwiperSlide key={i} style={{}}>
                      <img
                        style={{
                          width: "100%", // Mengisi seluruh lebar kontainer
                          height: "488px", // Sesuaikan tinggi di berbagai tampilan
                          borderRadius: "10px",
                          objectFit: "cover", // Memastikan gambar menutupi kontainer
                        }}
                        src={res}
                        alt="images"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <span
                style={{
                  textAlign: "justify",
                  marginTop: "20px",
                  fontFamily: "Poppins",
                }}
                dangerouslySetInnerHTML={{
                  __html: news.content,
                }}
              />
            </>
          )}
          {/* Berita terbaru */}
          <Card
            sx={{
              mt: 6,
              alignSelf: "center",
              width: { xs: "319px", md: "921px" },
              border: "1px solid rgba(0, 0, 0, 0.32)",
              borderRadius: "22px",
            }}
          >
            <Poppins
              sx={{
                fontFamily: "myFont",
                fontSize: "30px",
                fontWeight: 600,
                opacity: "0.7",
                paddingY: 2,
                textAlign: "center",
                backgroundColor: "#EDEDED",
              }}
            >
              Berita Terbaru
            </Poppins>
            <Stack sx={{ my: 2 }}>
              {data &&
                data.map((item) => (
                  <Stack
                    sx={{
                      width: "85%",
                      margin: "auto",
                    }}
                    key={item.slug}
                    onClick={() => handleDetail(item.slug)}
                  >
                    <Poppins
                      sx={{
                        fontFamily: "myFont",
                        fontWeight: 600,
                        mt: 2,
                        cursor: "pointer",
                        textAlign: "justify",
                      }}
                    >
                      {item.title}
                    </Poppins>
                    <Poppins sx={{ fontFamily: "myFont" }}>
                      {item.published}
                    </Poppins>
                  </Stack>
                ))}
            </Stack>
          </Card>
        </Stack>
      </Container>
      <Footer mt={{ xs: 4, md: 10 }} />
    </HelmetProvider>
  );
}
