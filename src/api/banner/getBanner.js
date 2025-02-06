import axios from "./../../axios";

const getAllBanner = async () => {
  try {
    const response = await axios.get("api/v1/banners/public");
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};

export default getAllBanner;
