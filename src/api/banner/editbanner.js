import { toast } from "sonner";
import axios from "./../../axios";

const editBanner = async ({ id, data }) => {
  const toastId = toast.loading("Uploading...");
  try {
    const response = await axios.patch(`api/v1/banners/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Uploaded successfully!", {
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

export default editBanner;
