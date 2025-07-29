import { useEffect, useState } from "react";
import {
  MdDriveFolderUpload,
  MdOutlineDelete,
  MdOutlineEdit,
} from "react-icons/md";
import { Link } from "react-router-dom";
// api
import getBrandOverview from "../../api/brandoverview/getBrandOverview";
// components
import Loading from "../Loading";
import { Trash2Icon } from "lucide-react";
import deleteBrand from "../../api/brandoverview/deletebrand";
import ConfirmationModal from "../ConfirmationModal";

function BrandOverview() {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  const getAllBrandOverview = async () => {
    const res = await getBrandOverview();
    // console.log("res", res);
    if (res.code === 200) {
      setLoading(false);
      setBrands(res.data.brandOverview);
    }
  };

  const handleDelete = async () => {
    const res = await deleteBrand(brandToDelete);
    if (res.code === 200) {
      setConfirmDeleteOpen(false);
      getAllBrandOverview();
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
              {brands.length}/<span className="text-gray-500">3</span>
            </span>
          </div>
          <Link
            to="overview/form"
            className={`bg-primary flex justify-center items-center text-white px-5 h-[40px] rounded-md active:scale-95 ${
              brands.length >= 3 ? "pointer-events-none opacity-50" : ""
            }`}
            disabled={brands.length >= 3}
          >
            <div className="flex items-center gap-2">
              <MdDriveFolderUpload size={20} />
              <span className="tabs-btn hidden lg:block">Upload Image</span>
            </div>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-5 pb-[200px]">
                  {brands.map((brand, index) => (
                    <div
                      className="w-full h-auto rounded-lg overflow-hidden p-2 cursor-pointer bg-gray-100"
                      key={index}
                    >
                      <div className="relative">
                        <div className="absolute top-0 right-0 p-2 z-10 flex gap-2">
                          <Link
                            to={`overview/detail/${brand.car_brand}`}
                            className="py-3 px-3 rounded-2xl text-[14px] bg-secondary text-primary flex items-center font-semibold rounded-md hover:scale-105 active:scale-95"
                          >
                            <MdOutlineEdit className="mr-2" size={20} />
                            <span className="tabs-btn">Edit</span>
                          </Link>

                          <button
                            onClick={() => {
                              setBrandToDelete(brand?.car_brand);
                              setConfirmDeleteOpen(true);
                            }}
                            className="py-3 px-3 rounded-2xl text-[14px] bg-red-500 text-white flex items-center font-semibold rounded-md hover:scale-105 active:scale-95"
                          >
                            <Trash2Icon className="" size={20} />
                          </button>
                        </div>
                        {brand.brandImageUrls.length > 0 && (
                          <img
                            src={`${brand.brandImageUrls[0].url}`}
                            alt="img"
                            className="w-full h-72 object-cover rounded-md"
                          />
                        )}
                      </div>
                      <p className="text-[16px] font-semibold pt-2">
                        {brand?.car_brand === "KAICHENG"
                          ? "KAICENE"
                          : brand?.car_brand}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onConfirm={handleDelete}
        text="remove this brand?"
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  );
}

export default BrandOverview;
