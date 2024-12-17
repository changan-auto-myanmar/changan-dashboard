import axios from "./../../axios";

const getServices = async () => {
  const response = await axios.get(`/api/v1/service`);
  return response.data;
};

export default getServices;
