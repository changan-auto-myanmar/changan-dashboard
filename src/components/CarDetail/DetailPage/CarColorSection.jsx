import { Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CarColorSection({ carData }) {
  // console.log("carColor", carData);
  const [carColorData, setcarColorData] = useState([]);

  // const addColorData = () => {
  //   const data = {
  //     colorName,
  //     colorImage,
  //     carColorImage,
  //   };
  //   setcarColorData((prev) => [...prev, data]);
  //   setColorName("");
  //   setcolorImage(null);
  //   setcarColorImage(null);
  // };

  // console.log("carColorData", carColorData);

  // const carDetailUpload = async () => {
  //   const formData = new FormData();
  //   const colors = carColorData.map((item) => ({
  //     color_name: item.colorName,
  //   }));

  //   formData.append("car_color", JSON.stringify(colors));
  //   carColorData.forEach((item, index) => {
  //     formData.append(`car_color[${index}].car_image`, item.colorImage);
  //     formData.append(`car_color[${index}].car_color`, item.carColorImage);
  //   });

  //   // console.log("formData", formData);

  //   const res = await EditcarDetail({ id, data: formData });
  //   console.log("res", res);
  //   if (res.code === 201) {
  //     navigate("/home/car-detail");
  //   }
  // };

  // console.log("carColorData", carColorData);

  return (
    <div className="pr-4 pb-40">
      <div>
        <div className="flex justify-between items-center">
          <p className="banner-header">Car Color Model</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {carData[0]?.car_color.length > 0 &&
          carData[0]?.car_color.map((carColor, index) => {
            // console.log("carColor", carColor);
            return (
              <div key={index}>
                <div className="flex gap-8 items-center bg-gray-100 justify-between rounded-md py-4 px-5 mb-4 shadow-md border border-gray-300">
                  <div className="flex items-center">
                    <img
                      src={`${carColor.car_color_swatches?.url}`}
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
    </div>
  );
}
export default CarColorSection;
