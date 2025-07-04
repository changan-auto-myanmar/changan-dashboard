// HomePage.js
import { useEffect, useState } from "react";
import "swiper/css";
import { MdDriveFolderUpload, MdOutlineEdit } from "react-icons/md";

import { Link } from "react-router-dom";
import getAllNew from "../api/new/getAllNew";
import Loading from "../components/Loading";
import { Trash2Icon } from "lucide-react";
import deleteNew from "../api/new/deketeNew";
import ConfirmationModal from "../components/ConfirmationModal";
// import "swiper/swiper-bundle.min.css"; // Import Swiper styles

const tabs = ["All", "News", "Events", "Promotions"];

// Sample dummy image URLs

const NewAndEvent = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterNew, setFilterNew] = useState([]);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [id, setId] = useState(null);

  const fetchNews = async () => {
    const res = await getAllNew();
    if (res.code === 200) {
      setLoading(false);
    }
    // console.log(res.data.csrContents);
    setNews(res.data.csrContents);
    setFilterNew(res.data.csrContents);
  };

  const deleteNewEvent = async () => {
    const res = await deleteNew(id);
    // console.log(res);
    if (res.code === 200) {
      fetchNews();
      setConfirmDeleteOpen(false);
      setId(null);
    }
  };

  const filterCategory = (category) => {
    if (category === "All") {
      setFilterNew(news);
      return;
    }
    return setFilterNew(news.filter((item) => item.category === category));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="mt-5">
      <span className="header my-4">News And Events</span>

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
                onClick={() => {
                  setActiveTab(tab);
                  filterCategory(tab);
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <Link
            to="/home/new/form"
            className="flex items-center bg-primary text-white px-4 py-3 rounded-lg active:scale-95"
          >
            <MdDriveFolderUpload className="mr-0 lg:mr-2" size={20} />
            <span className="tabs-btn hidden lg:block">Upload Content</span>
          </Link>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-300 shadow-md">
          <div className="flex items-center">
            <p className="banner-header">New</p>
          </div>
          <div>
            {loading && (
              <div className="flex justify-center items-center h-screen">
                <Loading />
              </div>
            )}

            {!loading && (
              <div className="overflow-y-auto mt-2 h-screen">
                <div className="grid gril-cols-1 lg:grid-cols-2 gap-10 my-5 pb-[200px]">
                  {filterNew.length > 0 &&
                    filterNew.map((newdata, index) => (
                      // console.log("newdata", newdata),
                      <div
                        className="w-full h-auto overflow-hidden cursor-pointer"
                        key={index}
                      >
                        <div className="relative">
                          <div className="absolute top-0 right-0 p-5 z-10">
                            <div className="flex items-center space-x-2">
                              <Link
                                to={`/home/new/detail/${newdata._id}`}
                                className="py-3 px-3 rounded-2xl text-[14px] bg-secondary text-primary flex items-center font-semibold rounded-md hover:scale-105 active:scale-95"
                              >
                                <MdOutlineEdit className="mr-2" size={20} />
                                <span className="tabs-btn">Edit</span>
                              </Link>
                              <button
                                onClick={() => {
                                  setConfirmDeleteOpen(true);
                                  setId(newdata._id);
                                }}
                                className="py-3 px-3 rounded-2xl text-[14px] bg-red-200 text-red-500 flex items-center font-semibold rounded-md hover:scale-105 active:scale-95"
                              >
                                <Trash2Icon className="" size={20} />
                              </button>
                            </div>
                          </div>
                          <img
                            src={`${newdata?.csrImages[0]?.url}`}
                            alt="img"
                            className="w-full h-72 object-cover"
                          />
                        </div>
                        <p className="text-[16px] font-semibold py-2">
                          {newdata.title}
                        </p>
                      </div>
                    ))}
                </div>
                {filterNew.length === 0 && (
                  <div className="flex w-full justify-center items-center">
                    <p className="text-center text-gray-500">No data found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onConfirm={() => deleteNewEvent()}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  );
};

export default NewAndEvent;
