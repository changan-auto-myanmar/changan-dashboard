// HomePage.js
import { useState } from "react";
import "swiper/css";
import { MdDriveFolderUpload } from "react-icons/md";
import Changan from "../components/CarDetail/Changan";
import Deepin from "../components/CarDetail/Deepin";
import Kaichen from "../components/CarDetail/Kaichen";
import { Link } from "react-router-dom";
// import "swiper/swiper-bundle.min.css"; // Import Swiper styles

const tabs = ["CHANGAN", "DEEPEL", "KAICHEN"];

// Sample dummy image URLs
const sampleImages = [
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const CarDetail = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

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
                onClick={() => setActiveTab(tab)}
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
        <Changan data={sampleImages} />
      </div>
    </div>
  );
};

export default CarDetail;
