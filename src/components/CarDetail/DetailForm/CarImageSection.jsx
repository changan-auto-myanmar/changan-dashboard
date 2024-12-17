import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";

function CarImageSection() {
  const [exterier, setExterier] = useState([]);
  const [interier, setInterier] = useState([]);
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
  return (
    <div className="overflow-y-auto h-[420px]">
      <div>
        {/* Exterier */}
        <div>
          <div className="flex items-center">
            <p className="banner-header mr-2">Exterier</p>
            <p>2/3</p>
          </div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Image For Content
                </h3>
                <div className="flex flex-col items-center">
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
                </div>
              </div>
              {exterier.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {exterier.map((image, index) => (
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
              {exterier.length === 0 && (
                <p className="text-sm text-gray-600 mt-5">
                  Please upload image with file size less than 10MB.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Interier */}
        <div className="mt-5">
          <div className="flex items-center">
            <p className="banner-header mr-2">Interier</p>
            <p>2/3</p>
          </div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Image For Content
                </h3>
                <div className="flex flex-col items-center">
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
                      onChange={handleInterierChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {interier.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {interier.map((image, index) => (
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
              {interier.length === 0 && (
                <p className="text-sm text-gray-600 mt-5">
                  Please upload image with file size less than 10MB.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Gallery */}
        <div className="mt-5">
          <div className="flex items-center">
            <p className="banner-header mr-2">Gallery</p>
            <p>2/3</p>
          </div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Image For Content
                </h3>
                <div className="flex flex-col items-center">
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
                      onChange={handleGalleryChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {gallery.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {gallery.map((image, index) => (
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
              {gallery.length === 0 && (
                <p className="text-sm text-gray-600 mt-5">
                  Please upload image with file size less than 10MB.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarImageSection;
