import axios from "./../../axios";

const getAllCarDetail = async () => {
  try {
    const response = await axios.get("api/v1/changan-showcase");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAllCarDetail;
