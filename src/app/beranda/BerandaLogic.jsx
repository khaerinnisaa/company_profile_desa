import { useAppContext } from "../../contexts/AppContext";
import { fetchDataPublic } from "../../service/api";
// import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function BerandaLogic() {
  const { setLoadingRoute } = useAppContext();
  const router = useNavigate();
  const [dataSlider, setDataSlider] = useState([]); // data slider
  const [dataProfil, setDataProfil] = useState([]); // data profil singkat desa
  const [data, setData] = useState([]); // data berita terbaru
  const [informasi, setInformasi] = useState([]); // data informasi desa

  useEffect(() => {
    getData();
    getDataProfil();
    getInformasi();
    getDataBerita();
  }, []);

  // get data slider
  const getData = async () => {
    try {
      fetchDataPublic(`/public/home/sliders`).then((res) => {
        setDataSlider(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data profil singkat desa
  const getDataProfil = async () => {
    try {
      fetchDataPublic(`public/home/profile-summary`).then((res) => {
        setDataProfil(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data informasi desa
  const getInformasi = async () => {
    try {
      fetchDataPublic(`public/home/village-information`).then((res) => {
        setInformasi(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data berita terbaru
  const getDataBerita = async () => {
    try {
      fetchDataPublic(`/public/latest-news?limit=${6}`).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // detail berita
  const handleDetailBerita = (slug) => {
    try {
      router(`/berita/${slug}`);
      setLoadingRoute(true);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    value: { data, dataSlider, dataProfil, informasi },
    func: { handleDetailBerita },
  };
}
