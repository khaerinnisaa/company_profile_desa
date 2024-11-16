import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/beranda/Page";
import Struktur from "./app/struktur/Page";
import Profil from "./app/profil/Page";
import Berita from "./app/berita/Page";
import DetailBerita from "./app/berita/[slug]/Page";
import Listing from "./app/listing/Page";
import Potensi from "./app/potensi/Page";
import DetailPotensi from "./app/potensi/[slug]/Page";
import Produk from "./app/produk/Page";
import DetailProduk from "./app/produk/[slug]/Page";
import Penduduk from "./app/statistik/penduduk/Page";
import BantuanSosial from "./app/statistik/bantuan_sosial/Page";
import Sarana from "./app/statistik/sarana_dan_prasarana/Page";
import Apb from "./app/statistik/apb/Page";
import RumahIbadah from "./app/statistik/rumah_ibadah/Page";
import Wisata from "./app/statistik/wisata/Page"
import Idm from "./app/statistik/idm/Page"
// import Struktur from "./app/struktur/Page";
// import "./App.css";

function App() {
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/struktur" element={<Struktur />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:slug" element={<DetailBerita />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/potensi" element={<Potensi />} />
        <Route path="/potensi/:slug" element={<DetailPotensi />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/produk/:slug" element={<DetailProduk />} />
        <Route path="/statistik/penduduk" element={<Penduduk />} />
        <Route path="/statistik/bantuan_sosial" element={<BantuanSosial />} />
        <Route path="/statistik/sarana_dan_prasarana" element={<Sarana />} />
        <Route path="/statistik/apb" element={<Apb />} />
        <Route path="/statistik/rumah_ibadah" element={<RumahIbadah />} />
        <Route path="/statistik/wisata" element={<Wisata />} />
        <Route path="/statistik/idm" element={<Idm />} />
        <Route path="/tes" element={<p>tes</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
