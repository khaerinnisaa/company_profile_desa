import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { Poppins } from "../typography/Poppins";
import "./styles.css";

export default function Header({
  title,
  description,
  icon,
  mt,
  imageWidth,
  py,
}) {
  return (
    <Box>
      <Stack
        sx={{
          width: { xs: "100%", md: "93%" },
          backgroundColor: "#0D4581",
          borderRadius: { xs: "0px", md: "0px 50px 317px 0px" },
          height: {
            xs: "auto",
            // md: "500px",
          },
          py: { xs: 4, md: 8 },
          mt: { xs: 0, md: mt },
          background: {
            xs: "#0D4581",
            md: `linear-gradient(123.52deg, #0D4581 55.27%, #FFFFFF 179.96%)`,
          },
          minHeight: { xs: "none", md: "500px" },
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ width: { xs: "100%", md: "90%" }, margin: "auto" }}
        >
          <Grid
            size={{ xs: 12, md: 6, lg: 6 }}
            sx={{ margin: "auto", pl: { xs: 0, md: 3 } }}
          >
            <Poppins
              sx={{
                fontSize: { xs: "30px", md: "40px", lg: "40px" },
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: { xs: "unset", md: "58px" },
                textAlign: { xs: "center", md: "unset" },
              }}
            >
              {title}
            </Poppins>
            <Poppins
              sx={{
                width: { xs: "90%", md: "100%" },
                color: "#FFFFFF",
                mt: 2,
                textAlign: { xs: "justify", md: "justify" },
                margin: "20px auto 0 auto",
                // back
              }}
            >
              {description}
            </Poppins>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 5 }} sx={{ margin: "auto" }}>
            <img
              className="icon"
              src={icon}
              alt={title}
              style={{ width: imageWidth }}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
