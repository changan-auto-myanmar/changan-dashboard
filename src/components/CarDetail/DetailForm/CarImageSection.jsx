import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCarData, selectCarData } from "./../../../redux/carSlice";
import { toast } from "sonner";

function CarImageSection({ gotonext }) {
  const dispatch = useDispatch();
  const carData = useSelector(selectCarData);

  const [car_exterier, setExterier] = useState(carData?.car_exterier || []);
  const [car_interier, setInterier] = useState(carData?.car_interier || []);
  const [gallery, setGallery] = useState(carData?.gallery || []);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (car_exterier.length + files.length > 8) {
      toast.warning("You can only upload a maximum of 8 images.");
      return;
    }
    setExterier((prevImages) => [...prevImages, ...files]);
  };

  const handleInterierChange = (event) => {
    const files = Array.from(event.target.files);
    if (car_interier.length + files.length > 8) {
      toast.warning("You can only upload a maximum of 8 images.");
      return;
    }
    setInterier((prevImages) => [...prevImages, ...files]);
  };

  const handleGalleryChange = (event) => {
    const files = Array.from(event.target.files);
    if (gallery.length + files.length > 8) {
      toast.warning("You can only upload a maximum of 8 images.");
      return;
    }
    setGallery((prevImages) => [...prevImages, ...files]);
  };

  const handleState = () => {
    const data = {
      car_exterior: [...car_exterier],
      car_interior: [...car_interier],
      gallery: [...gallery],
    };
    dispatch(setCarData(data));
    toast.info("Car Image Save Successfully");
    setTimeout(() => {
      gotonext();
    }, []);
  };

  return (
    <div className="">
      <div>
        <div className="flex justify-end px-4">
          <div className="flex justify-center space-x-4">
            <button className="upload" onClick={() => handleState()}>
              <MdDriveFolderUpload className="mr-2" size={20} />
              Save
            </button>
          </div>
        </div>
        {/* Exterier */}
        <div>
          <div className="flex items-center">
            <p className="banner-header mr-2">Exterier</p>
            <p>{car_exterier.length} /8</p>
          </div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Multi Image For Exterier
                </h3>
                {car_exterier.length < 8 && (
                  <div className="flex flex-col items-center">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                        <MdDriveFolderUpload size={20} className="mr-2" />
                        Select Multi Image
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
                )}
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
            <p>{car_interier.length}/8</p>
          </div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Multi Image For Interier
                </h3>
                {car_interier.length < 8 && (
                  <div className="flex flex-col items-center">
                    <label htmlFor="interier-upload" className="cursor-pointer">
                      <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                        <MdDriveFolderUpload size={20} className="mr-2" />
                        Select Multi Image
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
                  </div>
                )}
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
            <p>{gallery.length}/3</p>
          </div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Multi Image For Car Gallery
                </h3>
                {gallery.length < 8 && (
                  <div className="flex flex-col items-center">
                    <label htmlFor="gallery-upload" className="cursor-pointer">
                      <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                        <MdDriveFolderUpload size={20} className="mr-2" />
                        Select Multi Image
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
                  </div>
                )}
              </div>
              {gallery && gallery.length > 0 && (
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
