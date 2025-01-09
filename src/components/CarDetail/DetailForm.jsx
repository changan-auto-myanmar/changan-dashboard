import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import CarModelSectoin from "./DetailForm/CarModelSectoin";
import CarColorSection from "./DetailForm/CarColorSection";
import CarImageSection from "./DetailForm/CarImageSection";

import "./detailform.css";
import { useNavigate } from "react-router-dom";

const tabs = ["Car Model", "Image", "Color"];

const DetailForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleUploadClick = (tab) => {
    setActiveTab(tab);
    // callChildFunction();
  };

  return (
    <div>
      <div className="mt-1">
        <button
          className="flex items-center space-x-2 hover:text-primary"
          onClick={() => {
            navigate("/home/car-detail");
          }}
        >
          <BiArrowBack size={40} className="font-bold" />
          <span className="header my-4">Upload Car</span>
        </button>
      </div>

      <div className="p-4 bg-white rounded-lg">
        <div className="flex justify-between items-center">
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`py-1 px-4 rounded-2xl text-[14px] font-semibold ${
                  activeTab === tab ? "bg-secondary text-primary" : "text-black"
                }`}
                onClick={() => handleUploadClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto h-screen pb-[200px]">
          <div>
            {activeTab === tabs[0] && (
              <CarModelSectoin gotonext={() => handleUploadClick("Image")} />
            )}
          </div>
          <div>
            {activeTab === tabs[1] && (
              <CarImageSection gotonext={() => handleUploadClick("Color")} />
            )}
          </div>
          <div>{activeTab === tabs[2] && <CarColorSection />}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailForm;
