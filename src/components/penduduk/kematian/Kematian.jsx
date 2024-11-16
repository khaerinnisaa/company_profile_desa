import React from "react";
import { Box, Stack } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import PendudukLogic from "../../../app/statistik/penduduk/PendudukLogic";

// Dynamically import ApexCharts to avoid SSR issues
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Kematian() {
  const { value } = PendudukLogic();
  
  // const data = [
  //   {
  //     id: 1,
  //     year: "2020",
  //     total: [33],
  //   },
  //   {
  //     id: 2,
  //     year: "2021",
  //     total: [84],
  //   },
  //   {
  //     id: 3,
  //     year: "2022",
  //     total: [94],
  //   },
  //   {
  //     id: 4,
  //     year: "2023",
  //     total: [32],
  //   },
  //   {
  //     id: 5,
  //     year: "2024",
  //     total: [22],
  //   },
  // ];

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
      style: {
        colors: ["#fff"],
      },
    },
    xaxis: {
      categories: ["Kematian"],
      labels: {
        style: {
          colors: "#fff", // Label warna putih
          fontSize: "12px",
          fontFamily: "Poppins",
          width: 20,
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: "#fff", // Warna label sumbu Y
          fontFamily: "Poppins",
          fontSize: "14px",
        },
      },
    },
    fill: {
      opacity: 1,
      //   colors: ["#8979FF"], // Warna ungu untuk bars
      colors: ["#8979FF", "#FF928A", "#3CC3DF", "#FFAE4C", "#537FF1"],
    },
    tooltip: {
      theme: "dark",
      style: {
        fontFamily: "Poppins",
      },
    },
    legend: {
      labels: {
        colors: "#fff",
        fontFamily: "Poppins",
      },
      markers: {
        fillColors: ["#8979FF", "#FF928A", "#3CC3DF", "#FFAE4C", "#537FF1"],
      },
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
              rotateAlways: true,
              //   minHeight: 80, // Memberikan ruang lebih untuk label yang diputar
              style: {
                // fontSize: "10px", // Ukuran font lebih kecil pada layar mobile
                // minWidth: 10,
              },
            },
          },
          yaxis: {
            labels: {
              show: false,
              style: {
                colors: "#fff", // Warna label sumbu Y
                fontFamily: "Poppins",
                fontSize: "14px",
              },
            },
          },
          plotOptions: {
            bar: {
              barHeight: "80%", // Tinggi bar lebih kecil pada layar mobile
              columnWidth: "80%",
            },
          },
        },
      },
    ],
  };

  const series = value.kematian.map((res) => {
    return {
      //   id: res.id,
      name: res.year,
      data: res.total,
      //   colors: ["purple", "blue", "green", "yellow"],
    };
  });

  return (
    <Box
      sx={{
        backgroundColor: "#214D95",
        borderRadius: "10px",
        py: 2,
        borderTopLeftRadius: "10px",
      }}
    >
      <ReactApexChart options={options} series={series} type="bar" height={300} />
    </Box>
  );
}
