import { toast } from "sonner";
import axios from "../../axios";

const EditcarDetail = async ({ id, data }) => {
  const toastId = toast.loading("Editing...");
  try {
    const response = await axios.put(`api/v1/showcase/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Edited successfully!", {
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

export default EditcarDetail;
