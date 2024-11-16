import { fetchDataPublic } from "../../service/api";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function ProdukLogic() {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);
  const [totalPage, setTotalPage] = useState();
  const [totalItem, setTotalItem] = useState();

  useEffect(() => {
    getData();
  }, [page, perPage, totalPage, totalItem]);

  // get data produk
  const getData = async () => {
    try {
      fetchDataPublic(`/public/products?page=${page}&perpage=${perPage}`).then(
        (res) => {
          setData(res.data);
          setPage(res.meta.page);
          setPerPage(res.meta.perpage);
          setTotalPage(res.meta.total_page);
          setTotalItem(res.meta.total_item);
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleDetails = (slug) => {
    try {
      setLoading(true);
      setSelectedId(slug);
      router(`/produk/${slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  // handle page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return {
    value: { loading, selectedId, data, page, perPage, totalPage, totalItem },
    func: { handleDetails, handleChangePage },
  };
}
