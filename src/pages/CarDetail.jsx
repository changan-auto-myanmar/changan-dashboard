// HomePage.js
import { useEffect, useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import Changan from "../components/CarDetail/Changan";
import { useNavigate } from "react-router-dom";
import getAllCarDetail from "../api/cardetail/getAllCarDetail";

import "swiper/css";
import deleteCarDetail from "../api/cardetail/deletecarDetail";
import ConfirmationModal from "../components/ConfirmationModal";

const tabs = [
  {
    name: "CHANGAN",
    value: "CHANGAN",
  },
  {
    name: "DEEPAL",
    value: "DEEPAL",
  },
  {
    name: "KAICENE",
    value: "KAICHENG",
  },
];

// Sample dummy image URLss
const CarDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [CarDetailData, setCarDetailData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const getCarData = async (tab) => {
    setLoading(true);
    const res = await getAllCarDetail();
    if (res.code === 200) {
      setLoading(false);
      setCarDetailData(
        res.data.showcases.filter((cars) => cars.car_brand === tab.value)
      );
    }
  };

  const brandFilter = (tab) => {
    setActiveTab(tab.value);
    getCarData(tab);
  };

  const deleteCar = async (id) => {
    // console.log(id);
    const res = await deleteCarDetail(id);
    if (res.code === 200) {
      getCarData(activeTab);
      setDeleteId(null);
      setConfirmDeleteOpen(false);
    }
  };

  useEffect(() => {
    getCarData(tabs[0]);
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
                key={tab.value}
                className={`py-1 px-4 rounded-2xl text-[14px] font-semibold ${
                  activeTab === tab.value ? "bg-secondary text-primary" : "text-black"
                }`}
                onClick={() => brandFilter(tab)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              navigate("/home/car-detail/form");
            }}
            className={`flex items-center bg-primary text-white px-4 py-3 rounded-md  ${
              CarDetailData.length == 8
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 cursor-pointer active:scale-95 "
            }`}
            disabled={CarDetailData.length >= 8}
          >
            <MdDriveFolderUpload className="mr-2" size={20} />
            <span className="tabs-btn">Upload Car</span>
          </button>
        </div>

        {/* Car Detail Content */}
        <Changan
          data={CarDetailData}
          loading={loading}
          activeTab={activeTab}
          sentdeteleId={(id) => {
            setDeleteId(id);
            setConfirmDeleteOpen(true);
          }}
        />
      </div>

      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onConfirm={() => deleteCar(deleteId)}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  );
};

export default CarDetail;
