import { fetchDataPublic } from "../../../service/api";
import React, { useEffect, useState } from "react";

export default function RumahIbadah() {
  const [expandedPanels, setExpandedPanels] = useState({}); // expanded accordion
  const [data, setData] = useState([]); // icon
  const [dataList, setDataList] = useState([]); // list

  useEffect(() => {
    getData();
    getDataList();
  }, []);

  //   get data (icon)
  const getData = async () => {
    try {
      fetchDataPublic(`/public/worship-facilities`).then((res) => {
        setData(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  //   get data (list)
  const getDataList = async () => {
    try {
      fetchDataPublic(`/public/worship-facilities/list`).then((res) => {
        setDataList(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // accordion change
  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanels({
      ...expandedPanels,
      [panel]: isExpanded,
    });
  };

  // style accordion open
  const handleAccordionToggle = (panel) => {
    return expandedPanels[panel]
      ? {
          backgroundColor: "#0D4581",
          borderRadius: "10px 10px 0px 0px",
          color: "white",
        }
      : {};
  };
  return {
    value: { expandedPanels, data, dataList },
    func: { handleChange, handleAccordionToggle },
  };
}
