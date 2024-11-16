// components/BelanjaDesaChart.js
import React from "react";
import { Box, Stack } from "@mui/material";
import PendudukLogic from "../../../app/statistik/penduduk/PendudukLogic";
import ReactApexChart from "react-apexcharts";

// Dynamically import ApexCharts to avoid SSR issues
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Pendidikan() {
  const { value } = PendudukLogic();

  // const data = [
  //   { id: 1, name: "Strata III", total: 10 },
  //   { id: 2, name: "Strata II", total: 15 },
  //   { id: 3, name: "Diploma IV/Strata I", total: 11 },
  //   { id: 4, name: "Akademi/ DIploma III/ Sarjana Muda", total: 10 },
  //   { id: 5, name: "Diploma I/II", total: 36 },
  //   { id: 6, name: "SLTA/Sederajat", total: 58 },
  //   { id: 7, name: "SLTP/Sederajat", total: 29 },
  //   { id: 8, name: "Tamat SD/ Sederajat", total: 83 },
  //   { id: 9, name: "Belum Tamat SD /Sederajat", total: 41 },
  //   { id: 10, name: "Tidak/ Belum sekolah", total: 31 },
  // ];

  // Map data to extract categories and series data
  const category = value.pendidikan.map((item) => item.name);
  const total = value.pendidikan.map((item) => item.total);

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
        horizontal: true,
        columnWidth: "80%",
        endingShape: "rounded",
        dataLabels: {
          // position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true, // Show data labels on bars
      // offsetX: 15,
      // offsetY: -15,
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
      position: "bottom",
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
        // offsetY: 10,
        // maxWidth: 160,
        maxWidth: 300,
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
        // breakpoint: 1131, // Batas breakpoint untuk layar kecil
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
                return value.length > 1 ? value.slice(0, 1) + "..." : value;
              },
            },
          },
          yaxis: {
            labels: {
              align: "left",
              style: {
                colors: "#fff", // Warna label sumbu Y
                fontFamily: "Poppins",
                fontSize: "14px",
              },
              // offsetY: 10,
              maxWidth: 80,
              formatter: function (value) {
                return value.length > 0 ? value.slice(0, 10) + "..." : value;
              },
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
                return value.length > 10 ? value.slice(0, 100) : value;
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
      {/* <Stack
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
            2022
          </Poppins>
        </Stack>
      </Stack> */}
    </Box>
  );
}
