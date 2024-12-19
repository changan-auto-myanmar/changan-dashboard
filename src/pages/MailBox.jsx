// import React from "react";
// import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import ServiceRequest from "../components/MailBox/ServiceRequest";
import ContactForm from "../components/MailBox/ContactForm";

const tabs = ["Service Form", "Contact Form"];

function MailBox() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div className="mt-5">
      <span className="header my-4">Mail Box</span>

      <div className="mt-3 pe-5 pt-5">
        <div className="flex justify-between">
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`py-1 px-4 rounded-2xl text-[14px] font-semibold ${
                  activeTab === tab ? "bg-secondary text-primary" : "text-black"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* <div>
            <button className="cancel bg-white">
              <Trash2Icon size={15} className="mr-2" />
              <span className="font-semibold"> Delete</span>
            </button>
          </div> */}
        </div>

        <div>{activeTab === tabs[0] && <ServiceRequest />}</div>
        <div>{activeTab === tabs[1] && <ContactForm />}</div>
      </div>
    </div>
  );
}

export default MailBox;
