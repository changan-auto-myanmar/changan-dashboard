// import React from "react";
import { useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDriveFolderUpload, MdOutlineDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import constentUpload from "../../api/new/contentUpload";
import { toast } from "sonner";

const brands = ["News", "Events", "Promotions"];

function NewForm() {
  const navigate = useNavigate();
  const [exterier, setExterier] = useState([]);
  const [category, setCategory] = useState("Events");
  const [title, setTitle] = useState("");
  const desc = useRef();
  const [date, setDate] = useState("");
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (exterier.length + files.length > 5) {
      toast.warning("You can only upload a maximum of 5 images.");
      return;
    }
    setExterier((prevImages) => [...prevImages, ...files]);
  };

  const removePhoto = (index) => {
    const newImages = [...exterier];
    newImages.splice(index, 1);
    setExterier(newImages);
  };

  const uploadContent = async () => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("textBody", desc.current.value);
    category !== "News" && formData.append("eventDate", date);
    exterier.forEach((image) => {
      formData.append("csrImages", image);
    });

    // console.log("data", formData);
    const res = await constentUpload(formData);
    console.log("res", res);
    if (res.code === 201) {
      navigate("/home/new");
    }
    // console.log("res", res);
  };
  return (
    <div>
      <div className="mt-1">
        <Link to="/home/new" className="flex items-center space-x-2">
          <BiArrowBack size={40} className="font-bold" />
          <span className="header my-4">Upload Content</span>
        </Link>
      </div>

      <div className="p-4 bg-white border border-gray-300 shadow-md rounded-lg overflow-y-auto h-[496px]">
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
                      checked={category === brand}
                      className="checkbox"
                      onChange={() => setCategory(brand)}
                    />
                    <label className="font-medium">{brand}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* buttton */}
          <div className="flex justify-center space-x-4">
            <button className="cancel" onClick={() => navigate("/home/new")}>
              <IoIosCloseCircleOutline size={20} className="mr-0 lg:mr-2 " />
              <span className="hidden lg:block">Cancel</span>
            </button>
            <button className="upload" onClick={uploadContent}>
              <MdDriveFolderUpload size={20} className="mr-0 lg:mr-2" />
              <span className="hidden lg:block">Upload Content</span>
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

            {category !== "News" && (
              <div className="flex flex-col space-y-2 w-1/2">
                <label className="banner-header">Event Date</label>
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-gray-100 rounded-md px-6 py-4"
                />
              </div>
            )}
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
        <div className="mt-5">
          <div className="flex items-center">
            <p className="banner-header mr-2">Image</p>
            <p>{exterier.length}/5</p>
          </div>
          <div className="mx-auto mt-5 p-6 rounded-lg box-dash ">
            <div className="flex flex-col h-full justify-center">
              <div className="flex w-full justify-between items-center">
                <h3 className="text-[20px] font-semibold mb-4">
                  Select Image For Content
                </h3>
                {exterier.length < 5 && (
                  <div className="flex flex-col items-center">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                        <MdDriveFolderUpload size={20} className="mr-2" />
                        Select Image
                      </span>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="">
                {exterier.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {exterier.map((image, index) => (
                      <div key={index} className="w-[230px] h-[230px] relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Exterier ${index + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          className="absolute top-0 right-0 bg-danger text-white m-2 p-2 rounded-sm shadow-lg"
                          onClick={() => {
                            removePhoto(index);
                          }}
                        >
                          <MdOutlineDeleteOutline size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {exterier.length === 0 && (
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
