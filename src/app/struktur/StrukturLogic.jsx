import { fetchDataPublic } from "../../service/api";
import React, { useEffect, useState } from "react";

export default function StrukturLogic() {
  const [pemerintah, setPemerintah] = useState();
  const [organisasi, setOrganisasi] = useState();

  useEffect(() => {
    strukturPemerintah();
    strukturOrganisasi();
  }, []);

  //   get data struktur pemerintah desa
  const strukturPemerintah = async () => {
    try {
      fetchDataPublic(`/public/home/government-structure`).then((res) => {
        setPemerintah(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  //   get data struktur organisasi desa
  const strukturOrganisasi = async () => {
    try {
      fetchDataPublic(`/public/home/organization-structure`).then((res) => {
        setOrganisasi(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return {
    value: { pemerintah, organisasi },
    func: {},
  };
}
