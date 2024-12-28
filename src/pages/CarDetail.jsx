// HomePage.js
import { useEffect, useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import Changan from "../components/CarDetail/Changan";
import { Link } from "react-router-dom";
import getAllCarDetail from "../api/cardetail/getAllCarDetail";

import "swiper/css";

const tabs = ["CHANGAN", "DEEPAL", "KAICHEN"];

// Sample dummy image URLs
const CarDetail = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [CarDetailData, setCarDetailData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(activeTab);

  // console.log(CarDetailData);

  const getCarData = async (tab) => {
    setLoading(true);
    const res = await getAllCarDetail();
    if (res.code === 200) {
      setLoading(false);
      setCarDetailData(
        res.data.showcases.filter((cars) => cars.car_brand === tab)
      );
    }

    // console.log(res);
  };

  const brandFilter = (tab) => {
    setActiveTab(tab);
    getCarData(tab);
  };

  useEffect(() => {
    getCarData("CHANGAN");
  }, []);

  return (
    <div className="mt-5">
      <span className="header my-4">Car Detail</span>

      <div className="mt-3 pe-5 pt-3">
        <div className="flex justify-between mb-2">
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`py-1 px-4 rounded-2xl text-[14px] font-semibold ${
                  activeTab === tab ? "bg-secondary text-primary" : "text-black"
                }`}
                onClick={() => brandFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <Link
            to="/home/car-detail/form"
            className="flex items-center bg-primary text-white px-4 py-3 rounded-md active:scale-95"
          >
            <MdDriveFolderUpload className="mr-2" size={20} />
            <span className="tabs-btn">Upload Image</span>
          </Link>
        </div>

        {/* Car Detail Content */}
        <Changan data={CarDetailData} loading={loading} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default CarDetail;
