import { MdAddCircleOutline, MdDriveFolderUpload } from "react-icons/md";

function CarColorSection() {
  return (
    <div>
      <div className="flex justify-between items-center mt-5 mb-4">
        <p className="banner-header">Color Name</p>
        <button className="flex items-center bg-primary text-white text-[16px] semibold rounded-md px-4 py-3">
          <MdAddCircleOutline className="mr-2" size={20} />
          <span>Add Color</span>
        </button>
      </div>
      <div className="flex flex-col mt-2">
        <input
          type="text"
          className="bg-gray-100 rounded-md px-6 py-4"
          placeholder="Enter Color Name"
        />
      </div>
      <div className="flex space-x-4 mt-5 h-[300px]">
        <div className="mx-auto mt-5 p-6 rounded-lg box-dash w-1/2">
          <div className="flex flex-col h-full items-center justify-center">
            <h3 className="text-[20px] font-semibold mb-4">
              Select Color Image
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
                  // onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-600 mt-5">
              Please upload image with file size less than 10MB.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-5 p-6 rounded-lg box-dash w-1/2">
          <div className="flex flex-col h-full items-center justify-center">
            <h3 className="text-[20px] font-semibold mb-4">Select Car Image</h3>
            <div className="flex flex-col items-center">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="bg-white flex items-center text-[12px] justify-center px-4 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
                  <MdDriveFolderUpload size={20} className="mr-2" />
                  Select File
                </span>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  // onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-600 mt-5">
              Please upload image with file size less than 10MB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarColorSection;
