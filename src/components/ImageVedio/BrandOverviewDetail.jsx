import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

import "./../CarDetail/detailform.css";
import { useNavigate, useParams } from "react-router-dom";
import { MdDriveFolderUpload } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Trash2Icon } from "lucide-react";
// import uploadBrandOverview from "../../api/brandoverview/uploadBrandOverview";
import getABrandOverview from "../../api/brandoverview/getABrandOverview";
import updateBrandOverview from "../../api/brandoverview/updateBrandOverview";
import deleteBrandOverview from "../../api/brandoverview/deletebrandOverview";
import ConfirmationModal from "../ConfirmationModal";
// import getBrandOverview from "../../api/brandoverview/getBrandOverview";

const brands = ["CHANGAN", "DEEPAL", "KAICHENG"];

const BrandOverviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car_brand, setSelectedBrand] = useState(null);
  const [car_exterier, setExterier] = useState([]);
  const [images, setImages] = useState([]);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const gatBrandOverview = async () => {
    const res = await getABrandOverview(id);
    console.log("res", res);
    if (res.code === 200) {
      setSelectedBrand(res.data.brandOverview?.car_brand);
      setExterier(res.data.brandOverview?.images);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  //   console.log("car_exterier", car_exterier);

  const handleRemoveImage = (index) => {
    const updatedImages = [...car_exterier];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleUpload = async () => {
    const data = new FormData();
    console.log("images", images);
    images.forEach((image) => {
      data.append("images", image);
    });
    // console.log("formData", data);

    await updateBrandOverview({ id, data });
  };

  const handleDeleteImage = async () => {
    console.log(deleteId);
    const res = await deleteBrandOverview({ id, deleteId });
    console.log("res", res);
    if (res.code === 200) {
      // console.log("work");
      setExterier(res.data.brandOverview?.images);
      navigate("/home/image-vedio");
      setConfirmDeleteOpen(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    gatBrandOverview();
  }, []);

  return (
    <div>
      <div className="mt-1">
        <button
          className="flex items-center space-x-2 hover:text-primary"
          onClick={() => {
            navigate("/home/image-vedio");
          }}
        >
          <BiArrowBack size={40} className="font-bold" />
          <span className="header my-4">Edit Brand Overview</span>
        </button>
      </div>

      <div className="p-4 bg-white rounded-lg h-screen overflow-y-auto pb-[200px]">
        <div className="flex justify-between items-center">
          <p className="banner-header mb-5">Car Brand</p>
          <div className="flex gap-4">
            <button
              className="cancel"
              onClick={() => {
                setSelectedBrand(null);
                setExterier([]);
              }}
              // onClick={() => setFormOpen(false)}
            >
              <IoIosCloseCircleOutline size={20} className="mr-2" />
              Cancel
            </button>
            <button className="upload" onClick={handleUpload}>
              <MdDriveFolderUpload className="mr-2" size={20} />
              Update
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          {/* Tab Navigation */}
          <div className="flex space-x-4">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={car_brand === brand}
                  className="checkbox"
                  // onChange={() => setSelectedBrand(brand)}
                  readOnly
                />
                <label className="font-medium">{brand}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Image For Content
                </h3>
                <div className="flex flex-col items-center">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span
                      className={`bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300 ${
                        car_exterier.length == 8
                          ? "opacity-50 cursor-not-allowed"
                          : "opacity-100 cursor-pointer"
                      }`}
                    >
                      <MdDriveFolderUpload size={20} className="mr-2" />
                      Select Multi Image
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={car_exterier.length == 8}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4 ">
                {car_exterier.length > 0 &&
                  car_exterier.map((image, index) => (
                    <div key={index} className="w-[230px] h-[230px] relative">
                      <img
                        src={`${import.meta.env.VITE_API_URL}api/v1/${
                          image.filepath
                        }`}
                        alt={`Exterier ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        className="absolute top-2 right-2 bg-danger text-white p-2 rounded-md hover:text-red-700"
                        onClick={() => {
                          setConfirmDeleteOpen(true);
                          setDeleteId(image._id);
                        }}
                      >
                        <Trash2Icon size={20} />
                      </button>
                    </div>
                  ))}
                {images.map((image, index) => (
                  <div key={index} className="w-[230px] h-[230px] relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Exterier ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      className="absolute top-2 right-2 bg-danger text-white p-2 rounded-md hover:text-red-700"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Trash2Icon size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600 mt-5">
                Please upload image with file size less than 10MB.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onConfirm={handleDeleteImage}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  );
};

export default BrandOverviewDetail;
