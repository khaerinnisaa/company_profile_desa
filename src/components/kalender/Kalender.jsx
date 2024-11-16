// import React, { useState } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { Tooltip, Box, Grid, IconButton } from "@mui/material";
// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { dataKalender } from "@/values/Constant";
// import { Poppins } from "../Poppins/Poppins";
// import "./style.css";

// dayjs.extend(isBetween); // Tambahkan plugin isBetween

// export default function Kalender() {
//   const [activities, setActivities] = useState(dataKalender);
//   const [currentMonth, setCurrentMonth] = useState(dayjs().toDate());

//   // Fungsi untuk mengecek apakah suatu tanggal berada dalam rentang kegiatan
//   const getActivityForDate = (date) => {
//     return activities.find((activity) => {
//       const startDate = dayjs(activity.start_date);
//       const endDate = dayjs(activity.end_date);
//       return dayjs(date).isBetween(startDate, endDate, "day", "[]"); // [] untuk mencakup tanggal mulai dan akhir
//     });
//   };

//   const styles = {
//     calendarContainer: {
//       backgroundColor: "#084c7d",
//       padding: "20px",
//       borderRadius: "8px",
//       color: "#fff",
//       textAlign: "center",
//     },
//     monthContainer: {
//       display: "flex",
//       justifyContent: "center",
//       gap: "30px",
//       alignItems: "center",
//     },
//     monthTitle: {
//       color: "#fff",
//       marginTop: "10px",
//       fontWeight: "bold",
//     },
//     calendarWrapper: {
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//   };

//   // Handler untuk navigasi bulan
//   const handlePrevMonth = () => {
//     setCurrentMonth(dayjs(currentMonth).subtract(1, "month").toDate());
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth(dayjs(currentMonth).add(1, "month").toDate());
//   };
//   return (
//     <Box sx={styles.calendarContainer}>
//       <Poppins>Kalender Kegiatan 2024</Poppins>
//       <Box sx={styles.calendarWrapper}>
//         <IconButton onClick={handlePrevMonth} color="inherit">
//           <ArrowBackIosIcon />
//         </IconButton>
//         <Grid container spacing={2} justifyContent="center">
//           {[0, 1, 2].map((offset) => (
//             <Grid item key={offset}>
//               <DayPicker
//                 mode="range"
//                 selected={undefined}
//                 month={dayjs(currentMonth)
//                   .add(offset - 1, "month")
//                   .toDate()}
//                 showOutsideDays
//                 modifiers={{
//                   hasActivity: (date) => !!getActivityForDate(date),
//                 }}
//                 modifiersStyles={{
//                   hasActivity: {
//                     backgroundColor: "yellow",
//                     border: "2px solid #ff4081",
//                     borderRadius: "50%",
//                   },
//                 }}
//                 render={({ date, modifiers, onDayClick, dayPickerProps }) => {
//                   const activity = getActivityForDate(date);
//                   if (modifiers.hasActivity && activity) {
//                     return (
//                       <Tooltip
//                         title={`Dari: ${activity.start_date} Sampai: ${activity.end_date}`}
//                       >
//                         <span>
//                           <DayPicker
//                             {...dayPickerProps}
//                             onDayClick={() => onDayClick(date)}
//                           />
//                         </span>
//                       </Tooltip>
//                     );
//                   }
//                   return (
//                     <DayPicker
//                       {...dayPickerProps}
//                       onDayClick={() => onDayClick(date)}
//                     />
//                   );
//                 }}
//               />
//               <Poppins sx={styles.monthTitle}>
//                 {dayjs(currentMonth)
//                   .add(offset - 1, "month")
//                   .format("MMMM")}
//               </Poppins>
//             </Grid>
//           ))}
//         </Grid>
//         <IconButton onClick={handleNextMonth} color="inherit">
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Box, Tooltip, Modal, IconButton, Grid } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./style.css";
import { Poppins } from "../typography/Poppins";
import { fetchDataPublic } from "../../service/api";

dayjs.extend(isBetween);

const activities = [
  {
    id: 1,
    title: "Rapat Tim",
    start_date: "09/01/2024",
    end_date: "09/05/2024",
    description: "Rapat bulanan untuk evaluasi kinerja tim.",
    location: "Ruang Rapat 1",
  },
  {
    id: 2,
    title: "Workshop",
    start_date: "09/10/2024",
    end_date: "09/12/2024",
    description: "Workshop internal tentang manajemen waktu.",
    location: "Ruang Workshop",
  },
  {
    id: 3,
    title: "Lomba",
    start_date: "09/21/2024",
    end_date: "09/21/2024",
    description: "Workshop internal tentang manajemen waktu.",
    location: "Ruang Workshop",
  },
];

export default function Kalender() {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRefs = [useRef(null), useRef(null), useRef(null)]; // Array of references
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // get data kegiatan
  const getData = async () => {
    fetchDataPublic(`/public/activities`).then((res) => {
      setData(res.data);
    });
  };

  const handleDateClick = (info) => {
    const event = data.find((activity) => {
      const startDate = dayjs(activity.tanggal_mulai, "YYYY/MM/DD");
      const endDate = dayjs(activity.tanggal_selesai, "YYYY/MM/DD");
      // const endDate = dayjs(activity.tanggal_selesai, "MM/DD/YYYY");
      return dayjs(info.date).isBetween(startDate, endDate, "day", "[]");
    });

    if (event) {
      setSelectedEvent(event);
      setOpen(true);
    }
  };

  const events = data.map((activity) => ({
    title: activity.nama,
    start: activity.tanggal_mulai,
    end: dayjs(activity.tanggal_selesai, "MM/DD/YYYY")
      .add(1, "day")
      .format("MM/DD/YYYY"),
    backgroundColor: "#ffecb3",
    borderColor: "#ffecb3",
  }));

  const handlePrevMonth = () => {
    calendarRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.getApi().prev();
      }
    });
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    calendarRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.getApi().next();
      }
    });
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#0D4581",
        borderRadius: "16px",
        color: "#333",
      }}
    >
      <Poppins
        sx={{
          fontWeight: 600,
          fontSize: { xs: "30px", md: "40px" },
          color: "#FFFFFF",
        }}
        align="center"
        gutterBottom
      >
        Kalender Kegiatan
      </Poppins>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ marginBottom: "20px" }}
      >
        <IconButton onClick={handlePrevMonth} color="inherit">
          <ArrowBackIosIcon sx={{ color: "#FFFFFF" }} />
        </IconButton>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ width: "90%" }}
        >
          {[0, 1, 2].map((offset, index) => {
            const month = currentMonth.clone().add(offset - 1, "month");

            return (
              <Grid item xs={12} md={4} key={offset}>
                <Box
                  sx={{
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <FullCalendar
                    ref={calendarRefs[index]} // Attach the correct ref
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={false}
                    // events={events}
                    dateClick={handleDateClick}
                    initialDate={month.toDate()}
                    eventContent={(eventInfo) => (
                      <Tooltip title={eventInfo.event.title} arrow>
                        <Box
                          sx={{
                            backgroundColor: "#ffecb3",
                            borderRadius: "4px",
                            padding: "2px 4px",
                            fontSize: "0.85rem",
                          }}
                        >
                          {eventInfo.timeText} {eventInfo.event.title}
                        </Box>
                      </Tooltip>
                    )}
                    dayCellContent={(info) => {
                      const isSunday = dayjs(info.date).day() === 0; // Cek jika hari Minggu
                      const isInEventRange = events.some((event) => {
                        const startDate = dayjs(event.start, "MM/DD/YYYY");
                        const endDate = dayjs(event.end, "MM/DD/YYYY").subtract(
                          1,
                          "day"
                        ); // Make sure to not add extra day

                        // Check if the date is within the range [start_date, end_date]
                        return dayjs(info.date).isBetween(
                          startDate,
                          endDate,
                          "day",
                          "[]"
                        );
                      });

                      const cellStyle = isInEventRange
                        ? {
                            color: "#0D4581", // Warna khusus untuk tanggal kegiatan
                            fontWeight: 900, // Teks tebal untuk tanggal kegiatan
                          }
                        : isSunday
                        ? {
                            color: "#FF0000", // Warna merah untuk hari Minggu
                          }
                        : { padding: "0px" };

                      return (
                        <Box
                          sx={{
                            ...cellStyle,
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            "&:hover": {
                              transition: "background-color 0.3s",
                            },
                          }}
                        >
                          {info.dayNumberText}
                        </Box>
                      );
                    }}
                    dayHeaderContent={(info) => {
                      // Mengambil dua huruf pertama dari nama hari
                      return info.text.slice(0, 2);
                    }}
                    dayHeaderClassNames="fc-day-header"
                    height="auto"
                    aspectRatio={1.5}
                    contentHeight="auto"
                  />
                  <Poppins
                    variant="subtitle1"
                    align="center"
                    sx={{ marginTop: "10px" }}
                  >
                    {month.format("MMMM YYYY")}
                  </Poppins>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <IconButton onClick={handleNextMonth} color="inherit">
          <ArrowForwardIosIcon sx={{ color: "#FFFFFF" }} />
        </IconButton>
      </Box>

      {/* Modal to display event details */}
      <Modal disableAutoFocus={true} open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            // border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            minWidth: 300,
            borderRadius: "16px",
          }}
        >
          {selectedEvent && (
            <>
              <Poppins variant="h6" sx={{ marginBottom: "8px" }}>
                {selectedEvent.nama}
              </Poppins>
              <Poppins sx={{ marginBottom: "4px" }}>
                {selectedEvent.deskripsi}
              </Poppins>
              <Poppins sx={{ marginBottom: "4px" }}>
                {selectedEvent.tanggal_mulai} - {selectedEvent.tanggal_selesai}
              </Poppins>
              <Poppins>{selectedEvent.location}</Poppins>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
