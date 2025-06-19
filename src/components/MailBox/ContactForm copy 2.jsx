import { useState, useEffect } from "react";
import { LoaderPinwheelIcon, Trash2Icon } from "lucide-react";
import getMails from "../../api/mailbox/getMails";
import DeleteMails from "../../api/mailbox/deleteMails";
import ConfirmationModal from "../ConfirmationModal";
import DateFormatter from "../FormatDate";
import MailBoxModel from "./MailBoxModel";

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
    <div className="p-4 rounded-lg border border-gray-200 shadow-md h-[calc(100vh-150px)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-2xl font-bold">Contact Form</span>
          {!loading && (
            <span className="font-semibold text-[16px] ms-5 text-gray-400">
              {mails.length}
            </span>
          )}
        </div>
        <div>
          <button
            className={`flex items-center gap-2 bg-red-500 p-2 text-white rounded-lg transition-all ${
              selectedMails.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "active:scale-95 hover:bg-white hover:text-red-500 border border-red-500"
            }`}
            disabled={selectedMails.length === 0}
            onClick={() => setConfirmDeleteOpen(true)}
          >
            <Trash2Icon size={16} />
            <span className="font-bold">Delete</span>
          </button>
        </div>
      </div>

      {/* Main content area with flex-1 to take remaining space */}
      <div className="flex-1 flex flex-col min-h-0">
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
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-40">
            <MailBoxModel data={data} onClose={() => setShow(false)} />
          </div>
        )}

        {!loading && mails.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <span className="text-gray-400">No Data Found</span>
          </div>
        )}

        {mails.length !== 0 && !loading && (
          <div className="flex-1 flex flex-col min-h-0 border border-gray-200 rounded-lg overflow-hidden">
            {/* Fixed header */}
            <div className="bg-blue-600 text-white">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-4 px-4 text-left w-">
                      <input
                        type="checkbox"
                        className="mr-2"
                        onChange={selectAllMail}
                        checked={
                          mails.length > 0 &&
                          selectedMails.length === mails.length
                        }
                      />
                    </th>
                    <th className="py-4 px-4 text-left w-1">No</th>
                    <th className="py-4 px-4 text-left w-20">Date</th>
                    <th className="py-4 px-4 text-left w-28">Name</th>
                    <th className="py-4 px-4 text-left w-40">Subject</th>
                    <th className="py-4 px-4 text-left w-40">Phone Num</th>
                    <th className="py-4 px-4 text-left w-48">Email</th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto bg-white">
              <table className="w-full">
                <tbody>
                  {mails.map((mail, index) => (
                    <tr
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      key={mail._id}
                      onClick={() => {
                        setShow(true);
                        setData(mail);
                      }}
                    >
                      <td className="py-3 px-4 w-12">
                        <input
                          type="checkbox"
                          className="mail-checkbox"
                          checked={selectedMails.includes(mail._id)}
                          onChange={() => {
                            if (selectedMails.includes(mail._id)) {
                              setSelectedMails(
                                selectedMails.filter((id) => id !== mail._id)
                              );
                            } else {
                              setSelectedMails([...selectedMails, mail._id]);
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="py-3 px-4 w-16 text-gray-600">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 w-32">
                        <DateFormatter dateString={mail.sentAt} />
                      </td>
                      <td className="py-3 px-4 w-40 font-medium">
                        {mail.name}
                      </td>
                      <td className="py-3 px-4 w-48">
                        <div className="truncate" title={mail.subject}>
                          {mail.subject}
                        </div>
                      </td>
                      <td className="py-3 px-4 w-40 text-gray-600">
                        {mail.phone}
                      </td>
                      <td className="py-3 px-4 w-48">
                        <div className="truncate" title={mail.email}>
                          {mail.email}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
