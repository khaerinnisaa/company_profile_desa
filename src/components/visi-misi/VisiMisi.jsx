import { Box, Stack } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { Poppins } from "../typography/Poppins";
import "./style.css";
import ProfilLogic from "../../app/profil/ProfilLogic";

export default function VisiMisi({ mt }) {
  const { value } = ProfilLogic();
  return (
    <Box sx={{}}>
      <Stack
        sx={{
          width: { xs: "100%", md: "93%" },
          backgroundColor: "#0D4581",
          borderRadius: { xs: "0px", md: "60px 0px 0px 317px" },
          height: {
            xs: "auto",
            md: "500px",
          },
          py: { xs: 4, md: 0 },
          mt: mt,
          float: "right",
          background: {
            xs: "#0D4581",
            md: `linear-gradient(-123.52deg, #0D4581 55.27%, #FFFFFF 179.96%)`,
          },
        }}
      >
        <Grid
          // minWidth={"100vw"}
          container
          spacing={2}
          sx={{ width: { xs: "100%", md: "90%" }, margin: "auto" }}
        >
          <Grid size={{ xs: 12, md: 5 }} sx={{ margin: "auto" }}>
            {/* tampilan desktop */}
            <img
              src={value.data.logo}
              alt={"visi misi"}
              style={{
                width: "82%",
                height: "203px",
                objectFit: "cover",
                float: "right",
              }}
              className="desktopOnly"
            />
            {/* tampilan mobile */}
            <Stack
              sx={{
                alignItems: {
                  xs: "center",
                  md: "unset",
                },
                display: { xs: "flex", md: "none" },
              }}
            >
              <img
                className="logoMobile"
                src={value.data.logo}
                alt={"visi misi"}
                style={{ width: "80%", height: "203px", objectFit: "cover" }}
              />
            </Stack>

            <Stack
              sx={{
                width: { xs: "100%", md: "82%" },
                float: { xs: "none", md: "right" },
                px: { xs: 3, md: 0 },
              }}
              className="address"
            >
              <Poppins
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: "16px", md: "21px" },
                  fontWeight: 600,
                }}
              >
                Pemerintah {value.data.nama}
              </Poppins>
              <Poppins
                sx={{ color: "#FFFFFF", fontSize: { xs: "16px", md: "21px" } }}
              >
                Kec. {value.data.kecamatan}, {value.data.kabupaten}
              </Poppins>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ mt: { xs: 2, md: 0 } }}>
            {/* visi */}
            <Poppins
              sx={{
                fontSize: { xs: "26px", md: "40px" },
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: { xs: "unset", md: "58px" },
                textAlign: { xs: "center", md: "unset" },
              }}
            >
              Visi
            </Poppins>
            <Poppins
              sx={{
                width: { xs: "100%", md: "100%" },
                color: "#FFFFFF",
                textAlign: { xs: "justify", md: "unset" },
                margin: "0px auto 0px auto",
                px: { xs: 1.5, md: 0 },
              }}
            >
              {value.visiMisi.visi}
            </Poppins>
            {/* misi */}
            <Poppins
              sx={{
                fontSize: { xs: "26px", md: "40px" },
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: { xs: "unset", md: "58px" },
                textAlign: { xs: "center", md: "unset" },
                mt: 4,
              }}
            >
              Misi
            </Poppins>
            <Poppins
              sx={{
                width: { xs: "100%", md: "100%" },
                color: "#FFFFFF",
                textAlign: { xs: "justify", md: "unset" },
                margin: "0px auto 0 auto",
                px: { xs: 1.5, md: 0 },
              }}
            >
              {value.visiMisi.misi}
            </Poppins>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
