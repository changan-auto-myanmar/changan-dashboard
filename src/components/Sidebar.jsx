import { NavLink } from "react-router-dom";
import { Images } from "lucide-react";
import { Newspaper } from "lucide-react";
import { IoMailOutline } from "react-icons/io5";
import { IoMdCar } from "react-icons/io";

import logo from "./../assets/image/logo.png";

const Sidebar = () => {
  return (
    <div className="flex bg-gray-100 h-[600px] text-black px-5 w-78 ">
      <div className="bg-white py-5 px-5 my-5 rounded-md ">
        <div className="flex items-center justify-center ">
          <img src={logo} className="" />
        </div>
        <nav className="flex-1 mt-10">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/home/image-vedio"
                className={({ isActive }) =>
                  `block flex px-2 py-3 rounded ${
                    isActive
                      ? "bg-primary text-white font-semibold"
                      : "hover:bg-primary hover:text-white text-black "
                  }`
                }
              >
                <Images className="text-2xl mx-2" />
                Images & Videos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/car-detail"
                className={({ isActive }) =>
                  `block flex px-2 py-3 rounded ${
                    isActive
                      ? "bg-primary text-white font-semibold"
                      : "hover:bg-primary hover:text-white text-black "
                  }`
                }
              >
                <IoMdCar className="text-2xl mx-2" />
                Car Detail
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/mail"
                className={({ isActive }) =>
                  `block flex px-2 py-3 rounded ${
                    isActive
                      ? "bg-primary text-white font-semibold"
                      : "hover:bg-primary hover:text-white text-black "
                  }`
                }
              >
                <IoMailOutline className="text-2xl mx-2" />
                <p>Mail Box</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/new"
                className={({ isActive }) =>
                  `block flex px-2 py-3 rounded ${
                    isActive
                      ? "bg-primary text-white font-semibold"
                      : "hover:bg-primary hover:text-white text-black "
                  }`
                }
              >
                <Newspaper className="text-2xl mx-2" />
                <p> New & Event</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
