import React from "react";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

export const Title = styled(Typography)(({ theme }) => ({
  fontFamily: "Poppins",
  fontWeight: 600,
  color: "#0D4581",
  textAlign: "center",
  fontSize: "30px", // Default untuk mobile
  "@media (min-width: 960px)": {
    fontSize: "40px", // Untuk ukuran desktop
  },
}));
