"use client";

import { useState, useEffect } from "react";
import { LoaderPinwheelIcon, Trash2Icon } from "lucide-react";

// Mock components for demonstration
const DateFormatter = ({ dateString }) => (
  <span>{new Date(dateString).toLocaleDateString()}</span>
);

const MailBoxModel = ({ data, onClose }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
    <h3 className="text-lg font-semibold mb-4">Mail Details</h3>
    <p>
      <strong>Name:</strong> {data.name}
    </p>
    <p>
      <strong>Email:</strong> {data.email}
    </p>
    <p>
      <strong>Subject:</strong> {data.subject}
    </p>
    <p>
      <strong>Phone:</strong> {data.phone}
    </p>
    <button
      onClick={onClose}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Close
    </button>
  </div>
);

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p className="mb-4">
          Are you sure you want to delete the selected mails?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock API functions
const getMails = async () => ({
  data: {
    mailbox: Array.from({ length: 50 }, (_, i) => ({
      _id: `mail-${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      subject: `Subject ${i + 1}`,
      phone: `+1234567890${i}`,
      sentAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      description: `This is a sample description for mail ${i + 1}`,
    })),
  },
});

const DeleteMails = async (mailIds) => ({
  code: 200,
  message: "Mails deleted successfully",
});

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
    <div className="p-4 rounded-lg border border-gray-200 shadow-md h-screen flex flex-col">
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
                    <th className="py-4 px-4 text-left w-12">
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
                    <th className="py-4 px-4 text-left w-16">No</th>
                    <th className="py-4 px-4 text-left w-32">Date</th>
                    <th className="py-4 px-4 text-left w-40">Name</th>
                    <th className="py-4 px-4 text-left w-48">Subject</th>
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
