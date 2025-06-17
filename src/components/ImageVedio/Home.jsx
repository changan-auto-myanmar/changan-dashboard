import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdDriveFolderUpload } from "react-icons/md";
import { Trash2Icon } from "lucide-react";
//api
import getAllBanner from "../../api/banner/getBanner";
import deleteBanners from "../../api/banner/deleteBanners";
// components
import BannerForm from "./BannerForm";
import Loading from "../Loading";
import BannerModel from "./BannerModel";
import ConfirmationModal from "../ConfirmationModal";

function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Confirmation state
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  const getBanners = async () => {
    setLoading(true);
    const res = await getAllBanner();
    // console.log("res", res);
    if (res.code === 200) {
      setBanners(res.data.banners.reverse());
      setLoading(false);
    }
  };

  // console.log("banners", banners);

  const closeModal = () => {
    setModalOpen(false);
    setFormOpen(false);
    getBanners();
  };

  const handleDeleteImage = (id) => {
    setBannerToDelete(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    const res = await deleteBanners(bannerToDelete);
    if (res.code === 200) {
      getBanners();
    }
    setConfirmDeleteOpen(false);
    setBannerToDelete(null);
  };

  const cancelDelete = () => {
    setConfirmDeleteOpen(false);
    setBannerToDelete(null);
  };

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex justify-between">
        <div className="">
          <span className="banner-header mt-5">Banner Images</span>
          <span className="font-semibold text-[16px] ms-5">
            {banners.length}/<span className="text-gray-500">5</span>
          </span>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className={`flex items-center bg-primary text-white px-4 py-3 rounded-md active:scale-95 ${
            banners.length >= 5
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
          disabled={banners.length >= 5}
        >
          <MdDriveFolderUpload className="mr-2" size={20} />
          <span className="tabs-btn">Upload Image</span>
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[350px]">
          <Loading />
        </div>
      ) : (
        <div className="overflow-y-auto mt-2 h-screen pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-5 pb-[200px]">
            {banners.map((image, index) => (
              <div
                className="w-full h-72 relative rounded-lg overflow-hidden images"
                key={index}
              >
                <div className="absolute flex gap-3 top-0 right-0 p-2 z-10">
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setSelectedImage(image);
                    }}
                    className="py-3 px-3 rounded-2xl text-[14px] bg-secondary text-primary flex items-center font-semibold rounded-md hover:scale-105 active:scale-95"
                  >
                    <MdOutlineEdit className="mr-2" size={20} />
                    <span className="tabs-btn">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image._id)}
                    className="py-3 px-3 rounded-2xl text-[14px] bg-danger text-white flex items-center font-semibold rounded-md hover:scale-105 active:scale-95"
                  >
                    <Trash2Icon className="" size={20} />
                  </button>
                </div>
                <img
                  src={`${image.url}`}
                  loading="lazy"
                  alt="img"
                  className="w-full h-72 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for editing */}
      {isModalOpen && (
        <BannerModel selectedImage={selectedImage} onclose={closeModal} />
      )}

      {/* Modal for uploading */}
      {isFormOpen && <BannerForm onclose={closeModal} />}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}

export default Home;
