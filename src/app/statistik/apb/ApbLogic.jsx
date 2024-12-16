import React, { useEffect, useRef, useState } from "react";
import { fetchDataPublic } from "../../../service/api";

export default function ApbLogic() {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null); // Reference untuk dropdown
  const [expandedPanelsPendapatan, setExpandedPanelsPendapatan] = useState({}); // expanded accordion pendapatan
  const [expandedPanelsBelanja, setExpandedPanelsBelanja] = useState({}); // expanded accordion belanja
  const [expandedPanelsPembiayaan, setExpandedPanelsPembiayaan] = useState({}); // expanded accordion pembiayaan
  const [tahun, setTahun] = useState([]); // data dropdown tahun
  const [selectedTahun, setSelectedTahun] = useState(""); // tahun yg dipilih
  const [informasi, setInformasi] = useState([]); // data informasi apb desa
  const [pendapatanBelanja, setPendapatanBelanja] = useState({
    title: [],
    category: [],
    data: [],
  }); // data pendatapatan dan belanja desa 5 tahun terakhir
  const [pendapatan, setPendapatan] = useState({
    title: "",
    data: [],
    accordion: [],
  }); // data pendapatan
  const [belanja, setBelanja] = useState({
    title: "",
    chart: [],
    accordion: [],
  }); // data belanja desa
  const [pembiayaan, setPembiayaan] = useState({
    title: "",
    chart: [],
    accordion: [],
  }); // data pembiayaan desa

  useEffect(() => {
    const fetchData = async () => {
      await getTahun();
      if (selectedTahun) {
        await getInformasi();
        await getPendapatan();
        await getBelanja();
        await getPembiayaan();
      }
    };

    fetchData();
    getPendapatanbelanja();

    // Event listener untuk mendeteksi klik di luar dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false); // Tutup dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedTahun]);

  // get data tahun(dropdown)
  const getTahun = async () => {
    fetchDataPublic(`/public/years`).then((res) => {
      setTahun(res.data);

      if (!selectedTahun) {
        setSelectedTahun(res.data[0].year);
      }
    });
  };

  // get data informasi apb desa
  const getInformasi = async () => {
    fetchDataPublic(`/public/apb-desa/generals?year=${selectedTahun}`).then(
      (res) => {
        setInformasi(res.data);
      }
    );
  };

  // get data pendapatan dan belanja desa
  const getPendapatanbelanja = async () => {
    const [title, chart] = await Promise.all([
      fetchDataPublic(`public/apb-desa/revenues-and-expenses/title`),
      fetchDataPublic(`/public/apb-desa/revenues-and-expenses`),
    ]);

    setPendapatanBelanja((prev) => ({
      ...prev,
      title: title.data.title,
      category: chart.category,
      data: chart.data,
    }));
  };

  // get data pendapatan
  const getPendapatan = async () => {
    const [title, chart, accordion] = await Promise.all([
      fetchDataPublic(`/public/apb-desa/revenues/title?year=${selectedTahun}`),
      fetchDataPublic(`/public/apb-desa/revenues?year=${selectedTahun}`),
      fetchDataPublic(`public/apb-desa/revenues/list?year=${selectedTahun}`),
    ]);

    setPendapatan((prev) => ({
      ...prev,
      title: title.data.title,
      data: chart.data,
      accordion: accordion.data,
    }));
  };

  // get data belanja desa
  const getBelanja = async () => {
    const [title, chart, accordion] = await Promise.all([
      fetchDataPublic(`public/apb-desa/expenses/title?year=${selectedTahun}`),
      fetchDataPublic(`public/apb-desa/expenses?year=${selectedTahun}`),
      fetchDataPublic(`public/apb-desa/expenses/list?year=${selectedTahun}`),
    ]);

    setBelanja((prev) => ({
      ...prev,
      title: title.data.title,
      chart: chart.data,
      accordion: accordion.data,
    }));
  };

  // get data pembiayaan desa
  const getPembiayaan = async () => {
    const [title, chart, accordion] = await Promise.all([
      fetchDataPublic(`/public/apb-desa/outlay/title?year=${selectedTahun}`),
      fetchDataPublic(`public/apb-desa/outlay?year=${selectedTahun}`),
      fetchDataPublic(`public/apb-desa/outlay/list?year=${selectedTahun}`),
    ]);

    setPembiayaan((prev) => ({
      ...prev,
      title: title.data.title,
      chart: chart.data,
      accordion: accordion.data,
    }));
  };

  // ketika dropdwo d clik
  const onClickDropdown = () => {
    setDropdown(!dropdown);
  };
  // dropdown
  const handleTahun = async (id) => {
    setSelectedTahun(id);
    setDropdown(false);
  };

  // accordion change pendapatan
  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanelsPendapatan({
      ...expandedPanelsPendapatan,
      [panel]: isExpanded,
    });
  };
  // accordion change belanja
  const handleChangeBelanja = (panel) => (event, isExpanded) => {
    setExpandedPanelsBelanja({
      ...expandedPanelsBelanja,
      [panel]: isExpanded,
    });
  };
  // accordion change pembiayaan
  const handleChangePembiayaan = (panel) => (event, isExpanded) => {
    setExpandedPanelsPembiayaan({
      ...expandedPanelsPembiayaan,
      [panel]: isExpanded,
    });
  };

  // style accordion pendapatan open
  const handleAccordionToggle = (panel) => {
    return expandedPanelsPendapatan[panel]
      ? {
          backgroundColor: "#0D4581",
          borderRadius: "10px 10px 0px 0px",
          color: "white",
        }
      : {};
  };
  // style accordion belanja open
  const handleAccordionToggleBelanja = (panel) => {
    return expandedPanelsBelanja[panel]
      ? {
          backgroundColor: "#0D4581",
          borderRadius: "10px 10px 0px 0px",
          color: "white",
        }
      : {};
  };
  // style accordion pembiayaan open
  const handleAccordionTogglePembiayaan = (panel) => {
    return expandedPanelsPembiayaan[panel]
      ? {
          backgroundColor: "#0D4581",
          borderRadius: "10px 10px 0px 0px",
          color: "white",
        }
      : {};
  };

  return {
    value: {
      expandedPanelsPendapatan,
      expandedPanelsBelanja,
      expandedPanelsPembiayaan,
      tahun,
      selectedTahun,
      informasi,
      pendapatanBelanja,
      pendapatan,
      belanja,
      pembiayaan,
      dropdown,
      dropdownRef,
    },
    func: {
      handleAccordionToggle,
      handleAccordionToggleBelanja,
      handleAccordionTogglePembiayaan,
      handleChange,
      handleChangeBelanja,
      handleChangePembiayaan,
      handleTahun,
      onClickDropdown,
    },
  };
}
