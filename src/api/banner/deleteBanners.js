import { toast } from "sonner";
import axios from "./../../axios";

const deleteBanners = async (id) => {
  const toastId = toast.loading("Deleting...");
  try {
    const response = await axios.delete("api/v1/banners/" + id);
    toast.success("Delete Banner Image successfully!", {
      id: toastId,
      autoClose: 200, // Auto-close the toast after 5 seconds
    });
    return response.data;
  } catch (error) {
    toast.error(`${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default deleteBanners;
