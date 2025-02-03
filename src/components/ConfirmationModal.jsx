import { Trash2Icon } from "lucide-react";
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg py-4 px-10 shadow-md border border-gray-300 absolute bottom-5 right-5">
        <h2 className="text-xl font-semibold mb-4 text-center ">
          Delete images Cannot <br /> be recovered!
        </h2>
        {/* <p>Are you sure you want to delete this item?</p> */}
        <div className="flex justify-center mt-4 gap-4">
          <button
            className="cancel"
            onClick={onCancel}
            // onClick={() => setFormOpen(false)}
          >
            <IoIosCloseCircleOutline size={20} className="mr-2" />
            Cancel
          </button>
          <button className="upload" onClick={onConfirm}>
            <Trash2Icon className="mr-2" size={20} />
            Delete
          </button>
          {/* <button
            onClick={onCancel}
            className="bg-white text-primary border border-primary px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Delete
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
