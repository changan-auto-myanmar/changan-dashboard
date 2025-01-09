import axios from "./../../axios";

const getBrandOverview = async () => {
  try {
    const response = await axios.get("api/v1/car-overview");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getBrandOverview;
