import { useAppContext } from "../../../contexts/AppContext";
import { useEffect, useState } from "react";

export default function BantuanLogic() {
  const sampleData = [
    {
      id: 1,
      name: "Dhimas Jaya Kusuma Sarma",
      nik: "73310829330002",
      jenis: "PKH",
      ket: "Sudah proses Kemensos",
      periode: "15 Agustus 2024",
    },
    {
      id: 2,
      name: "Dhimas ",
      nik: "123456789",
      jenis: "PKH",
      ket: "Sudah proses Kemensos",
      periode: "15 Agustus 2024",
    },
    {
      id: 3,
      name: "Dhimas Jaya Kusuma ",
      nik: "987654321",
      jenis: "PKH",
      ket: "Sudah proses Kemensos",
      periode: "15 Agustus 2024",
    },
  ];
  const [query, setQuery] = useState(""); // State untuk input pencarian
  const [filteredData, setFilteredData] = useState([]); // State untuk menyimpan hasil pencarian
  // Fungsi untuk menangani pencarian
  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    // Filter data berdasarkan input
    const filtered = sampleData.filter((item) =>
      item.nik.toLowerCase().includes(searchQuery)
    );

    setFilteredData(filtered); // Update hasil pencarian
  };

  const [open, setOpen] = useState(false); // modal
  const { setLoadingRoute } = useAppContext();

  useEffect(() => {
    setLoadingRoute(false);
  }, []);

  // open modal
  const handleOpenModal = (id) => {
    setOpen(true);
  };
  // close modal
  const handleClose = () => setOpen(false);
  // style modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", md: "40%" },
    bgcolor: "#D9D9D9",
    border: "none",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };

  return {
    value: { style, open, query, filteredData },
    func: { handleClose, handleSearch, handleOpenModal },
  };
}
