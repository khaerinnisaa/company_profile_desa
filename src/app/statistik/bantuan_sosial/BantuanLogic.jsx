import { useAppContext } from "../../../contexts/AppContext";
import { useEffect, useState } from "react";
import { fetchDataPublic } from "../../../service/api";

export default function BantuanLogic() {
  const [open, setOpen] = useState(false); // modal
  const { setLoadingRoute } = useAppContext();
  const [informasi, setInformasi] = useState([]); // data informasi bantuan sosial
  const [data, setData] = useState([]); // data penerima bantuan
  const [nik, setNik] = useState("");

  useEffect(() => {
    getInformasi();
    if (nik) {
      getData();
    }
    setLoadingRoute(false);
  }, [nik]);

  // get data informasi bantuan sosial
  const getInformasi = async () => {
    fetchDataPublic(`/public/bansos`).then((res) => {
      setInformasi(res.data);
    });
  };

  // get data penerima bantuan
  const getData = async () => {
    fetchDataPublic(`public/bansos/${nik}`).then((res) => {
      setData(res.data);
    });
  };

  const handleSearch = (e) => {
    setNik(e.target.value);
  };

  // open modal
  const handleOpenModal = (id) => {
    setOpen(true);
  };
  // close modal
  const handleClose = () => setOpen(false);
  // style modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "80%", md: "40%" },
    bgcolor: "#D9D9D9",
    border: "none",
    boxShadow: 24,
    borderRadius: "10px",
    overflow: "auto",
    maxHeight: "412px",
    p: 4,
  };

  return {
    value: { style, open, informasi, data, nik },
    func: { handleClose, handleSearch, handleOpenModal },
  };
}
