import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDriveFolderUpload } from "react-icons/md";
import "./detailform.css";
import CarModelSectoin from "./DetailForm/CarModelSectoin";
import CarColorSection from "./DetailForm/CarColorSection";
import CarImageSection from "./DetailForm/CarImageSection";

const tabs = ["Car Model", "Color", "Image"];

function DetailForm() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <div className="mt-1">
        <div className="flex items-center space-x-2">
          <BiArrowBack size={40} className="font-bold" />
          <span className="header my-4">Upload Car</span>
        </div>
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
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex justify-center space-x-4">
            <button className="cancel">
              <IoIosCloseCircleOutline size={20} className="mr-2" />
              Cancel
            </button>
            <button className="upload">
              <MdDriveFolderUpload className="mr-2" size={20} />
              Upload Car
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-[420px]">
          <div>{activeTab === tabs[0] && <CarModelSectoin />}</div>
          <div>{activeTab === tabs[1] && <CarColorSection />}</div>
          <div>{activeTab === tabs[2] && <CarImageSection />}</div>
        </div>
      </div>
    </div>
  );
}

export default DetailForm;
