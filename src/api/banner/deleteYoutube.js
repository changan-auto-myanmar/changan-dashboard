import { toast } from "sonner";
import axios from "./../../axios";

const deleteYoutube = async (id) => {
  const toastId = toast.loading("Deleting...");
  try {
    const response = await axios.delete("api/v1/youtube/" + id);
    toast.success("Delete Vedio successfully!", {
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

export default deleteYoutube;
