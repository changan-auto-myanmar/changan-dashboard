import axios from "./../../axios";

const getANew = async (id) => {
  try {
    const response = await axios.get("api/v1/csr/public/" + id);
    console.log("CSR", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getANew;
