import axios from "./../../axios";

const getANew = async (id) => {
  try {
    const response = await axios.get("api/v1/csr/cms");
    // console.log("CSR", response.data.data.CSR);
    return response.data.data.CSR.filter((item) => item._id === id);
  } catch (error) {
    console.log(error);
  }
};

export default getANew;
