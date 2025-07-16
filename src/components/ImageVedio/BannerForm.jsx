import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDriveFolderUpload } from "react-icons/md";

import uploadBanners from "../../api/banner/uploadBanner";

function BannerForm({ onclose }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUploadImage = async () => {
    const data = {
      url: selectedImage,
    };
    // Handle upload image logic
    const res = await uploadBanners(data);
    // console.log(res);
    if (res.code === 201) {
      onclose();
    }
  };

  return (
    <div>
      <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-[90%] lg:w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          </div>
          {selectedImage ? (
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
                {selectedImage !== null && (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-full h-full rounded-md object-cover mb-2"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="mb-[50px]">
              <div className=" h-[200px] flex items-center justify-center p-1 mx-auto">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-[16px] text-center mb-3">
                    Select Image to upload
                  </p>
                  <div>
                    <div className="flex flex-col items-center">
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
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="text-gray-500 text-sm text-center mb-3">
            Please upload images size less than 10MB.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="cancel"
              onClick={onclose}
              // onClick={() => setFormOpen(false)}
            >
              <IoIosCloseCircleOutline size={20} className="mr-2" />
              Cancel
            </button>
            <button className="upload" onClick={handleUploadImage}>
              <MdDriveFolderUpload className="mr-2" size={20} />
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerForm;
