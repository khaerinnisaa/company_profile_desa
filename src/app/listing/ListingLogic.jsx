// import { fetchDataPublic } from "../../service/api";
// import React, { useEffect, useState } from "react";

// export default function ListingLogic() {
//   const [category, setCategory] = useState(); // category dropdown
//   const [categoryId, setCategoryId] = useState(); // id category
//   // const [selectedCategory, setSelectedCategory] = useState(); // kategori yg dipilih
//   const [dropdown, setDropdown] = useState(false);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       await dataCategory();
//       if (categoryId) {
//         await dataListing();
//       }
//     };

//     fetchData();
//     // dataCategory();
//     // dataListing();
//   }, [categoryId]);

//   // data dropdown
//   const dataCategory = async () => {
//     try {
//       fetchDataPublic(`/public/listing-categories`)
//         .then((res) => {
//           setCategory(res.data);

//           if (dropdown === true) {
//             setCategoryId(categoryId);
//           } else {
//             setCategoryId(res.data[0].id);
//           }
//         })
//         .catch((err) => {
//           console.log("error bang", err);
//         });
//     } catch (error) {
//       console.log(error);
//     } finally {
//     }
//   };
//   // data listing
//   const dataListing = async () => {
//     try {
//       if (categoryId === undefined) {
//         fetchDataPublic(`/public/listing-locations`).then((res) => {
//           setData(res.data);
//         });
//       } else {
//         fetchDataPublic(`/public/listing-locations/${categoryId}`).then(
//           (res) => {
//             setData(res.data);
//           }
//         );
//       }
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log({ categoryId });
//   console.log({ data });

//   const change = (selected) => {
//     // console.log(selected, "selec");
//     if (selected === undefined) {
//       return <em>Pilih Tahun</em>;
//     }
//     return selected;
//   };

//   //
//   let selectedCategory;
//   category &&
//     category.forEach((res) => {
//       if (res.id === categoryId) {
//         selectedCategory = res.name;
//         // setPosition
//       }
//     });

//   let position;
//   data &&
//     data.map((res) => {
//       position = [res.latitude, res.longitude];
//     });

//   // handle category
//   const handleCategory = async (e) => {
//     setDropdown(true);
//     // setKabinet(e.target.value);
//     setCategoryId(e.target.value);
//   };

//   // style dropdown
//   const ITEM_HEIGHT = 48;
//   const ITEM_PADDING_TOP = 8;
//   const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         // width: 150,
//       },
//     },
//   };

//   return {
//     value: {
//       MenuProps,
//       category,
//       categoryId,
//       selectedCategory,
//       data,
//       dropdown,
//       position,
//       loading,
//     },
//     func: { handleCategory, change },
//   };
// }

import React, { useEffect, useState } from "react";
import { fetchDataPublic } from "../../service/api";
import Maps from "../../assets/maps.png";

export default function ListingLogic() {
  const [category, setCategory] = useState([]); // category dropdown
  const [categoryId, setCategoryId] = useState(); // id category
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
  }, [categoryId]);

  // Fetch data dropdown
  const dataCategory = async () => {
    try {
      const res = await fetchDataPublic(`/public/listing-categories`);
      setCategory(res.data);
      // Set default category ID if none is selected
      if (!categoryId && res.data.length > 0) {
        setCategoryId(res.data[0].id);
      }
    } catch (error) {
      console.log("Error fetching categories", error);
    }
  };

  // Fetch data listing
  const dataListing = async () => {
    try {
      const endpoint =
        categoryId === undefined
          ? `/public/listing-locations`
          : `/public/listing-locations/${categoryId}`;
      const res = await fetchDataPublic(endpoint);
      setData(res.data);
    } catch (err) {
      console.log("Error fetching listings", err);
    } finally {
      setLoading(false);
    }
  };

  // Find selected category name
  const selectedCategory = category.find((res) => res.id === categoryId)?.name;

  // Determine position for map
  let position;
  if (data && data.length > 0) {
    // Use the first data entry to determine the map center
    position = [data[0].latitude, data[0].longitude];
  }

  const handleDropdownClick = () => {
    setDropdown(!dropdown);
  };

  // Handle selecting a category from the dropdown
  const handleOptionClick = (id) => {
    setCategoryId(id);
    setDropdown(false);
  };

  const customIcon = new L.Icon({
    iconUrl: Maps,
    iconSize: [37, 39],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
  return {
    value: {
      category,
      categoryId,
      selectedCategory,
      data,
      dropdown,
      position,
      loading,
      customIcon,
    },
    func: { handleDropdownClick, handleOptionClick },
  };
}
