import { MdDriveFolderUpload } from "react-icons/md";

const brands = ["CHANGAN", "DEEPIN", "KAICHEN"];

function CarModelSectoin() {
  return (
    <div>
      <div>
        <p className="banner-header">Car Brand</p>
        <div>
          <div className="flex space-x-4 mt-5">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <input type="checkbox" className="checkbox" />
                <label className="font-medium">{brand}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex space-x-4 mt-5">
          <div className="flex flex-col space-y-2 w-1/2">
            <label className="banner-header">Car Title</label>
            <input
              type="text"
              className="bg-gray-100 rounded-md px-6 py-4"
              placeholder="Enter Car Title"
            />
          </div>

          <div className="flex flex-col space-y-2 w-1/2">
            <label className="banner-header">Car Sologram (Optional)</label>
            <input
              type="text"
              className="bg-gray-100 rounded-md px-6 py-4"
              placeholder="Enter Car Sologram"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 p-6 rounded-lg box-dash">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-semibold mb-4">
            Select Car Banner Image
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
        </div>
        <div className="relative my-2">
          <img
            src="https://via.placeholder.com/600x200" // Placeholder image for demonstration; replace with your image URL
            alt="Car Banner"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Please upload image with file size less than 10MB.
        </p>
      </div>

      <div className="flex space-x-4 mt-5">
        <div className="mx-auto mt-5 p-6 rounded-lg box-dash">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold mb-4">
              Select Car Banner Image
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
          </div>
          <div className="relative my-2">
            <img
              src="https://via.placeholder.com/600x200" // Placeholder image for demonstration; replace with your image URL
              alt="Car Banner"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Please upload image with file size less than 10MB.
          </p>
        </div>
        <div className="mx-auto mt-5 p-6 rounded-lg box-dash">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold mb-4">
              Select Car Banner Image
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
          </div>
          <div className="relative my-2">
            <img
              src="https://via.placeholder.com/600x200" // Placeholder image for demonstration; replace with your image URL
              alt="Car Banner"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Please upload image with file size less than 10MB.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CarModelSectoin;
