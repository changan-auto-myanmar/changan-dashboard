import { File } from "lucide-react";
import { useState } from "react";
import EditcarDetail from "../../../api/cardetail/EditcarDetail";
// import { IoIosCloseCircleOutline } from "react-icons/io";

const brands = ["CHANGAN", "DEEPAL", "KAICHEN"];

function CarModelSectoin({ id, carData }) {
  // console.log("carData", carData);

  const [car_brand, setSelectedBrand] = useState(null);
  const [car_name, setCarName] = useState(null);
  const [car_slogan, setCarSlogan] = useState(null);
  const [mockup, setMockup] = useState(null);
  const [car_banner, setCarBanner] = useState(null);
  const [car_porche, setCarPorche] = useState(null);

  // console.log("carData", carData);

  const handleState = async () => {
    const formData = new FormData();

    car_brand && formData.append("car_brand", car_brand);
    car_name && formData.append("car_name", car_name);
    car_slogan && formData.append("car_slogan", car_slogan);
    mockup && formData.append("mockup", mockup);
    car_banner && formData.append("car_banner", car_banner);
    car_porche && formData.append("car_porche", car_porche);

    await EditcarDetail({ id, data: formData });
  };

  return (
    <div className="pr-4 pb-40">
      <div className="flex justify-between">
        <p className="banner-header">Car Brand</p>

        {/* <div className="flex justify-center space-x-4">
          <button className="upload" onClick={() => handleState()}>
            <MdDriveFolderUpload className="mr-2" size={20} />
            Save
          </button>
        </div> */}
      </div>

      <div>
        <div className="flex space-x-4 mt-5">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={
                  car_brand
                    ? car_brand === brand
                    : carData[0].car_brand === brand
                }
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
        <div className="flex space-x-4 mt-5">
          <div className="flex flex-col space-y-2 w-1/2">
            <label className="banner-header">Car Title</label>
            <input
              value={car_name !== null ? car_name : carData[0]?.car_name}
              // onChange={(e) => setCarName(e.target.value)}
              type="text"
              className="bg-gray-100 rounded-md px-6 py-4"
              placeholder="Enter Car Title"
              readOnly
            />
          </div>

          <div className="flex flex-col space-y-2 w-1/2">
            <label className="banner-header">Car Sologram (Optional)</label>
            <input
              value={car_slogan !== null ? car_slogan : carData[0]?.car_slogan}
              onChange={(e) => setCarSlogan(e.target.value)}
              type="text"
              className="bg-gray-100 rounded-md px-6 py-4"
              placeholder="Enter Car Sologram"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 p-6 rounded-lg box-dash">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-semibold mb-4">
            Select Car Banner Image
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
                onChange={(e) => setCarBanner(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div> */}
        </div>
        {car_banner && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(car_banner)}
              alt="Mockup"
              className="w-full h-64 object-cover"
            />
          </div>
        )}
        {car_banner === null && carData[0]?.car_banner && (
          <div className="mt-4">
            <img
              src={`${carData[0]?.car_banner?.url}`}
              alt="Mockup"
              className="w-full h-64 object-cover"
            />
          </div>
        )}
        <p className="text-sm text-gray-600 mt-4">
          Please upload image with file size less than 10MB.
        </p>
      </div>
      {/* ___________________________________________________________________________________________________________ */}
      <div className="flex mt-5 space-x-4">
        <div className="mx-auto mt-5 p-6 w-full rounded-lg box-dash">
          {mockup == null && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold mb-4">
                  Select Car Mock Up Image
                </h3>
                {/* <div className="flex flex-col items-center">
                  <label htmlFor="mockup-upload" className="cursor-pointer">
                    <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                      <MdDriveFolderUpload size={20} className="mr-2" />
                      Select Image
                    </span>
                    <input
                      id="mockup-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setMockup(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div> */}
              </div>
              <div className="relative my-2">
                <img
                  src={`${carData[0]?.mockup?.url}`} // Placeholder image for demonstration; replace with your image URL
                  alt="Car Mockup"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Please upload image with file size less than 10MB.
              </p>
            </div>
          )}
          {mockup && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold mb-4">
                  Select Car Mock Up Image
                </h3>
                {/* <div className="flex flex-col items-center">
                  <label htmlFor="mockup-upload" className="cursor-pointer">
                    <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                      <MdDriveFolderUpload size={20} className="mr-2" />
                      Select Image
                    </span>
                    <input
                      id="mockup-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setMockup(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div> */}
              </div>
              <div className="relative my-2">
                <img
                  src={URL.createObjectURL(mockup)} // Placeholder image for demonstration; replace with your image URL
                  alt="Car Banner"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Please upload image with file size less than 10MB.
              </p>
            </div>
          )}
        </div>
        {/* _____________________________________________ */}
        <div className="mx-auto mt-5 p-6 rounded-lg box-dash w-full">
          {car_porche == null && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold mb-4">
                  Select Car Brochure
                </h3>
                {/* <div className="flex flex-col items-center">
                  <label htmlFor="borochure-upload" className="cursor-pointer">
                    <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                      <MdDriveFolderUpload size={20} className="mr-2" />
                      Select File
                    </span>
                    <input
                      id="borochure-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setCarPorche(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div> */}
              </div>
              <div className="relative my-2 flex justify-center items-center h-48">
                <div
                  className="flex py-5 mx-10 px-10 bg-gray-100 rounded-md w-full justify-center items-center cursor-pointer"
                  onClick={() => {
                    window.open(`${carData[0]?.car_porche?.url}`, "_blank");
                  }}
                >
                  <File size={50} className="mr-20" />
                  <div className="">
                    <p className="font-bold text-[16px]">
                      {carData[0]?.car_porche?.filename}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Please upload file with file size less than 10MB.
              </p>
            </div>
          )}

          {car_porche && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold mb-4">
                  Select Car Brochure
                </h3>
                {/* <div className="flex flex-col items-center">
                    <label htmlFor="mockup-upload" className="cursor-pointer">
                      <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                        <MdDriveFolderUpload size={20} className="mr-2" />
                        Select Image
                      </span>
                      <input
                        id="mockup-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setMockup(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div> */}
              </div>
              <div className="relative my-2 flex justify-center items-center h-48">
                <div className="flex py-5 mx-10 px-10 bg-gray-100 rounded-md w-full justify-center items-center">
                  <File size={50} className="mr-20" />
                  <div className="">
                    <p className="font-bold text-[16px]">{car_porche?.name}</p>
                    <p className="text-[12px]">{car_porche?.size} KB</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Please upload file with file size less than 10MB.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default CarModelSectoin;
