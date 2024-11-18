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
// import { useRouter, usePathname } from "next/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Poppins } from "../typography/Poppins";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./style.css";
import { useAppContext } from "../../contexts/AppContext";

function Navbar() {
  const { loadingRoute, setLoadingRoute } = useAppContext();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const router = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [anchorStatistik, setAnchorStatistik] = React.useState(null); // statistik
  const open = Boolean(anchorStatistik); // statistik

  // statistik start
  const handleClick = (event) => {
    setAnchorStatistik(event.currentTarget);
  };
  const handleCloseStatistik = () => {
    setAnchorStatistik(null);
  };

  const handleClikStatistik = async (item) => {
    setAnchorStatistik(null);
    setAnchorElNav(null);
    if (item !== "") {
      setLoading(true);
      router(item);
    }
  };
  // statistik end

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // ketika menu navbar d klik
  const handleOnclickMenu = async (item) => {
    setAnchorElNav(null);

    if (item !== "") {
      setLoading(true);
      router(item);
    } else {
      try {
        router("/");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#0D4581",
        boxShadow: "0px 6px 4px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="lg">
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
              {/* Statistik */}
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
                sx={{
                  alignSelf: "center",
                  textTransform: "none",
                  height: "25px",
                  color: location.pathname.startsWith("/statistik")
                    ? "#FFF300"
                    : "#FFFFFF",
                  fontWeight: 400,
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  borderRadius: "0px",
                  borderBottom: location.pathname.startsWith("/statistik")
                    ? "2px solid #FFF300"
                    : "none",
                  "&:hover": {
                    color: "#FFF300",
                    borderBottom: "2px solid #FFF300",
                  },
                }}
              >
                Statistik
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorStatistik}
                open={open}
                onClose={handleCloseStatistik}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {statistik.map((res) => {
                  const activeRoutes = ["/statistik"];
                  const isActive =
                    res.router === location.pathname ||
                    (location.pathname.startsWith(res.router) &&
                      activeRoutes.includes(res.router));
                  return (
                    <MenuItem
                      className="menuDesktop"
                      key={res.id}
                      sx={{
                        fontFamily: "Poppins",
                        color: isActive ? "#FFF300" : "black",
                        backgroundColor: isActive ? "#0D4581" : "white",
                        "&:hover": {
                          // color: "#FFF300",
                          backgroundColor: "#0D4581",
                        },
                      }}
                      onClick={() => handleClikStatistik(res.router)}
                    >
                      {res.title}
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          </Box>
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
            <div style={{ marginTop: "5px" }}>
              <img
                src={Logo}
                style={{ width: "50px", height: "50px" }}
                alt="Picture of the author"
                onClick={() => router("/")}
              />
            </div>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon sx={{ fontSize: "28px" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {NavbarMenu.map((page) => {
                  const activeRoutes = ["/berita", "/potensi", "/produk"];

                  const isActive =
                    page.router === location.pathname ||
                    (location.pathname.startsWith(page.router) &&
                      activeRoutes.includes(page.router));
                  return (
                    <MenuItem
                      className="menuMobile"
                      key={page.id}
                      onClick={() => handleOnclickMenu(page.router)}
                      // sx={{ backgroundColor: "#0D4581" }}
                    >
                      <Poppins
                        textAlign="center"
                        sx={{
                          color: isActive ? "#FFF300" : "#FFF",
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {page.title}{" "}
                        {/* {loading === true && page.router === location.pathname && (
                          <CircularProgress
                            size={"20px"}
                            sx={{ color: "#FFFFFF" }}
                          />
                        )} */}
                      </Poppins>
                    </MenuItem>
                  );
                })}
                {/* statistik */}
                <Stack sx={{ mt: 1 }} onClick={handleClick}>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                      textTransform: "none",
                      height: "25px",
                      color: location.pathname.startsWith("/statistik")
                        ? "#FFF300"
                        : "#FFFFFF",
                      fontWeight: location.pathname.startsWith("/statistik")
                        ? 600
                        : 400,
                      fontSize: "16px",
                      fontFamily: "Poppins",
                      borderRadius: "0px",
                      px: 2,
                      mb: 2,
                      "&:hover": {
                        color: "#FFF300",
                        fontWeight: 600,
                      },
                      alignSelf: "start",
                    }}
                  >
                    Statistik
                  </Button>
                </Stack>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorStatistik}
                  open={open}
                  onClose={handleCloseStatistik}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {statistik.map((res) => {
                    const activeRoutes = ["/statistik"];

                    const isActive =
                      res.router === location.pathname ||
                      (location.pathname.startsWith(res.router) &&
                        activeRoutes.includes(res.router));
                    return (
                      <MenuItem
                        className="menuMobile"
                        key={res.id}
                        sx={{
                          fontFamily: "Poppins",
                          color: {
                            xs: isActive ? "#FFF300" : "#FFFFFF",
                            md: isActive ? "#FFF300" : "#000000",
                          },
                          "&:hover": {
                            color: "#FFF300",
                          },
                        }}
                        onClick={() => handleClikStatistik(res.router)}
                      >
                        {res.title}{" "}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Menu>
            </div>
          </Box>
        </Toolbar>
      </Container>
      {loading === true && <LinearProgress />}
      {loadingRoute === true && <LinearProgress />}
    </AppBar>
  );
}
export default Navbar;
