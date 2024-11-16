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
              {/* <Poppins sx={{ mt: { xs: 2, md: 0 }, textAlign: "justify" }}>
                {value.sejarah.deskripsi}
              </Poppins> */}

              <span
                style={{
                  textAlign: "justify",
                  fontFamily: "Poppins",
                }}
                dangerouslySetInnerHTML={{
                  __html: value.sejarah["deskripsi 1"],
                }}
              />
              {/* <Poppins sx={{ mt: 2, textAlign: "justify" }}>
                Pada masa penjajahan Belanda, Desa Biringkanaya menjadi salah
                satu pusat perlawanan terhadap penjajah. Masyarakat desa, yang
                sebagian besar adalah petani, ikut berjuang melawan penindasan
                dengan berbagai cara, termasuk menyembunyikan para pejuang
                kemerdekaan di hutan sekitar desa. Semangat gotong royong yang
                kuat di antara warga desa menjadi kekuatan utama dalam bertahan
                menghadapi masa-masa sulit tersebut.
              </Poppins> */}
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
            {/* <Poppins sx={{ textAlign: "justify" }}>
              Setelah kemerdekaan Indonesia, Desa Biringkanaya mulai berkembang
              pesat. Perkebunan, pertanian, dan perdagangan menjadi sektor utama
              perekonomian desa. Pada tahun 1932, desa ini diresmikan secara
              administratif sebagai bagian dari Kabupaten Maros, dengan struktur
              pemerintahan desa yang lebih terorganisir.
            </Poppins>
            <Poppins sx={{ textAlign: "justify" }}>
              Seiring berjalannya waktu, Desa Biringkanaya terus mengalami
              perkembangan. Pembangunan infrastruktur, peningkatan layanan
              pendidikan, dan pengembangan ekonomi berbasis potensi lokal
              menjadi fokus utama pemerintah desa. Masyarakatnya yang ramah dan
              kental dengan budaya gotong royong, hingga kini tetap
              mempertahankan nilai-nilai tradisional sambil terus berinovasi
              untuk masa depan yang lebih baik.
            </Poppins> */}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
