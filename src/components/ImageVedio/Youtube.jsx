import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdDriveFolderUpload } from "react-icons/md";
import { Trash2Icon } from "lucide-react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { AiOutlineUpload } from "react-icons/ai";
// import deleteyoutube from "../../api/ban/deleteyoutube";
import Loading from "../Loading";
import YoutubeForm from "./YouTubeForm";
import getYoutube from "../../api/banner/getYouTube";

function Youtube() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  // const [youtube, setyoutube] = useState([]);
  const [youtube, setYoutube] = useState([]);
  const [loading, setLoading] = useState(true);
  const videos = [
    { id: "6gSQkAwpJgY", title: "Video Title 1" },
    { id: "EulEQ_1-Ufs", title: "Video Title 2" },
    { id: "zjCyJUlkyjU", title: "Video Title 3" },
    { id: "SqoZqG4Ja5Y", title: "Video Title 4" },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getyoutube = async () => {
    setLoading(true);
    const res = await getYoutube();
    if (res.code === 200) {
      setYoutube(res.data.video_id.reverse());
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormOpen(false);
    getyoutube();
  };

  const handleDeleteImage = async (id) => {
    // Handle delete image logic
    const res = await deleteyoutube(id);
    if (res.code === 200) {
      getyoutube();
    }
  };

  const handleUploadImage = () => {
    // Handle upload image logic
    closeModal();
  };

  useEffect(() => {
    getyoutube();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg ">
      <div className="flex justify-between">
        <div className="">
          <span className="banner-header mt-5">Youtube Vedio</span>
          <span className="font-semibold text-[16px] ms-5">
            {youtube.length}/<span className="text-gray-500">8</span>
          </span>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className={`flex items-center bg-primary text-white px-4 py-3 rounded-md active:scale-95 ${
            youtube.length >= 8
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
          disabled={youtube.length >= 8}
        >
          <MdDriveFolderUpload className="mr-2" size={20} />
          <span className="tabs-btn">Upload Youtube Link</span>
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[350px]">
          <Loading />
        </div>
      ) : (
        <div className="overflow-y-auto mt-2 h-screen">
          <div className="grid grid-cols-2 gap-10 my-5">
            {youtube.map((video) => (
              <div key={video._id} className="relative">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.video_id}`}
                  // title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold mb-4">Edit Image</h2>
            </div>
            <div className="mb-[50px]">
              <div className="h-[200px] mx-auto relative">
                {/* upload btn */}
                <div className="flex flex-col items-center absolute right-2 top-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="bg-white flex items-center text-[12px] justify-center px-4 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
                      <AiOutlineUpload className="mr-2" />
                      Select Image
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {!uploadedImage && selectedImage !== null && (
                  <img
                    src={`https://changan-automobile.onrender.com/api/v1/${youtube[selectedImage].filepath}`}
                    alt="Selected"
                    className="w-full h-full rounded-md object-cover mb-2"
                  />
                )}

                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-full rounded-md object-cover mb-2"
                  />
                )}
              </div>
            </div>
            <p className="text-gray-500 text-sm text-center mb-3">
              Please upload images size less than 10MB.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="delete" onClick={handleDeleteImage}>
                <Trash2Icon size={20} className="mr-2" />
                Delete Image
              </button>
              <button className="upload" onClick={handleUploadImage}>
                <IoCheckmarkSharp size={20} className="mr-2" />
                Confirm Edit
              </button>
              {/* <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button> */}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isFormOpen && <YoutubeForm onclose={closeModal} />}
    </div>
  );
}

export default Youtube;
