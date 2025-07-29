import { toast } from "sonner";
import axios from "../../axios";

const deleteBrand = async (brand) => {
  //   console.log("data", data);
  const toastId = toast.loading("Deleteing...");
  try {
    const response = await axios.delete(`api/v1/car-overview/${brand}`);
    toast.success("Delete successfully!", {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default deleteBrand;
