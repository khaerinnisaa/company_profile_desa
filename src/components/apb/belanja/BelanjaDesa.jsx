// components/BelanjaDesaChart.js
import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import { Poppins } from "../../../components/typography/Poppins";
import CircleIcon from "@mui/icons-material/Circle";
import { TroubleshootOutlined } from "@mui/icons-material";

// Dynamically import ApexCharts to avoid SSR issues
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BelanjaDesa({category,total}) {
  // Data belanja desa
  const data = [
    { id: 1, name: "Penyelenggaraan pemerintah desa", total: 12000000 },
    { id: 2, name: "Pembangunan desa", total: 102345 },
    { id: 3, name: "Pembinaan kemasyarakatan", total: 1234 },
    { id: 4, name: "Pemberdayaan masyarakat", total: 123 },
    {
      id: 5,
      name: "Penanggulangan bencana,Dll",
      total: 102345,
    },
  ];

  // const labels = data.map((res) => res.name);
  // const total = data.map((res) => res.total);
  const series = [
    {
      name: "jumlah",
      data: total,
    },
  ];

  // Konfigurasi chart
  const options = {
    chart: {
      type: "bar",
      background: "#214D95", // Background color of the chart
      borderRadius: "20px",
      toolbar: {
        show: false, // Remove download or zoom toolbar
      },
    },
    plotOptions: {
      bar: {
        horizontal: true, // Make the bars horizontal
        barHeight: "80%", // Adjust bar height
        // borderRadius: 5, // Rounded edges on bars
      },
    },
    dataLabels: {
      enabled: true, // Show data labels on bars
      style: {
        colors: ["#fff"], // White labels
      },
    },
    xaxis: {
      categories: category, // Sumbu Y untuk kategori belanja
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
        align: "left",
        style: {
          colors: "#fff", // Warna label sumbu X
          fontFamily: "Poppins",
          fontSize: "14px",
        },
        formatter: function (value) {
          return value.length > 0 ? value.slice(0, 25) + "..." : value;
        }, // Potong label jika terlalu panjang
      },
    },
    grid: {
      // borderColor: "#5DADE2", // Warna garis grid
      // border: "10px solid #fff",
    },
    fill: {
      colors: ["#8979FF"], // Warna ungu untuk bars
    },
    tooltip: {
      theme: "dark",
      style: {
        fontFamily: "Poppins",
      },
      x: {
        show: true,
        formatter: function (value) {
          return value.length > 0 ? value.slice(0, 1000) : value;
        },
      },
      fixed: {
        enabled: true,
        position: "topLeft",
        offsetX: 0,
        offsetY: 0,
      },
    },
    //  responsivitas
    responsive: [
      {
        breakpoint: 480, // Batas breakpoint untuk layar kecil
        options: {
          chart: {
            height: 300, // Ubah tinggi chart pada mobile
          },
          xaxis: {
            labels: {
              rotate: -45, // Memutar label agar tidak tumpang tindih
              rotateAlways: true,
              minHeight: 80, // Memberikan ruang lebih untuk label yang diputar
              style: {
                fontSize: "10px", // Ukuran font lebih kecil pada layar mobile
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
                return value.length > 5 ? value.slice(0, 13) + "..." : value;
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
            },
            fixed: {
              enabled: false,
              position: "bottomRight",
              offsetX: -1000,
              offsetY: -100000,
            },
          },
          plotOptions: {
            bar: {
              barHeight: "80%", // Tinggi bar lebih kecil pada layar mobile
            },
          },
        },
      },
    ],
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
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={300}
      />
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
            Jumlah
          </Poppins>
        </Stack>
      </Stack>
    </Box>
  );
}
