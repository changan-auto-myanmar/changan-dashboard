import { Trash } from "lucide-react";
import { useState } from "react";
import { MdAddCircleOutline, MdDriveFolderUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EditcarDetail from "../../../api/cardetail/EditcarDetail";

function CarColorSection({ carData, id }) {
  console.log("carColor", carData);
  const navigate = useNavigate();
  const [carColorData, setcarColorData] = useState([]);
  const [colorName, setColorName] = useState("");
  const [colorImage, setcolorImage] = useState(null);
  const [carColorImage, setcarColorImage] = useState(null);

  const addColorData = () => {
    const data = {
      colorName,
      colorImage,
      carColorImage,
    };
    setcarColorData((prev) => [...prev, data]);
    setColorName("");
    setcolorImage(null);
    setcarColorImage(null);
  };

  // console.log("carColorData", carColorData);

  const carDetailUpload = async () => {
    const formData = new FormData();
    const colors = carColorData.map((item) => ({
      color_name: item.colorName,
    }));

    formData.append("car_color", JSON.stringify(colors));
    carColorData.forEach((item, index) => {
      formData.append(`car_color[${index}].car_image`, item.colorImage);
      formData.append(`car_color[${index}].car_color`, item.carColorImage);
    });

    // console.log("formData", formData);

    const res = await EditcarDetail({ id, data: formData });
    console.log("res", res);
    if (res.code === 201) {
      navigate("/home/car-detail");
    }
  };

  // console.log("carColorData", carColorData);

  return (
    <div className="pr-4">
      <div>
        <div className="flex justify-between items-center">
          <p className="banner-header">Car Color Model</p>
          {/* <button
            className={`upload ${carColorData.length > 0 ? "" : "opacity-50"}`}
            onClick={carDetailUpload}
            disabled={carColorData.length === 0}
          >
            <MdDriveFolderUpload className="mr-2" size={20} />
            Save & Upload
          </button> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {carData[0]?.car_color.length > 0 &&
          carData[0]?.car_color.map((carColor, index) => {
            return (
              <div key={index}>
                <div className="flex gap-8 items-center bg-gray-100 justify-between rounded-md py-4 px-5 mb-4 shadow-md border border-gray-300">
                  <div className="flex items-center">
                    <img
                      src={`${import.meta.env.VITE_API_URL}api/v1/${
                        carColor.car_color.filepath
                      }`}
                      alt=""
                      className="h-12 w-12 rounded-md mr-5"
                    />
                    <p>{carColor.color_name}</p>
                  </div>
                  {/* <button className="bg-danger text-white rounded-md px-2 h-8">
                    <Trash size={20} />
                  </button> */}
                </div>
              </div>
            );
          })}
        {carColorData.length > 0 &&
          carColorData.map((carColor, index) => {
            return (
              <div key={index}>
                <div className="flex shadow-md border border-gray-300 justify-between items-center bg-gray-100 rounded-md py-4 px-5 mb-4">
                  <div className="flex">
                    <img
                      src={URL.createObjectURL(carColor.colorImage)}
                      alt=""
                      className="h-12 w-12 rounded-md mr-5"
                    />
                    <p>{carColor.colorName}</p>
                  </div>
                  <button className="bg-danger text-white rounded-md px-2 h-8">
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      {/* <div className="flex justify-between items-center mt-5 mb-4">
        <div className="w-full flex justify-between items-center">
          <p className="banner-header">Color Name</p>
          <div className="flex justify-center space-x-4">
            <button
              className="flex items-center border border-primary bg-white text-primary text-[12px] semibold rounded-md px-7 py-2"
              onClick={addColorData}
            >
              <MdAddCircleOutline className="mr-2" size={20} />
              <span>Add Color</span>
            </button>
          </div>
        </div>
      </div> */}

      {/* <div className="flex flex-col mt-2">
        <input
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          type="text"
          className="bg-gray-100 rounded-md px-6 py-4 w-1/2"
          placeholder="Enter Color Name"
        />
      </div>
      <div className="flex space-x-4 mt-5">
        <div className="mx-auto mt-5 p-6 w-1/2 rounded-lg box-dash">
          {colorImage == null && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <h3 className="text-[16px] font-semibold">Select Color Images</h3>
              <div className="flex flex-col items-center justify-center">
                <label htmlFor="mockup-upload" className="cursor-pointer">
                  <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                    <MdDriveFolderUpload size={20} className="mr-2" />
                    Select Image
                  </span>
                  <input
                    id="mockup-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setcolorImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600">
                Please upload image with file size less than 10MB.
              </p>
            </div>
          )}
          {colorImage && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold mb-4">
                  Select Car Mock Up Image
                </h3>
                <div className="flex flex-col items-center">
                  <label htmlFor="mockup-upload" className="cursor-pointer">
                    <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                      <MdDriveFolderUpload size={20} className="mr-2" />
                      Select Image
                    </span>
                    <input
                      id="mockup-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setcolorImage(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="relative my-2">
                <img
                  src={URL.createObjectURL(colorImage)} // Placeholder image for demonstration; replace with your image URL
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

        <div className="mx-auto mt-5 p-6 w-1/2 rounded-lg box-dash">
          {carColorImage == null && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <h3 className="text-[16px] font-semibold">Select Color Images</h3>
              <div className="flex flex-col items-center justify-center">
                <label htmlFor="car-upload" className="cursor-pointer">
                  <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                    <MdDriveFolderUpload size={20} className="mr-2" />
                    Select Image
                  </span>
                  <input
                    id="car-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setcarColorImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600">
                Please upload image with file size less than 10MB.
              </p>
            </div>
          )}
          {carColorImage && (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold mb-4">
                  Select Car Mock Up Image
                </h3>
                <div className="flex flex-col items-center">
                  <label htmlFor="mockup-upload" className="cursor-pointer">
                    <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                      <MdDriveFolderUpload size={20} className="mr-2" />
                      Select Image
                    </span>
                    <input
                      id="mockup-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setcarColorImage(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="relative my-2">
                <img
                  src={URL.createObjectURL(carColorImage)} // Placeholder image for demonstration; replace with your image URL
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
      </div> */}
    </div>
  );
}
export default CarColorSection;
