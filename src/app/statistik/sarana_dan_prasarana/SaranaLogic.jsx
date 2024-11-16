import { fetchDataPublic } from "../../../service/api";
import React, { useEffect, useState } from "react";

export default function SaranaLogic() {
  const [data, setData] = useState([]);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getData();
    getDataList();
  }, []);

  // get data (icon)
  const getData = async () => {
    try {
      fetchDataPublic(`/public/facilities`).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data (list)
  const getDataList = async () => {
    try {
      fetchDataPublic(`/public/facilities/list`).then((res) => {
        setDataList(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
   
  };
  return {
    value: { data, dataList },
  };
}
