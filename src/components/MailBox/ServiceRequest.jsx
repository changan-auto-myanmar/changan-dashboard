import { useState, useEffect } from "react";
import { LoaderPinwheelIcon, Trash2Icon } from "lucide-react";
import getServices from "../../api/mailbox/getService";
import DeleteService from "../../api/mailbox/deleteService";
import ConfirmationModal from "../ConfirmationModal";

function ServiceRequest() {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMails, setSelectedMails] = useState([]); // For selected mail IDs
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const getMailsData = async () => {
    setLoading(true);
    try {
      const response = await getServices();
      // console.log(response.data);
      setMails(response.data.mailbox);
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSelectedMails = async () => {
    const res = await DeleteService(selectedMails);
    // console.log(res);
    if (res.code === 200) {
      // console.log("Deleted");
      getMailsData();
      setSelectedMails([]);
      setConfirmDeleteOpen(false);
    }
  };

  useEffect(() => {
    getMailsData();
  }, []);

  const selectAllMails = (event) => {
    if (event.target.checked) {
      // Select all mail _IDs
      const allMailIds = mails.map((mail) => mail._id); // Ensure each mail object has an _id
      setSelectedMails(allMailIds);
    } else {
      // Clear selection
      setSelectedMails([]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <span className="banner-header">Service Request</span>
          {!loading && (
            <span className="font-semibold text-[16px] ms-5 text-gray-400">
              {mails.length}
            </span>
          )}
        </div>
        <div>
          <button
            className={`flex items-center gap-2 bg-danger p-2 text-white rounded-lg ${
              selectedMails.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "active:scale-95 hover:bg-white hover:text-danger border border-danger"
            }`}
            onClick={() => setConfirmDeleteOpen(true)}
          >
            <Trash2Icon />
            <span className="font-bold">Delete</span>
          </button>
        </div>
      </div>
      <div className="w-full mt-5 h-screen overflow-y-auto rounded-lg">
        {loading && (
          <div className="flex flex-col justify-center items-center h-full">
            <LoaderPinwheelIcon
              size={30}
              className="animate-spin text-gray-400"
            />
            <span className="text-gray-400 mt-2">Loading...</span>
          </div>
        )}

        {!loading && mails.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <span className="text-gray-400">No Data Found</span>
          </div>
        )}

        {mails.length > 0 && (
          <div className="h-[calc(92vh-200px)] overflow-y-auto">
            <table className="w-full">
              <thead
                className="text-left"
                style={{ position: "sticky", top: 0 }}
              >
                <tr className="bg-primary text-white text-left ">
                  <th className="py-4 px-4">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={selectAllMails}
                      checked={
                        mails.length > 0 &&
                        selectedMails.length === mails.length
                      } // Check if all are selected
                    />
                  </th>
                  <th className="py-4 px-4 font-medium">No</th>
                  <th className="py-4 px-4 font-medium">Date</th>
                  <th className="py-4 px-4 font-medium">Name</th>
                  <th className="py-4 px-4 font-medium">Car Model</th>
                  <th className="py-4 px-4 font-medium">Phone Num</th>
                  <th className="py-4 px-4 font-medium">Email</th>
                </tr>
              </thead>
              <tbody>
                {mails.map((mail, index) => (
                  <tr key={mail._id}>
                    {/* Use _id for the key */}
                    <td className="py-2 px-4">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedMails.includes(mail._id)} // Check if the mail _ID is selected
                        onChange={() => {
                          if (selectedMails.includes(mail._id)) {
                            // If already selected, remove from the selection
                            setSelectedMails(
                              selectedMails.filter((id) => id !== mail._id)
                            );
                          } else {
                            // If not selected, add to selection
                            setSelectedMails([...selectedMails, mail._id]);
                          }
                        }}
                        onClick={(e) => e.stopPropagation()} // Prevent row click propagation
                      />
                    </td>
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{mail.date}</td>
                    <td className="py-2 px-4">{mail.name}</td>
                    <td className="py-2 px-4">{mail.car_model}</td>
                    <td className="py-2 px-4">{mail.phone}</td>
                    <td className="py-2 px-4">{mail.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onConfirm={() => deleteSelectedMails()}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  );
}

export default ServiceRequest;
