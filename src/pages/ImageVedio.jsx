// HomePage.js
import { useState } from "react";
import "swiper/css";
import Home from "../components/ImageVedio/Home";
import CarModel from "../components/ImageVedio/CarModel";
import AboutUs from "../components/ImageVedio/AboutUs";
import Services from "../components/ImageVedio/Services";
import ContactUs from "../components/ImageVedio/ContactUs";
import Youtube from "../components/ImageVedio/Youtube";
// import "swiper/swiper-bundle.min.css"; // Import Swiper styles

const tabs = ["Home", "Car Models", "Videos"];

// Sample dummy image URLs
const sampleImages = [
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800",
];

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

        <div>{activeTab === tabs[0] && <Home data={sampleImages} />}</div>
        <div>{activeTab === tabs[1] && <CarModel />}</div>
        <div>{activeTab === tabs[2] && <Youtube />}</div>
      </div>
    </div>
  );
};

export default ImageVedio;
