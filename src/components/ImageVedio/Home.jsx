import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdDriveFolderUpload } from "react-icons/md";
import { Trash2Icon } from "lucide-react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineUpload } from "react-icons/ai";

function Home({ data }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);

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

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  const handleDeleteImage = () => {
    // Handle delete image logic
    closeModal();
  };

  const handleUploadImage = () => {
    // Handle upload image logic
    closeModal();
  };

  return (
    <div className="p-4 bg-white rounded-lg ">
      <div className="flex justify-between">
        <div className="">
          <span className="banner-header mt-5">Banner Images</span>
          <span className="font-semibold text-[16px] ms-5">
            5/<span className="text-gray-500">8</span>
          </span>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center bg-primary text-white px-4 py-3 rounded-md active:scale-95"
        >
          <MdDriveFolderUpload className="mr-2" size={20} />
          <span className="tabs-btn">Upload Image</span>
        </button>
      </div>
      <div className="overflow-y-auto mt-2 h-[350px]">
        <div className="grid grid-cols-2 gap-10 my-5">
          {data.map((image, index) => (
            <div
              className="w-full h-72 relative rounded-lg overflow-hidden images"
              key={index}
            >
              <div className="absolute top-0 right-0 p-2 z-10">
                <button
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedImage(index);
                  }}
                  className="py-3 px-3 rounded-2xl text-[14px] bg-secondary text-primary flex items-center font-semibold rounded-md hover:scale-105 active:scale-95"
                >
                  <MdOutlineEdit className="mr-2" size={20} />
                  <span className="tabs-btn">Edit</span>
                </button>
              </div>
              <img src={image} alt="img" className="w-full h-72 object-cover" />
            </div>
          ))}
        </div>
      </div>

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
                    src={data[selectedImage]}
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
      {isFormOpen && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            </div>
            <div className="mb-[50px]">
              <div className=" h-[200px] flex items-center justify-center p-1 mx-auto">
                {/* <div className=" h-full border border-dashed border-gray-100 rounded-md flex items-center justify-center"> */}
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-[16px] text-center mb-3">
                    Select Image to upload
                  </p>
                  <button
                    className="flex items-center border border-primary text-primary text-sm px-4 py-2 rounded-md"
                    onClick={handleUploadImage}
                  >
                    <FaImages className="mr-2" />
                    Select Image
                  </button>
                </div>
                {/* </div> */}
              </div>
            </div>
            <p className="text-gray-500 text-sm text-center mb-3">
              Please upload images size less than 10MB.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="cancel"
                // onClick={closeModal}
                onClick={() => setFormOpen(false)}
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
      )}
    </div>
  );
}

export default Home;
