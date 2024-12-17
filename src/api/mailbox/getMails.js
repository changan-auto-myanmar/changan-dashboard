import axios from "./../../axios";

const getMails = async () => {
  const response = await axios.get(`/api/v1/service`);
  return response.data;
};

export default getMails;
