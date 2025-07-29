import { MdOutlineDelete } from "react-icons/md";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

function Changan({ data, loading, activeTab, sentdeteleId }) {
  // console.log(activeTab);
  const navigate = useNavigate();
  const handleClick = (id) => {
    sentdeteleId(id); // Call the function passed from the parent
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex items-center">
        <p className="banner-header">
          {activeTab === "KAICHENG" ? "KAICENE" : activeTab}
        </p>
        <span className="font-semibold text-[16px] ms-5">
          {data.length}/<span className="text-gray-500">8</span>
        </span>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      )}
      {!loading && (
        <div>
          {data.length === 0 && (
            <div className="flex justify-center items-center h-screen">
              <span className="text-gray-500">No Car Data in this brand</span>
            </div>
          )}
          {data.length > 0 && (
            <div className="overflow-y-auto mt-2 h-screen">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-5 pb-[200px]">
                {data.map((image, index) => (
                  <div
                    className="w-full h-auto rounded-lg overflow-hidden cursor-pointer bg-gray-100"
                    key={index}
                    onClick={() => {
                      navigate(`/home/car-detail/${image._id}`);
                    }}
                  >
                    <div className="relative">
                      <div className="absolute flex gap-2 top-0 right-0 p-2 z-10">
                        {/* <Link
                          to={`/home/car-detail/${image._id}`}
                          className="py-3 px-3 rounded-2xl text-[14px] bg-secondary text-primary flex items-center font-semibold rounded-md hover:scale-105 active:scale-95"
                        >
                          <MdOutlineEdit className="mr-2" size={20} />
                          <span className="tabs-btn">Edit</span>
                        </Link> */}
                        <button
                          className="py-3 px-3 rounded-2xl text-[14px] bg-red-500 text-white flex items-center font-semibold rounded-md hover:scale-105 active:scale-95"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClick(image._id);
                          }}
                        >
                          <MdOutlineDelete className="" size={20} />
                        </button>
                      </div>
                      <img
                        src={`${image?.mockup?.url}`}
                        alt="img"
                        className="w-full h-72 object-cover"
                      />
                    </div>
                    <p className="text-[16px] font-semibold py-2 ps-2">
                      {image.car_name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Changan;
