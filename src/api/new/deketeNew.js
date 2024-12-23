import { toast } from "sonner";
import axios from "./../../axios";

const deleteNew = async (id) => {
  const toastId = toast.loading("Deleting...");

  try {
    const response = await axios.delete("api/v1/csr/" + id);
    toast.success("Deleted successfully", {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
    return response.data;
  } catch (error) {
    toast.error("Error deleting", {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
    console.log(error);
  }
};

export default deleteNew;
