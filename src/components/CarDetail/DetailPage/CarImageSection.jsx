import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCarData, selectCarData } from "./../../../redux/carSlice";
import { toast } from "sonner";
import EditcarDetail from "../../../api/cardetail/EditcarDetail";

function CarImageSection({ carData, id }) {
  const [car_exterier, setExterier] = useState([]);
  const [car_interier, setInterier] = useState([]);
  const [gallery, setGallery] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setExterier((prevImages) => [...prevImages, ...files]);
  };

  const handleInterierChange = (event) => {
    const files = Array.from(event.target.files);
    setInterier((prevImages) => [...prevImages, ...files]);
  };

  const handleGalleryChange = (event) => {
    const files = Array.from(event.target.files);
    setGallery((prevImages) => [...prevImages, ...files]);
  };

  const handleState = async () => {
    const formData = new FormData();
    car_exterier.forEach((item) => {
      formData.append("car_exterior", item);
    });
    car_interier.forEach((item) => {
      formData.append("car_interior", item);
    });
    gallery.forEach((item) => {
      formData.append("gallery", item);
    });

    await EditcarDetail({ id, data: formData });
  };

  return (
    <div className="overflow-y-auto h-[420px]">
      <div>
        {/* <div className="flex justify-end px-4">
          <div className="flex justify-center space-x-4">
            <button className="upload" onClick={() => handleState()}>
              <MdDriveFolderUpload className="mr-2" size={20} />
              Save
            </button>
          </div>
        </div> */}
        {/* Exterier */}
        <div>
          <div className="flex items-center">
            <p className="banner-header mr-2">Exterier</p>
            <p>{carData[0].car_exterior.length}/3</p>
          </div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Image For Exterier
                </h3>
                {/* <div className="flex flex-col items-center">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                      <MdDriveFolderUpload size={20} className="mr-2" />
                      Select Image
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div> */}
              </div>
              {car_exterier && car_exterier.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {car_exterier.map((image, index) => (
                    <div key={index} className="w-[230px] h-[230px]">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Exterier ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}
              {carData[0].car_exterior.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {carData[0].car_exterior.map((image, index) => (
                    <div key={index} className="w-[230px] h-[230px]">
                      <img
                        src={`${import.meta.env.VITE_API_URL}api/v1/${
                          image?.filepath
                        }`}
                        alt={`Exterier ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-600 mt-5">
                Please upload image with file size less than 10MB.
              </p>
            </div>
          </div>
        </div>
        {/* Interier */}
        <div className="mt-5">
          <div className="flex items-center">
            <p className="banner-header mr-2">Interier</p>
            <p>{carData[0].car_interior.length}/3</p>
          </div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Image For Interior
                </h3>
                {/* <div className="flex flex-col items-center">
                  <label htmlFor="interier-upload" className="cursor-pointer">
                    <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                      <MdDriveFolderUpload size={20} className="mr-2" />
                      Select Image
                    </span>
                    <input
                      id="interier-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleInterierChange}
                      className="hidden"
                    />
                  </label>
                </div> */}
              </div>
              {car_interier && car_interier.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {car_interier.map((image, index) => (
                    <div key={index} className="w-[230px] h-[230px]">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Exterier ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}
              {carData[0]?.car_interior.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {carData[0].car_interior.map((image, index) => (
                    <div key={index} className="w-[230px] h-[230px]">
                      <img
                        src={`${import.meta.env.VITE_API_URL}api/v1/${
                          image?.filepath
                        }`}
                        alt={`Interior ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-600 mt-5">
                Please upload image with file size less than 10MB.
              </p>
            </div>
          </div>
        </div>
        {/* Gallery */}
        <div className="mt-5">
          <div className="flex items-center">
            <p className="banner-header mr-2">Gallery</p>
            <p>{carData[0]?.gallery.length}/3</p>
          </div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Image For Content
                </h3>
                {/* <div className="flex flex-col items-center">
                  <label htmlFor="gallery-upload" className="cursor-pointer">
                    <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                      <MdDriveFolderUpload size={20} className="mr-2" />
                      Select Image
                    </span>
                    <input
                      id="gallery-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryChange}
                      className="hidden"
                    />
                  </label>
                </div> */}
              </div>
              {gallery && gallery.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {gallery.map((image, index) => (
                    <div key={index} className="w-[230px] h-[230px]">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`interior ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}
              {carData[0]?.gallery.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {carData[0].gallery.map((image, index) => (
                    <div key={index} className="w-[230px] h-[230px]">
                      <img
                        src={`${import.meta.env.VITE_API_URL}api/v1/${
                          image.filepath
                        }`}
                        alt={`gallery ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-600 mt-5">
                Please upload image with file size less than 10MB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarImageSection;
