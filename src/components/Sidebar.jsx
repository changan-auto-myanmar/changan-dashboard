import { NavLink } from "react-router-dom";
import { Images } from "lucide-react";
import { Newspaper } from "lucide-react";
import { IoMailOutline } from "react-icons/io5";
import { IoMdCar } from "react-icons/io";

import logo from "./../assets/logo.png";

const Sidebar = () => {
  return (
    <div className="h-screen text-black px-5 lg:w-[275px] ">
      <div className="bg-white h-full px-2 mt-5 rounded-md ">
        <div className="flex items-center justify-center ">
          <img src={logo} className="w-36 sm:w-[150px]" />
        </div>
        <nav className="flex-1 mt-10 md:mt-0">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/home/image-vedio"
                className={({ isActive }) =>
                  `block flex items-center justify-center sm:justify-start  px-2 py-3 rounded ${
                    isActive
                      ? "bg-primary text-white font-semibold"
                      : "hover:bg-primary hover:text-white text-black "
                  }`
                }
              >
                <Images className="text-2xl sm:mx-2" />
                <span className="hidden lg:block">Images & Videos</span>
                <span className="hidden sm:block lg:hidden">Images</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/car-detail"
                className={({ isActive }) =>
                  `block flex items-center justify-center sm:justify-start px-2 py-3 rounded ${
                    isActive
                      ? "bg-primary text-white font-semibold"
                      : "hover:bg-primary hover:text-white text-black "
                  }`
                }
              >
                <IoMdCar className="text-2xl sm:mx-2" />
                <span className="hidden lg:block">Car Detail</span>
                <span className="hidden sm:block lg:hidden">Detail</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/mail"
                className={({ isActive }) =>
                  `block flex items-center justify-center sm:justify-start px-2 py-3 rounded ${
                    isActive
                      ? "bg-primary text-white font-semibold"
                      : "hover:bg-primary hover:text-white text-black "
                  }`
                }
              >
                <IoMailOutline className="text-2xl sm:mx-2" />
                <span className="hidden lg:block">Mail Box</span>
                <span className="hidden sm:block lg:hidden">Mail</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/home/new"
                className={({ isActive }) =>
                  `block flex items-center justify-center sm:justify-start px-2 py-3 rounded ${
                    isActive
                      ? "bg-primary text-white font-semibold"
                      : "hover:bg-primary hover:text-white text-black "
                  }`
                }
              >
                <Newspaper className="text-2xl sm:mx-2" />
                <span className="hidden lg:block">New & Event</span>
                <span className="hidden sm:block lg:hidden">New</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
