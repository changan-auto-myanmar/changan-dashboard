// HomePage.js
import { useState } from "react";
import Home from "../components/ImageVedio/Home";
import Youtube from "../components/ImageVedio/Youtube";
import BrandOverview from "../components/ImageVedio/BrandOverview";
import "swiper/css";

const tabs = ["Car Models", "Banner", "Videos"];

const ImageVedio = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="mt-5">
      <span className="header my-4">Images & Videos</span>

      <div className="mt-3 pe-5 pt-5">
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

        <div>{activeTab === tabs[1] && <Home />}</div>
        <div>{activeTab === tabs[0] && <BrandOverview />}</div>
        <div>{activeTab === tabs[2] && <Youtube />}</div>
      </div>
    </div>
  );
};

export default ImageVedio;
