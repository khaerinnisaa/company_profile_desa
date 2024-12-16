import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

const apipublic = axios.create({
  baseURL: baseUrl,
});

// Get Data public
export const fetchDataPublic = async (endpoint) => {
  try {
    // Fetch data dari endpoint yang diberikan
    const response = await apipublic.get(endpoint);

    // Mengembalikan data dari response
    return response.data;
  } catch (error) {
    // Menangani error
    console.error("Error fetching data:", error);
    throw error;
  }
};
