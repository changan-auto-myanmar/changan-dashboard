// import React from "react";
import { useEffect, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDriveFolderUpload, MdOutlineDeleteOutline } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import getANew from "../../api/new/getANew";
import deleteImage from "../../api/new/deleteImage";
import editUploadContent from "../../api/new/editUploadContent";
import editUploadImage from "../../api/new/editUploadImage";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS file
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
const brands = ["News", "Events", "Promotions"];

function NewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exterier, setExterier] = useState([]);
  const [images, setImages] = useState([]);
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
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removePhoto = (index) => {
    const newImages = [...exterier];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const uploadContent = async () => {
    const data = {
      category,
      title,
      body: desc.current.value,
      ...(category !== "News" && { eventDate: date }),
    };
    if (images.length !== 0) {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const imgdata = {
        id,
        data: formData,
      };
      await editUploadImage(imgdata);
    }

    const res = await editUploadContent({ id, data });
    // console.log("res", res);
    if (res.status === "success") {
      console.log("work");
      navigate("/home/new");
    }
  };

  const getanew = async () => {
    const res = await getANew(id);
    console.log("res", res[0].eventDate);
    setTitle(res[0].title);
    setCategory(res[0].category);
    setDate(res[0].eventDate);
    desc.current.value = res[0].body;
    setExterier(res[0].images);
  };

  const deleteimage = async (imageId) => {
    const data = {
      id,
      imageId,
    };
    const res = await deleteImage(data);
    res.code === 200 &&
      setExterier((prev) => prev.filter((item) => item._id !== imageId));
  };

  useEffect(() => {
    getanew();
  }, []);
  return (
    <div>
      <div className="mt-1">
        <Link to="/home/new" className="flex items-center space-x-2">
          <BiArrowBack size={40} className="font-bold" />
          <span className="header my-4">Detail Content</span>
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
                value={title ? title : ""}
                className="bg-gray-100 rounded-md px-6 py-4"
                placeholder="Enter Content Title"
              />
            </div>

            {category !== "News" && (
              <div className="flex flex-col space-y-2 w-1/2">
                <label className="banner-header">Event Date</label>
                <div className="relative bg-gray-100 rounded-md px-6 py-4 w-full pr-10">
                  <DatePicker
                    selected={date} // Use the date from state for selection
                    onChange={(date) => setDate(date)} // Update state when date is selected
                    dateFormat="dd/MM/yyyy" // Format the displayed date
                    className="bg-gray-100 w-full"
                    placeholderText="Select a date" // Optional: Placeholder text
                  />
                  <div className="absolute top-4 right-3 text-gray-400 cursor-pointer">
                    <CalendarIcon
                      className="h-5 w-5"
                      // Clicking icon will trigger the date picker
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from bubbling up
                        // If you need to trigger focus, this is optional
                        document
                          .querySelector(
                            ".react-datepicker__input-container input"
                          )
                          .focus();
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
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
        <div>
          <div className="flex items-center mt-5">
            <p className="banner-header mr-2">Select Image For Content</p>
            <p>2/8</p>
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
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="">
                <div className="flex flex-wrap gap-4 mt-4">
                  {exterier.length > 0 &&
                    exterier.map((image, index) => (
                      <div key={index} className="w-[230px] h-[230px] relative">
                        <img
                          src={`${import.meta.env.VITE_API_URL}api/v1/${
                            image.filepath
                          }`}
                          alt={`Exterier ${index + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          className="absolute top-0 right-0 bg-danger text-white m-2 p-2 rounded-sm shadow-lg"
                          onClick={() => deleteimage(image._id)}
                        >
                          <MdOutlineDeleteOutline size={20} />
                        </button>
                      </div>
                    ))}
                  {images.length > 0 &&
                    images.map((image, index) => (
                      <div key={index} className="w-[230px] h-[230px] relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`image ${index + 1}`}
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
export default NewDetail;
