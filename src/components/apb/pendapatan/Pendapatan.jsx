// components/BelanjaDesaChart.js
import ReactApexChart from "react-apexcharts";
import React from "react";
import { Box, Stack } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

// Dynamically import ApexCharts to avoid SSR issues
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Pendapatan() {
  const category = [
    { id: 1, year: 2020 },
    { id: 2, year: 2021 },
    { id: 3, year: 2022 },
    { id: 4, year: 2023 },
    { id: 5, year: 2024 },
  ];
  const data = [
    { id: 1, title: "Pendapatan", total: [6, 11, 4, 9, 12], belanja: 7 },
    { id: 2, title: "Belanja", total: [7, 12, 5, 7, 12] },
  ];

  const series = data.map((res) => {
    return {
      name: res.title,
      data: res.total,
    };
  });

  const options = {
    chart: {
      type: "bar",
      height: 430,
      toolbar: {
        show: false, // Remove download or zoom toolbar
      },
    },
    colors: ["#8979FF", "#FF928A"],
    plotOptions: {
      bar: {
        horizontal: true,
        // dataLabels: {
        //   position: "top",
        // },
      },
    },
    dataLabels: {
      enabled: true,
      // offsetX: 10,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
        fontFamily: "Poppins",
      },
    },
    legend: {
      fontFamily: "Poppins", // Gunakan font Poppins
      // fontSize: "16px", // Ukuran font 16px
      labels: {
        colors: "#fff", // Warna putih untuk title (legend labels)
      },
    },
    stroke: {
      show: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontSize: "12px",
        fontFamily: "Poppins",
      },
    },
    xaxis: {
      categories: category.map((res) => res.year),
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
  };

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
    </Box>
  );
}