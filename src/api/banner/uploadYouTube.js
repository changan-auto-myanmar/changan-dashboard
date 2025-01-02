import { toast } from "sonner";
import axios from "./../../axios";

const uploadYouTube = async (data) => {
  const toastId = toast.loading("Uploading...");
  try {
    const response = await axios.post("api/v1/youtube", data);
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

export default uploadYouTube;
