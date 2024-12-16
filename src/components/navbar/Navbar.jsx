import * as React from "react";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  MenuItem,
  Button,
  Stack,
  LinearProgress,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavbarMenu, statistik } from "../../values/Constant";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Poppins } from "../typography/Poppins";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./style.css";
import { useAppContext } from "../../contexts/AppContext";

function Navbar() {
  const { loadingRoute, setLoadingRoute } = useAppContext();
  const router = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [openNav, setOpenNav] = React.useState(false);
  const [statistikOpen, setStatistikOpen] = React.useState(false); // open statistik
  const [statistikMobile, setStatistikMobile] = React.useState(false);
  const dropdownRef = React.useRef(null); // Reference untuk dropdown

  const handleOpenNav = () => {
    setOpenNav(!openNav);
  };

  // ketika menu navbar d klik
  const handleOnclickMenu = async (item) => {
    setOpenNav(false);
    setStatistikOpen(false);

    if (item !== "" && item !== location.pathname) {
      setLoading(true);
      router(item);
    } else {
      try {
        // router("/");
      } catch (error) {
        alert(error);
      }
    }
  };

  // statistik start
  const handleClick = () => {
    setStatistikOpen(!statistikOpen);
    setStatistikMobile(!statistikMobile);
  };
  // statistik end

  // Event listener untuk mendeteksi klik di luar dropdown
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setStatistikOpen(false); // Tutup dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#0D4581",
        boxShadow: "0px 6px 4px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="lg" sx={{ display: { xs: "none", md: "block" } }}>
        <Toolbar disableGutters>
          {/* tampilan desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <img
                src={Logo}
                style={{ width: "103px", height: "50px", cursor: "pointer" }}
                alt="Picture of the author"
                onClick={() => router("/")}
              />
            </Box>

            {/* navbar tampilan desktop */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                width: { xs: "none", md: "85%", lg: "80%" },
                justifyContent: "space-between",
                // paddingTop: "15px",
              }}
            >
              {NavbarMenu.map((page) => {
                const activeRoutes = ["/berita", "/potensi", "/produk"];

                const isActive =
                  page.router === location.pathname ||
                  (location.pathname.startsWith(page.router) &&
                    activeRoutes.includes(page.router));
                return (
                  <Poppins
                    key={page.id}
                    onClick={() => handleOnclickMenu(page.router)}
                    sx={{
                      cursor: "pointer",
                      height: "25px",
                      color: isActive ? "#FFF300" : "#FFFFFF",
                      fontWeight: isActive ? 600 : 400,
                      borderBottom: isActive ? "2px solid #FFF300" : "none",
                      "&:hover": {
                        color: "#FFF300",
                        borderBottom: "2px solid #FFF300",
                      },
                      alignSelf: "center",
                    }}
                  >
                    {page.title}
                    {/* {loading === true && page.router === location.pathname && (
                      <CircularProgress
                        size={"20px"}
                        sx={{ color: "#FFFFFF" }}
                      />
                    )} */}
                  </Poppins>
                );
              })}
              <Stack ref={dropdownRef}>
                {/* Statistik */}
                <button className="statistik" onClick={handleClick}>
                  <Poppins sx={{ display: "flex", justifyContent: "center" }}>
                    {/* {value.selectedCategory || "Pilih Kategori"} */}
                    Statistik
                    {statistikOpen === true ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}
                  </Poppins>
                </button>
                {/* menu statistik */}
                {statistikOpen === true && (
                  <Stack className="menuStatistik">
                    {statistik.map((res) => {
                      const activeRoutes = ["/statistik"];
                      const isActive =
                        res.router === location.pathname ||
                        (location.pathname.startsWith(res.router) &&
                          activeRoutes.includes(res.router));

                      return (
                        <Poppins
                          key={res.id}
                          onClick={() => handleOnclickMenu(res.router)}
                          sx={{
                            color: isActive ? "#fff300" : "#000",
                            padding: "8px 10px",
                            cursor: "pointer",
                            backgroundColor: isActive
                              ? "#0D4581"
                              : "transparent",
                            "&:hover": {
                              backgroundColor: "#0D4581",
                              color: "#fff300",
                            },
                          }}
                        >
                          {res.title}
                        </Poppins>
                      );
                    })}
                  </Stack>
                )}
              </Stack>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      {/*tampilan mobile */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* logo tampilan mobile */}
        <div style={{ marginTop: "5px", marginLeft: "16px" }}>
          <img
            src={Logo}
            style={{ width: "50px", height: "50px" }}
            alt="Picture of the author"
            onClick={() => router("/")}
          />
        </div>
        <div style={{ marginRight: "16px" }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNav}
          >
            <MenuIcon sx={{ fontSize: "28px" }} />
          </IconButton>
        </div>
        {openNav === true && (
          <Stack
            className="nav-mobile"
            sx={{ mt: statistikMobile === true ? "720px" : "410px" }}
          >
            {NavbarMenu.map((res) => {
              const activeRoutes = ["/berita", "/potensi", "/produk"];

              const isActive =
                res.router === location.pathname ||
                (location.pathname.startsWith(res.router) &&
                  activeRoutes.includes(res.router));
              return (
                <Poppins
                  key={res.id}
                  onClick={() => handleOnclickMenu(res.router)}
                  sx={{
                    color: isActive ? "#FFF300" : "#fff",
                    p: "10px 15px",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {res.title}
                </Poppins>
              );
            })}
            {/* statistik */}
            <button className="statistik-mobile" onClick={handleClick} sx={{}}>
              <Poppins
                sx={{
                  display: "flex",
                  color: location.pathname.startsWith("/statistik")
                    ? "#FFF300"
                    : "#FFFFFF",
                  fontWeight: location.pathname.startsWith("/statistik")
                    ? 600
                    : 400,
                }}
              >
                Statistik{" "}
                {statistikOpen === true ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </Poppins>
            </button>
            {/* menu statistik */}
            {statistikMobile === true && (
              <Stack>
                {statistik.map((res) => {
                  const activeRoutes = ["/statistik"];

                  const isActive =
                    res.router === location.pathname ||
                    (location.pathname.startsWith(res.router) &&
                      activeRoutes.includes(res.router));
                  return (
                    <Poppins
                      key={res.id}
                      onClick={() => handleOnclickMenu(res.router)}
                      sx={{
                        color: isActive ? "#FFF300" : "#fff",
                        p: "10px 15px",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {res.title}
                    </Poppins>
                  );
                })}
              </Stack>
            )}
          </Stack>
        )}
      </Box>

      {loading === true && <LinearProgress />}
      {loadingRoute === true && <LinearProgress />}
    </AppBar>
  );
}
export default Navbar;
