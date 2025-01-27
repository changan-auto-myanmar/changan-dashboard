import axios from "./../../axios";

const getAllNew = async () => {
  try {
    const response = await axios.get("api/v1/csr/public");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAllNew;
