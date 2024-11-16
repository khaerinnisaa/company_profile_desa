import { fetchDataPublic } from "../../service/api";
import React, { useEffect, useState } from "react";

export default function ListingLogic() {
  const [category, setCategory] = useState(); // category dropdown
  const [categoryId, setCategoryId] = useState(); // id category
  // const [selectedCategory, setSelectedCategory] = useState(); // kategori yg dipilih
  const [dropdown, setDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dataCategory();
      if (categoryId) {
        await dataListing();
      }
    };

    fetchData();
    // dataCategory();
    // dataListing();
  }, [categoryId]);

  // data dropdown
  const dataCategory = async () => {
    try {
      fetchDataPublic(`/public/listing-categories`)
        .then((res) => {
          setCategory(res.data);

          if (dropdown === true) {
            setCategoryId(categoryId);
          } else {
            setCategoryId(res.data[0].id);
          }
        })
        .catch((err) => {
          console.log("error bang", err);
        });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  // data listing
  const dataListing = async () => {
    try {
      if (categoryId === undefined) {
        fetchDataPublic(`/public/listing-locations`).then((res) => {
          setData(res.data);
        });
      } else {
        fetchDataPublic(`/public/listing-locations/${categoryId}`).then(
          (res) => {
            setData(res.data);
          }
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  console.log({ categoryId });
  console.log({ data });

  const change = (selected) => {
    // console.log(selected, "selec");
    if (selected === undefined) {
      return <em>Pilih Tahun</em>;
    }
    return selected;
  };

  //
  let selectedCategory;
  category &&
    category.forEach((res) => {
      if (res.id === categoryId) {
        selectedCategory = res.name;
        // setPosition
      }
    });

  let position;
  data &&
    data.map((res) => {
      position = [res.latitude, res.longitude];
    });

  // handle category
  const handleCategory = async (e) => {
    setDropdown(true);
    // setKabinet(e.target.value);
    setCategoryId(e.target.value);
  };

  // style dropdown
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // width: 150,
      },
    },
  };

  return {
    value: {
      MenuProps,
      category,
      categoryId,
      selectedCategory,
      data,
      dropdown,
      position,
      loading,
    },
    func: { handleCategory, change },
  };
}
