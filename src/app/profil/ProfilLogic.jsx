import { fetchDataPublic } from "../../service/api";
import React, { useEffect, useState } from "react";

export default function ProfilLogic() {
  const [data, setData] = useState([]);
  const [visiMisi, setVisiMisi] = useState([]);
  const [sejarah, setSejarah] = useState([]);
  const [peta, setPeta] = useState([]);

  useEffect(() => {
    getData();
    getVisiMisi();
    getSejarah();
    getPeta();
  }, []);

  // get data umum
  const getData = async () => {
    try {
      fetchDataPublic(`/public/home/general-information`).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data visi misi
  const getVisiMisi = async () => {
    try {
      fetchDataPublic(`/public/home/vision-mission`).then((res) => {
        setVisiMisi(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data sejarah
  const getSejarah = async () => {
    try {
      fetchDataPublic(`/public/home/history`).then((res) => {
        setSejarah(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data peta wilayah
  const getPeta = async () => {
    try {
      fetchDataPublic(`/public/home/area-desc`).then((res) => {
        setPeta(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return {
    value: { data, visiMisi, sejarah, peta },
    func: {},
  };
}
