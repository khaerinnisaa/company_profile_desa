import { useAppContext } from "../../contexts/AppContext";
import { fetchDataPublic } from "../../service/api";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function BeritaLogic() {
  const { setLoadingRoute } = useAppContext();
  const router = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(9);
  const [totalPage, setTotalPage] = useState();
  const [totalItem, setTotalItem] = useState();

  useEffect(() => {
    getData();
  }, [page, perpage, totalPage, totalItem]);

  // get data berita
  const getData = async () => {
    try {
      fetchDataPublic(`/public/news?page=${page}&perpage=${perpage}`).then(
        (res) => {
          setData(res.data);
          setPage(res.meta.page);
          setPerpage(res.meta.perpage);
          setTotalPage(res.meta.total_page);
          setTotalItem(res.meta.total_item);
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // ketika detail d klik
  const handleDetails = (slug) => {
    try {
      router(`/berita/${slug}`);
      setLoadingRoute(true);
    } catch (error) {
      console.log(error);
    }
  };

  // handle page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return {
    value: { data, page, totalPage, totalItem },
    func: { handleDetails, handleChangePage },
  };
}
