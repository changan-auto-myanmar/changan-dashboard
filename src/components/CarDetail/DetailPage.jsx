import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import CarModelSectoin from "./DetailPage/CarModelSectoin";
import CarColorSection from "./DetailPage/CarColorSection";
import CarImageSection from "./DetailPage/CarImageSection";

import "./detailform.css";
import { useNavigate, useParams } from "react-router-dom";
import getACarDetail from "../../api/cardetail/getACarDetail";

const tabs = ["Car Model", "Image", "Color"];

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log("id", id);
  const [childFunction, setChildFunction] = useState(null);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [CarModelSectoinData, SetCarModelSectoin] = useState([]);
  const [CarColorSectionData, SetCarColorSection] = useState([]);
  const [CarImageSectionData, SetCarImageSection] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAData = async () => {
    const res = await getACarDetail(id);
    console.log("carDetail", res);
    if (res.code === 200) {
      const dataone = [
        {
          car_brand: res.data.showcase.car_brand,
          car_name: res.data.showcase.car_name,
          car_slogan: res.data.showcase.car_slogan,
          car_banner: res.data.showcase.car_banner,
          mockup: res.data.showcase.mockup,
          car_porche: res.data.showcase.car_brochure,
        },
      ];
      const datatwo = [
        {
          car_exterior: res.data.showcase.car_exterior,
          car_interior: res.data.showcase.car_interior,
          gallery: res.data.showcase.gallery,
        },
      ];
      const datathree = [
        {
          car_color: res.data.showcase.car_color,
        },
      ];
      SetCarModelSectoin(dataone);
      SetCarImageSection(datatwo);
      SetCarColorSection(datathree);
      setLoading(false);
    }
  };

  const callChildFunction = () => {
    if (childFunction) {
      childFunction(); // Call the child function
    }
  };

  const handleUploadClick = (tab) => {
    setActiveTab(tab);
    callChildFunction();
  };

  useEffect(() => {
    getAData();
  }, []);

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
          <span className="header my-4">Edit Car</span>
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

        <div className="overflow-y-auto h-screen">
          {!loading && (
            <div>
              <div>
                {activeTab === tabs[0] && (
                  <CarModelSectoin
                    triggerChildFunction={setChildFunction}
                    carData={CarModelSectoinData}
                    id={id}
                  />
                )}
              </div>
              <div>
                {activeTab === tabs[1] && (
                  <CarImageSection carData={CarImageSectionData} id={id} />
                )}
              </div>
              <div>
                {activeTab === tabs[2] && (
                  <CarColorSection carData={CarColorSectionData} id={id} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
