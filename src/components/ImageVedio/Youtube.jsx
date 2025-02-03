import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDriveFolderUpload } from "react-icons/md";
import { Trash2Icon } from "lucide-react";
// api
import getYoutube from "../../api/banner/getYouTube";
import deleteYoutube from "../../api/banner/deleteYoutube";
// component
import Loading from "../Loading";
import YoutubeForm from "./YouTubeForm";
import ConfirmationModal from "../ConfirmationModal";

function Youtube() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [youtube, setYoutube] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  // const [deleteId, setDeleteId] = useState(null);

  const getyoutube = async () => {
    setLoading(true);
    const res = await getYoutube();
    if (res.code === 200) {
      setYoutube(res.data.video_id.reverse());
      setLoading(false);
    }
  };
  const closeModal = () => {
    setFormOpen(false);
    getyoutube();
  };

  const handleDeleteImage = async () => {
    // Handle delete image logic
    const res = await deleteYoutube(id);
    if (res.code === 200) {
      getyoutube();
      setShow(false);
      setConfirmDeleteOpen(false);
      setId(null);
    }
  };

  useEffect(() => {
    getyoutube();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="">
          <span className="banner-header mt-5">Youtube Vedio</span>
          <span className="font-semibold text-[16px] ms-5">
            {youtube.length}/<span className="text-gray-500">4</span>
          </span>
        </div>
        {show === true ? (
          <div className="flex items-center space-x-4">
            <button className="cancel" onClick={() => setShow(false)}>
              <IoIosCloseCircleOutline size={20} className="mr-2" />
              <p>Cancel</p>
            </button>
            <button
              className="delete"
              onClick={() => setConfirmDeleteOpen(true)}
            >
              <Trash2Icon size={20} className="mr-2" />
              <p>Delete Video</p>
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button className="delete" onClick={() => setShow(true)}>
              <Trash2Icon size={20} className="mr-2" />
              <p>Delete Video</p>
            </button>
            <button
              onClick={() => setFormOpen(true)}
              className={`flex items-center bg-primary text-white px-4 py-3 rounded-md active:scale-95 ${
                youtube.length >= 4
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={youtube.length >= 4}
            >
              <MdDriveFolderUpload className="mr-2" size={20} />
              <span className="tabs-btn">Upload Youtube Link</span>
            </button>
          </div>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[350px]">
          <Loading />
        </div>
      ) : (
        <div className="overflow-y-auto mt-2 h-screen">
          <div className="grid gril-cols-1 lg:grid-cols-2 gap-10 my-5 mb-[250px]">
            {youtube.map((video) => (
              <div key={video._id} className="relative">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.video_id}`}
                  // title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                {show && (
                  <div className="absolute bottom-0 m-2 left-0 w-5 h-5 gap-4 flex items-center justify-center w-[100px] h-[50px] bg-white border border-primary rounded-md cursor-pointer text-primary">
                    <input type="checkbox" onChange={() => setId(video._id)} />
                    <p>Select</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {isFormOpen && <YoutubeForm onclose={closeModal} />}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onConfirm={handleDeleteImage}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  );
}

export default Youtube;
