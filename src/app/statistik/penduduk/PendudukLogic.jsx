import { fetchDataPublic } from "../../../service/api";
import React, { useEffect, useState } from "react";

export default function PendudukLogic() {
  const [data, setData] = useState([]);
  const [jumlahPenduduk, setJumlahPenduduk] = useState({
    category: [],
    data: [],
  });
  const [kematian, setKematian] = useState([]);
  const [jenisKelamin, setJenisKelamin] = useState([]);
  const [pendidikan, setPendidikan] = useState([]);
  const [pekerjaan, setPekerjaan] = useState([]);
  const [perkawinan, setPerkawinan] = useState([]);
  const [agama, setAgama] = useState([]);
  const [kewarganegaraan, setKewarganegaraan] = useState([]);

  useEffect(() => {
    getData();
    getJumlahPenduduk();
    getKematian();
    getJenisKelamin();
    getPendidikan();
    getPekerjaan();
    getPerkawinan();
    getAgama();
    getKewarganegaraan();
  }, []);

  // get data informasi penduduk
  const getData = async () => {
    try {
      fetchDataPublic(`/public/populations/generals`).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data jumlah penduduk
  const getJumlahPenduduk = async () => {
    try {
      fetchDataPublic(`/public/populations/ages-statistics`).then((res) => {
        setJumlahPenduduk({ category: res.category, data: res.data });
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data berdasarkan kematian
  const getKematian = async () => {
    try {
      fetchDataPublic(`/public/populations/deaths`).then((res) => {
        setKematian(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data berdasarkan jenis kelamin
  const getJenisKelamin = async () => {
    try {
      fetchDataPublic(`/public/populations/genders`).then((res) => {
        setJenisKelamin(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data berdasarkan pendidikan
  const getPendidikan = async () => {
    try {
      fetchDataPublic(`/public/populations/educations`).then((res) => {
        setPendidikan(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data berdasarkan pekerjaan
  const getPekerjaan = async () => {
    try {
      fetchDataPublic(`/public/populations/professions`).then((res) => {
        setPekerjaan(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data berdasarkan status perkawinan
  const getPerkawinan = async () => {
    try {
      fetchDataPublic(`/public/populations/marriages`).then((res) => {
        setPerkawinan(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data berdasarkan agama
  const getAgama = async () => {
    try {
      fetchDataPublic(`/public/populations/religions`).then((res) => {
        setAgama(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data berdasarkan kewarganegaraan
  const getKewarganegaraan = async () => {
    try {
      fetchDataPublic(`/public/populations/civics`).then((res) => {
        setKewarganegaraan(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return {
    value: {
      data,
      jumlahPenduduk,
      kematian,
      jenisKelamin,
      pendidikan,
      pekerjaan,
      perkawinan,
      agama,
      kewarganegaraan,
    },
    func: {},
  };
}
