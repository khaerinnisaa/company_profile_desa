import { useAppContext } from "../../contexts/AppContext";
import { fetchDataPublic } from "../../service/api";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function PotensiLogic() {
  const { setLoadingRoute } = useAppContext();
  const router = useNavigate();
  const [data, setData] = useState([]);
  const [dataPertanian, setDataPertanian] = useState([]); // pertanian desa (icon)
  const [pertanian, setPertanian] = useState([]); // pertanian desa (tabel)
  const [sarana, setSarana] = useState([]); // sarana dan prasarana
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(4);
  const [totalPage, setTotalPage] = useState();
  const [totalItem, setTotalItem] = useState();

  console.log({ data });
  useEffect(() => {
    dataPotensi();
    getPertanian();
    getPertanianLainnya();
    getSarana();
  }, [page, perpage, totalPage, totalItem]);

  // get data wisata
  const dataPotensi = async () => {
    try {
      fetchDataPublic(
        `public/travel-articles?page=${page}&perpage=${perpage}`
      ).then((res) => {
        setData(res.data);
        setPage(res.meta.page);
        setPerpage(res.meta.perpage);
        setTotalPage(res.meta.total_page);
        setTotalItem(res.meta.total_item);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // get data pertanian desa (icon)
  const getPertanian = async () => {
    try {
      fetchDataPublic(`/public/farm-produces/highest`).then((res) => {
        setDataPertanian(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
    
  };

  // get data pertanian desa (tabel)
  const getPertanianLainnya = async () => {
    try {
      fetchDataPublic(`/public/farm-produces/others`).then((res) => {
        setPertanian(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
    
  };

  // get data sarana dan prasarana
  const getSarana = async () => {
    try {
      fetchDataPublic(`/public/facilities/list`).then((res) => {
        setSarana(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
    
  };

  // handle page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // detail wisata
  const handleDetails = (slug) => {
    try {
      router(`/potensi/${slug}`);
      setLoadingRoute(true);
    } catch (err) {
      console.log(err);
    }
  };
  // fungsi membatasi text
  const limitText = (html, maxLength) => {
    // Buat DOM parser
    const parser = new DOMParser();
    // Parse string HTML
    const doc = parser.parseFromString(html, "text/html");
    // Ambil teks murni tanpa tag
    const textContent = doc.body.textContent || "";

    // Jika teks murni lebih panjang dari batas yang ditentukan
    if (textContent.length > maxLength) {
      // Potong teks murni
      const truncatedText = textContent.substring(0, maxLength) + "...";
      let charCount = 0;

      // Fungsi untuk merangkai kembali teks dengan HTML
      const truncateHtml = (node) => {
        let newHtml = "";
        node.childNodes.forEach((child) => {
          if (charCount >= maxLength) return;

          if (child.nodeType === Node.TEXT_NODE) {
            const remainingChars = maxLength - charCount;
            if (child.textContent.length <= remainingChars) {
              newHtml += child.textContent;
              charCount += child.textContent.length;
            } else {
              newHtml += child.textContent.substring(0, remainingChars) + "...";
              charCount = maxLength;
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const innerHtml = truncateHtml(child);
            if (innerHtml) {
              newHtml += `<${child.nodeName.toLowerCase()}${[
                ...child.attributes,
              ]
                .map((attr) => ` ${attr.name}="${attr.value}"`)
                .join("")}>${innerHtml}</${child.nodeName.toLowerCase()}>`;
            }
          }
        });
        return newHtml;
      };

      // Gunakan fungsi truncateHtml pada elemen body
      return truncateHtml(doc.body);
    }

    // Jika teks tidak terlalu panjang, kembalikan HTML asli
    return html;
  };
  return {
    value: {
      data,
      page,
      totalPage,
      totalItem,
      dataPertanian,
      pertanian,
      sarana,
    },
    func: {
      limitText,
      handleDetails,
      handleChangePage,
    },
  };
}
