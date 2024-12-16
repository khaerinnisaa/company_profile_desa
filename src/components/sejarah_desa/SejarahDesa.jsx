import { Box, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import Icon from "../../assets/history.png";
import "./style.css";
import { Title } from "../typography/Title";
import ProfilLogic from "../../app/profil/ProfilLogic";

export default function Sejarah_desa() {
  const { value } = ProfilLogic();
  return (
    <Box sx={{ clear: "both", py: 6 }}>
      <Container maxWidth="lg">
        <Stack>
          <Title>Sejarah Desa</Title>
          <Grid container spacing={2} sx={{ mt: { xs: 2, md: 4 } }}>
            <Grid size={{ xs: 12, md: 7 }} sx={{}}>
              {/* image tampilan mobile */}
              <Stack sx={{ display: { xs: "flex", md: "none" } }}>
                <img
                  style={{ width: "70%", alignSelf: "center" }}
                  src={Icon}
                  alt="sejarah desa"
                  className="imageMobile"
                />
              </Stack>
              {/* image tampilan mobile end */}
              <span
                style={{
                  textAlign: "justify",
                  fontFamily: "Poppins",
                }}
                dangerouslySetInnerHTML={{
                  __html: value.sejarah["deskripsi 1"],
                }}
              />
            </Grid>
            {/* image tampilan desktop */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack sx={{ display: { xs: "none", md: "flex" } }}>
                <img
                  style={{
                    width: "60%",
                    height: "300px",
                    alignSelf: "center",
                    // objectFit: "cover",
                  }}
                  src={Icon}
                  alt="sejarah desa"
                />
              </Stack>
            </Grid>
            {/* image tampilan desktop end */}
            <span
              style={{
                textAlign: "justify",
                fontFamily: "Poppins",
              }}
              dangerouslySetInnerHTML={{
                __html: value.sejarah["deskripsi 2"],
              }}
            />
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
