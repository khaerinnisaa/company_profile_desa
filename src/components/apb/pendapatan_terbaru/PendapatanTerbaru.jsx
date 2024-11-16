// components/BelanjaDesaChart.js
import ReactApexChart from "react-apexcharts";
import React from "react";
import { Box, Stack } from "@mui/material";
import { Poppins } from "../../../components/typography/Poppins";
import CircleIcon from "@mui/icons-material/Circle";

// Dynamically import ApexCharts to avoid SSR issues
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PendapatanTerbaru() {
  const data = [
    { id: 1, name: "Pendapatan asli desa", total: 180000000 },
    { id: 2, name: "Transfer", total: 1200000000 },
    { id: 3, name: "Pendapatan lain", total: 72000000 },
  ];

  // Map data to extract categories and series data
  const category = data.map((item) => item.name);
  const total = data.map((item) => item.total);

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
        columnWidth: "80%",
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
        formatter: function (value) {
          return value.length > 1 ? value.slice(0, 11) + "..." : value;
        },
      },
    },
    fill: {
      opacity: 1,
      colors: ["#8979FF"], // Warna ungu untuk bars
    },
    tooltip: {
      theme: "dark",
      style: { fontFamily: "Poppins" },
    },
    responsive: [
      {
        breakpoint: 480, // Batas breakpoint untuk layar kecil
        options: {
          chart: {
            height: 300, // Ubah tinggi chart pada mobile
          },
          xaxis: {
            labels: {
              rotate: 0, // Memutar label agar tidak tumpang tindih
              rotateAlways: false,
              minHeight: 10, // Memberikan ruang lebih untuk label yang diputar
              style: {
                fontSize: "10px", // Ukuran font lebih kecil pada layar mobile
              },
              formatter: function (value) {
                return value.length > 1 ? value.slice(0, 10) + "..." : value;
              },
            },
          },
          yaxis: {
            labels: {
              align: "left",
              style: {
                colors: "#fff", // Warna label sumbu X
                fontFamily: "Poppins",
                fontSize: "14px",
              },
              formatter: function (value) {
                return value.length > 10 ? value.slice(0, 11) + "..." : value;
              }, // Potong label jika terlalu panjang
            },
          },
          tooltip: {
            theme: "dark",
            style: {
              fontFamily: "Poppins",
            },
            x: {
              show: true,
              format: "dd MMM",
              formatter: function (value) {
                return value.length > 100 ? value.slice(0, 1000) + "..." : value;
              },
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Jumlah",
      data: total, // Data jumlah belanja
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
          mt: -2,
        }}
      >
        <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <CircleIcon sx={{ color: "#8979FF", fontSize: "16px" }} />
          <Poppins color="#fff" sx={{ fontSize: "12px" }}>
            Pendapatan
          </Poppins>
        </Stack>
      </Stack>
    </Box>
  );
}
