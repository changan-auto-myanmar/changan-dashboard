import axios from "./../../axios";

const getYoutube = async () => {
  try {
    const response = await axios.get("api/v1/youtube");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getYoutube;
