import React from "react";
import { MdOutlineEdit } from "react-icons/md";

function Changan({ data }) {
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex items-center">
        <p className="banner-header">CHANGAN</p>
        <span className="font-semibold text-[16px] ms-5">
          5/<span className="text-gray-500">8</span>
        </span>
      </div>
      <div>
        <div className="overflow-y-auto mt-2 h-[360px]">
          <div className="grid grid-cols-2 gap-10 my-5">
            {data.map((image, index) => (
              <div
                className="w-full h-auto rounded-lg overflow-hidden cursor-pointer p-2 bg-gray-200"
                key={index}
              >
                <div className="relative">
                  <div className="absolute top-0 right-0 p-2 z-10">
                    <button
                      // onClick={() => {
                      //   setModalOpen(true);
                      //   setSelectedImage(index);
                      // }}
                      className="py-3 px-3 rounded-2xl text-[14px] bg-secondary text-primary flex items-center font-semibold rounded-md hover:scale-105 active:scale-95"
                    >
                      <MdOutlineEdit className="mr-2" size={20} />
                      <span className="tabs-btn">Edit</span>
                    </button>
                  </div>
                  <img
                    src={image}
                    alt="img"
                    className="w-full h-72 object-cover"
                  />
                </div>
                <p className="text-[16px] font-semibold py-2">Banni E Star</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Changan;
