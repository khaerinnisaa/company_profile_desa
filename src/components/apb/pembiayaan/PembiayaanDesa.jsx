// components/BelanjaDesaChart.js
import ReactApexChart from "react-apexcharts";
import React from "react";
import { Box, Stack } from "@mui/material";
import { Poppins } from "../../../components/typography/Poppins";
import CircleIcon from "@mui/icons-material/Circle";

// Dynamically import ApexCharts to avoid SSR issues
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PembiayaanDesa({category,data}) {
  // const data = [
  //   { id: 1, name: "Penerimaan", total: 3422321 },
  //   { id: 2, name: "Pengeluaran", total: 356648 },
  // ];

  // // Map data to extract categories and series data
  // const pembiayaan = data.map((item) => item.name);
  // const jumlahPembiayaan = data.map((item) => item.total);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      background: "#214D95",
      // border: "none",
      toolbar: {
        show: false, // Remove download or zoom toolbar
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true, // Show data labels on bars
      style: {
        colors: ["#fff"], // White labels
        fontFamily: "Poppins",
      },
    },
    stroke: {
      show: false,
      width: 2,
    },
    xaxis: {
      categories: category,
      labels: {
        style: {
          colors: "#fff", // Label warna putih
          fontSize: "12px",
          fontFamily: "Poppins",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff", // Warna label sumbu Y
          fontFamily: "Poppins",
          fontSize: "14px",
        },
      },
    },
    fill: {
      opacity: 1,
      colors: ["#8979FF"], // Warna ungu untuk bars
    },
    tooltip: {
      theme: "dark",
      style: {
        fontFamily: "Poppins",
      },
    },
  };

  const series = [
    {
      name: "Jumlah",
      data: data, // Data jumlah belanja
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#214D95",
        mt: 1,
        borderRadius: "10px",
        py: 2,
        borderTopLeftRadius: "10px",
      }}
    >
      <ReactApexChart options={options} series={series} type="bar" height={300} />
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
          // mt: -2,
        }}
      >
        <Stack sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
        <CircleIcon sx={{ color: "#8979FF", fontSize: "16px" }} />
          <Poppins color="#fff" sx={{ fontSize: "12px" }}>
            Jumlah
          </Poppins>
        </Stack>
      </Stack>
    </Box>
  );
}
