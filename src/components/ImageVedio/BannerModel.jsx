import { CrossIcon, Trash2Icon } from "lucide-react";
// import React from 'react'
import { IoCheckmarkSharp } from "react-icons/io5";
import editBanner from "../../api/banner/editbanner";
import deleteBanners from "../../api/banner/deleteBanners";
import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";

function BannerModel({ selectedImage, onclose }) {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUploadedImage(file);
  };

  const handleDeleteImage = async (id) => {
    // Handle delete image logic
    const res = await deleteBanners(id);
    if (res.code === 200) {
      onclose();
    }
  };

  const handleUploadImage = async (id) => {
    const data = {
      image: uploadedImage,
    };
    // Handle upload image logic
    const res = await editBanner({ id, data });
    // console.log(res);
    if (res.code === 200) {
      onclose();
    }
  };
  // console.log(selectedImage);
  return (
    <div>
      <div
        className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50"
        // onClick={onclose}
      >
        <div className="bg-white rounded-lg p-6 w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-4">Edit Image</h2>
          </div>
          <div className="mb-[50px]">
            <div className="h-[200px] mx-auto relative">
              {/* upload btn */}
              <div className="flex flex-col items-center absolute right-2 top-2">
                <label htmlFor="edit-upload" className="cursor-pointer">
                  <span className="bg-white flex items-center text-[12px] justify-center px-4 py-2 border-2 border-blue-500 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
                    <AiOutlineUpload className="mr-2" />
                    Select Image
                  </span>
                  <input
                    id="edit-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {!uploadedImage && (
                <img
                  src={`${import.meta.env.VITE_API_URL}api/v1/${
                    selectedImage.filepath
                  }`}
                  alt="Selected"
                  className="w-full h-full rounded-md object-cover mb-2"
                />
              )}

              {uploadedImage && (
                <img
                  src={URL.createObjectURL(uploadedImage)}
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
            <button
              className="delete"
              onClick={() => onclose()}
              // onClick={() => handleDeleteImage(selectedImage._id)}
            >
              {/* <Cancel size={20} className="mr-2" /> */}
              Cancel
            </button>
            <button
              className="upload"
              onClick={() => handleUploadImage(selectedImage._id)}
            >
              <IoCheckmarkSharp size={20} className="mr-2" />
              Confirm Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerModel;
