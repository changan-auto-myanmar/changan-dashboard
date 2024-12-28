import axios from "./../../axios";

const getACarDetail = async (id) => {
  try {
    const response = await axios.get("api/v1/showcase/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getACarDetail;
