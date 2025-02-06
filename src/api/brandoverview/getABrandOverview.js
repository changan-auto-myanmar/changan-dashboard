import axios from "./../../axios";

const getABrandOverview = async (id) => {
  try {
    const response = await axios.get(`api/v1/car-overview/${id}`);
    return response.data;
  } catch (error) {
    // console.log(error);
  }
};

export default getABrandOverview;
