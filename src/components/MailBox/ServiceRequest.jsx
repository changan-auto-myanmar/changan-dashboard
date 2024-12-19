// import React from 'react'

import { useState } from "react";
import { LoaderPinwheelIcon } from "lucide-react";
import getServices from "../../api/mailbox/getService";

function ServiceRequest() {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(false);
  const getMailsData = async () => {
    setLoading(true);
    try {
      const response = await getServices();
      console.log(response.data);
      setMails(response.data.mailbox);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   console.log(mails);
  useState(() => {
    getMailsData();
  }, [mails]);

  return (
    <div className="bg-white p-4 rounded-lg">
      <div>
        <span className="banner-header">ServiceRequest</span>
        {!loading && (
          <span className="font-semibold text-[16px] ms-5 text-gray-400">
            {mails.length}
          </span>
        )}
      </div>
      <div className="w-full mt-5 h-[347px] overflow-y-auto rounded-lg">
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

        {mails.length !== 0 && (
          <table className="w-full">
            <thead className="text-left">
              <tr className="bg-primary text-white text-left ">
                <th className="py-4 px-4 font-medium">
                  <input type="checkbox" className="mr-2" />
                </th>
                <th className="py-4 px-4 font-medium">No</th>
                <th className="py-4 px-4 font-medium">Date</th>
                <th className="py-4 px-4 font-medium">Name</th>
                <th className="py-4 px-4 font-medium">Car Model</th>
                <th className="py-4 px-4 font-medium">Phone Num</th>
                <th className="py-4 px-4 font-medium">Email</th>

                {/* <th>Local Ping (MS)</th> */}
              </tr>
            </thead>
            <tbody className="">
              <tr className="bg-white ">
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
                <td className="py-2 px-4"></td>
              </tr>

              {mails.length !== 0 &&
                mails.map((mail, index) => (
                  <tr className="bg-white " key={index}>
                    <td className="py-2 px-4">
                      <input type="checkbox" className="mr-2" />
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
        )}
      </div>
    </div>
  );
}

export default ServiceRequest;
