// import React from 'react'

import DateFormatter from "../FormatDate";

function MailBoxModel({ onClose, data }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-[500px] h-80 mx-auto mt-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">{data.subject}</h2>
        <button
          onClick={onClose}
          className="text-primary border border-primary py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
        >
          Close
        </button>
      </div>
      <div className="mb-4 pb-4">
        <div className="flex justify-between w-full mb-5">
          <p>
            <strong>Name</strong> - {data.name}
          </p>
          <p>
            <strong>Phone</strong> - {data.phone}
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p>
            <strong>Date</strong> - {<DateFormatter date={data.sentAt} />}
          </p>
          <p>
            <strong>Email</strong> - {data.email}
          </p>
        </div>
      </div>
      <p className="text-gray-700">{data.description}</p>
    </div>
  );
}

export default MailBoxModel;
