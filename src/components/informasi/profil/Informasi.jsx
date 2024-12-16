import { Box, Card, Container, Grid2, Stack } from "@mui/material";
import React from "react";
import { Poppins } from "../../typography/Poppins";
import { Title } from "../../typography/Title";
import ProfilLogic from "../../../app/profil/ProfilLogic";

export default function Informasi({ title }) {
  const { value } = ProfilLogic();
  return (
    <Box sx={{ mt: { xs: 6, md: 12 } }}>
      <Container maxWidth="lg">
        <Title>{title}</Title>
        <Grid2 container spacing={2} mt={4}>
          {value.informasi.map((res) => {
            return (
              <Grid2
                key={res.id}
                size={{ xs: 12, md: 4 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Card
                  sx={{
                    width: { xs: "100%", md: "395px" },
                    display: "flex",
                    px: 3,
                    borderRadius: "10px",
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Stack>
                    <img
                      style={{ width: "102px" }}
                      src={res.image}
                      alt={res.title}
                    />
                  </Stack>
                  <Stack sx={{ alignSelf: "center" }}>
                    <Poppins sx={{ fontSize: { xs: "16px", md: "16px" } }}>
                      {res.title}
                    </Poppins>
                    <Poppins
                      sx={{
                        fontSize: { xs: "16px", md: "16px" },
                        color: "#0D4581",
                        fontWeight: 500,
                      }}
                    >
                      {res.total}
                      {/* <span
                        style={{
                          color: "black",
                          fontWeight: 400,
                          marginLeft: "5px",
                        }}
                      >
                        {res.ket}
                      </span> */}
                    </Poppins>
                  </Stack>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      </Container>
    </Box>
  );
}
