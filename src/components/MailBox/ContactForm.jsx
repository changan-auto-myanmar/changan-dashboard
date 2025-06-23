import { useState, useEffect } from "react";
import getMails from "../../api/mailbox/getMails";
import { LoaderPinwheelIcon, Trash2Icon } from "lucide-react";
import DateFormatter from "../FormatDate";
import MailBoxModel from "./MailBoxModel";
import DeleteMails from "../../api/mailbox/deleteMails";
import ConfirmationModal from "../ConfirmationModal";

function ContactForm() {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [selectedMails, setSelectedMails] = useState([]); // For selected mail _IDs
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const getMailsData = async () => {
    setLoading(true);
    try {
      const response = await getMails();
      // console.log(response.data);
      setMails(response.data.mailbox);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMailsData();
  }, []);

  const selectAllMail = (event) => {
    if (event.target.checked) {
      // Select all mail _IDs
      const allMailIds = mails.map((mail) => mail._id); // Use _id instead of id
      setSelectedMails(allMailIds);
    } else {
      // Clear selection
      setSelectedMails([]);
    }
  };

  const deletemails = async () => {
    const res = await DeleteMails(selectedMails);
    if (res.code === 200) {
      getMailsData();
      setSelectedMails([]);
      setConfirmDeleteOpen(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <span className="banner-header">Contact Form</span>
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
            disabled={selectedMails.length === 0}
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

        {show && (
          <div className="absolute z-50 w-full h-screen backdrop-opacity-10 backdrop-invert bg-white/30 top-0 left-0 flex justify-center items-center">
            <MailBoxModel data={data} onClose={() => setShow(false)} />
          </div>
        )}
        {!loading && mails.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <span className="text-gray-400">No Data Found</span>
          </div>
        )}

        <div className="h-[calc(92vh-200px)] overflow-y-auto">
          {mails.length !== 0 && (
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
                      onChange={selectAllMail}
                      checked={
                        mails.length > 0 &&
                        selectedMails.length === mails.length
                      } // Check if all are selected
                    />
                  </th>
                  <th className="py-4 px-4">No</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Name</th>
                  <th className="py-4 px-4">Subject</th>
                  {/* <th className="py-4 px-4">Description</th> */}
                  <th className="py-4 px-4">Phone Num</th>
                  <th className="py-4 px-4">Email</th>
                </tr>
              </thead>
              <tbody className="bg-red-50">
                {mails.map((mail, index) => (
                  <tr
                    className="bg-white"
                    key={mail._id} // Use _id for the key
                    onClick={() => {
                      setShow(true);
                      setData(mail);
                    }}
                  >
                    <td className="py-2 px-4">
                      <input
                        type="checkbox"
                        className="mail-checkbox"
                        checked={selectedMails.includes(mail._id)} // Check if mail _ID is selected
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
                        onClick={(e) => e.stopPropagation()} // Prevent row click
                      />
                    </td>
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">
                      <DateFormatter dateString={mail.sentAt} />
                    </td>
                    <td className="py-2 px-4">{mail.name}</td>
                    <td className="py-2 px-4">{mail.subject}</td>
                    {/* <td className="py-2 px-4 w-48 overflow-hidden whitespace-nowrap text-ellipsis">
                    {mail.description}
                  </td> */}
                    <td className="py-2 px-4">{mail.phone}</td>
                    <td className="py-2 px-4">{mail.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onConfirm={() => deletemails()}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  );
}

export default ContactForm;
