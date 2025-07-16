import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDriveFolderUpload } from "react-icons/md";
import uploadYouTube from "../../api/banner/uploadYouTube";

function YoutubeForm({ onclose }) {
  const [link, setLink] = useState(null);

  const handleUploadLink = async () => {
    const data = {
      url: link,
    };
    // Handle upload image logic
    const res = await uploadYouTube(data);
    // console.log(res);
    if (res.code === 201) {
      onclose();
    }
  };

  return (
    <div>
      <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-[90%] lg:w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-4">Upload YouTube Link</h2>
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter YouTube Link"
              className="w-full border border-primary rounded-md p-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              className="cancel"
              onClick={onclose}
              // onClick={() => setFormOpen(false)}
            >
              <IoIosCloseCircleOutline size={20} className="mr-2" />
              Cancel
            </button>
            <button className="upload" onClick={handleUploadLink}>
              <MdDriveFolderUpload className="mr-2" size={20} />
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubeForm;
