import React, { useEffect, useState } from "react";
import { fetchDataPublic } from "../../../service/api";

export default function IdmLogic() {
  const [statusSkor, setStatusSkor] = useState([]); // data status & skor
  const [informasi, setInformasi] = useState([]); // data informasi idm
  const [idmPertahun, setIdmPertahun] = useState([]); // data skor idm pertahun
  const [ikl, setIkl] = useState({
    score: [],
    data: [],
  }); // data & skor ikl
  const [iks, setIks] = useState({
    score: [],
    data: [],
  }); // data & skor iks
  const [ike, setIke] = useState({
    score: [],
    data: [],
  }); // data & skor ike
  const [keterangan, setKeterangan] = useState({
    ikl: [],
    idm: [],
    statusIdm: [],
  }); // skor ikl, idm & status idm

  useEffect(() => {
    getData();
    getInformasi();
    getIdmPertahun();
    getIkl();
    getIks();
    getIke();
    getKeterangan();
  }, []);

  // get data status & skor
  const getData = async () => {
    fetchDataPublic(`/public/idm/status-and-score`).then((res) => {
      setStatusSkor(res.data);
    });
  };

  // get data informasi idm
  const getInformasi = async () => {
    fetchDataPublic(`/public/idm/generals`).then((res) => {
      setInformasi(res.data);
    });
  };

  // get data skor idm pertahun
  const getIdmPertahun = async () => {
    fetchDataPublic(`/public/idm/annual-statistics`).then((res) => {
      setIdmPertahun(res.data);
    });
  };

  // get data & skor ikl
  const getIkl = async () => {
    fetchDataPublic(`/public/idm/score-ikl`).then((res) => {
      setIkl((prevState) => ({
        ...prevState,
        score: res.data,
      }));
    });
    fetchDataPublic(`/public/idm/data-ikl`).then((res) => {
      setIkl((prevState) => ({
        ...prevState,
        data: res.data,
      }));
    });
  };

  // get data & skor iks
  const getIks = async () => {
    fetchDataPublic(`/public/idm/score-iks`).then((res) => {
      setIks((prevState) => ({
        ...prevState,
        score: res.data,
      }));
    });
    fetchDataPublic(`/public/idm/data-iks`).then((res) => {
      setIks((prevState) => ({
        ...prevState,
        data: res.data,
      }));
    });
  };

  // get data & skor ike
  const getIke = async () => {
    fetchDataPublic(`/public/idm/score-ike`).then((res) => {
      setIke((prevState) => ({
        ...prevState,
        score: res.data,
      }));
    });
    fetchDataPublic(`/public/idm/data-ike`).then((res) => {
      setIke((prevState) => ({
        ...prevState,
        data: res.data,
      }));
    });
  };

  //   get data skor ikl,idm & status idm
  const getKeterangan = async () => {
    fetchDataPublic(`/public/idm/score-status-ikl-idm`).then((res) => {
      setKeterangan((prevState) => ({
        ...prevState,
        ikl: res.data.ikl,
        idm: res.data.idm,
        statusIdm: res.data.status_idm,
      }));
    });
  };

  return {
    value: { statusSkor, informasi, idmPertahun, ikl, iks, ike, keterangan },
    func: {},
  };
}
