// import React from "react";
import { useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDriveFolderUpload } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import constentUpload from "../../api/new/contentUpload";
const brands = ["News", "Events", "Promotions"];

function NewForm() {
  const navigate = useNavigate();
  const [exterier, setExterier] = useState(null);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const desc = useRef();
  const [date, setDate] = useState("");
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setExterier(selectedFile);
  };

  const uploadContent = async () => {
    const data = {
      image: exterier,
      category: category,
      title: title,
      body: desc.current.value,
      eventDate: date,
      sub_title: "intro",
    };
    console.log("data", data);
    const res = await constentUpload(data);
    if (res.code === 200) {
      navigate("/home/new");
    }
    console.log("res", res);
  };
  return (
    <div>
      <div className="mt-1">
        <Link to="/new" className="flex items-center space-x-2">
          <BiArrowBack size={40} className="font-bold" />
          <span className="header my-4">Upload Content</span>
        </Link>
      </div>

      <div className="p-4 bg-white rounded-lg overflow-y-auto h-[496px]">
        <div className="flex justify-between items-center">
          {/* checkbox */}
          <div>
            <p className="banner-header">Car Brand</p>
            <div>
              <div className="flex space-x-4 mt-5">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="checkbox"
                      onClick={() => setCategory(brand)}
                    />
                    <label className="font-medium">{brand}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* buttton */}
          <div className="flex justify-center space-x-4">
            <button className="cancel">
              <IoIosCloseCircleOutline size={20} className="mr-2" />
              Cancel
            </button>
            <button className="upload" onClick={uploadContent}>
              <MdDriveFolderUpload className="mr-2" size={20} />
              Upload Content
            </button>
          </div>
        </div>

        {/* input box 2 */}
        <div>
          <div className="flex space-x-4 mt-5">
            <div className="flex flex-col space-y-2 w-1/2">
              <label className="banner-header">Content Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="bg-gray-100 rounded-md px-6 py-4"
                placeholder="Enter Content Title"
              />
            </div>

            <div className="flex flex-col space-y-2 w-1/2">
              <label className="banner-header">Date</label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="text"
                className="bg-gray-100 rounded-md px-6 py-4"
                placeholder="12-02-2023"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex flex-col space-y-2">
            <label className="banner-header">Content</label>
            <textarea
              rows={10}
              ref={desc}
              className="bg-gray-100 rounded-md px-6 py-4"
              placeholder="Enter Date"
            />
          </div>
        </div>

        {/* Exterier */}
        <div>
          <div className="flex items-center">
            <p className="banner-header mr-2">Exterier</p>
            <p>2/3</p>
          </div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Image For Content
                </h3>
                <div className="flex flex-col items-center">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                      <MdDriveFolderUpload size={20} className="mr-2" />
                      Select Image
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="w-[230px] h-[230px]">
                {exterier ? (
                  <img
                    src={URL.createObjectURL(exterier)}
                    alt="exterier"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <p className="text-sm text-gray-600 mt-5">
                    Please upload image with file size less than 10MB.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewForm;
