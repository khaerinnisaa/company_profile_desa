import React from "react";
import { Box, Stack } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import "./style.css";
import CircleIcon from "@mui/icons-material/Circle";
import { Poppins } from "../../../components/typography/Poppins";
import PendudukLogic from "../../../app/statistik/penduduk/PendudukLogic";

// Dynamically import ApexCharts to avoid SSR issues
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function JenisKelamin() {
  const { value } = PendudukLogic();
  const data = [
    {
      label: "Laki laki",
      total: 33,
    },
    {
      label: "Perempuan",
      total: 33,
    },
  ];

  // Hanya mengambil angka dari total untuk series
  const series = value.jenisKelamin.map((res) => res.total);

  // Pastikan label adalah string
  const labels = value.jenisKelamin.map((item) => item.label);

  const options = {
    chart: {
      type: "donut",
      background: "#214D95",
      fontFamily: "Poppins",
    },
    colors: ["#FF928A", "#8979FF"],
    labels: labels,
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "35px",
          labels: {
            show: true,
            name: {
              color: "#fff",
            },
            value: {
              color: "#fff",
            },
          },
        },
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#214D95",
        borderRadius: "10px",
        py: 2,
        // borderTopLeftRadius: "10px",
        position: "relative",
      }}
    >
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={400}
      />
      <Stack
        sx={{
          // display: "flex",
          // flexDirection: "row",
          gap: 2,
          px: 2,
        }}
      >
        <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <CircleIcon sx={{ color: "#FF928A" }} />
          <Poppins color="#fff">Laki laki</Poppins>
        </Stack>
        <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <CircleIcon sx={{ color: "#8979FF" }} />
          <Poppins color="#fff">Perempuan</Poppins>
        </Stack>
      </Stack>
    </Box>
  );
}
