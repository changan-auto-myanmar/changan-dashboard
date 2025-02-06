import { useEffect, useState } from "react";
import { MdDriveFolderUpload, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
// api
import getBrandOverview from "../../api/brandoverview/getBrandOverview";
// components
import Loading from "../Loading";

function BrandOverview() {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);

  const getAllBrandOverview = async () => {
    const res = await getBrandOverview();
    // console.log(res);
    if (res.code === 200) {
      setLoading(false);
      setBrands(res.data.brandOverview);
    }
  };

  useEffect(() => {
    getAllBrandOverview();
  }, []);

  return (
    <div>
      <div className="p-4 bg-white rounded-lg">
        <div className="flex justify-between">
          <div className="">
            <span className="banner-header mt-5">Brand Overview Images</span>
            <span className="font-semibold text-[16px] ms-5">
              {brands.length}/<span className="text-gray-500">5</span>
            </span>
          </div>
          <Link
            to="overview/form"
            className={`flex items-center bg-primary text-white px-4 py-3 rounded-md active:scale-95 ${
              brands.length >= 5 ? "pointer-events-none opacity-50" : ""
            }`}
            disabled={brands.length >= 5}
          >
            <MdDriveFolderUpload className="mr-2" size={20} />
            <span className="tabs-btn">Upload Image</span>
          </Link>
        </div>
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        )}
        {!loading && (
          <div>
            {brands.length === 0 && (
              <div className="flex justify-center items-center h-screen">
                <span className="text-gray-500">No Car Data in this brand</span>
              </div>
            )}
            {brands.length > 0 && (
              <div className="overflow-y-auto mt-2 h-screen">
                <div className="grid grid-cols-2 gap-10 my-5 pb-[200px]">
                  {brands.map((brand, index) => (
                    <div
                      className="w-full h-auto rounded-lg overflow-hidden p-2 cursor-pointer bg-gray-100"
                      key={index}
                    >
                      <div className="relative">
                        <div className="absolute top-0 right-0 p-2 z-10">
                          <Link
                            to={`overview/detail/${brand._id}`}
                            className="py-3 px-3 rounded-2xl text-[14px] bg-secondary text-primary flex items-center font-semibold rounded-md hover:scale-105 active:scale-95"
                          >
                            <MdOutlineEdit className="mr-2" size={20} />
                            <span className="tabs-btn">Edit</span>
                          </Link>
                        </div>
                        {brand.images.length > 0 && (
                          <img
                            src={`${import.meta.env.VITE_API_URL}api/v1/${
                              brand?.images[0].filepath
                            }`}
                            alt="img"
                            className="w-full h-72 object-cover rounded-md"
                          />
                        )}
                      </div>
                      <p className="text-[16px] font-semibold pt-2">
                        {brand?.car_brand}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandOverview;
