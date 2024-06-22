import React from 'react';
import "../index.css";
import { GiTeacher } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";
import {
  HomeFilled,
  UserOutlined,
  MailFilled,
  DownloadOutlined,
  BellFilled
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const navLinks = [
  {
    name: "Home",
    icon: HomeFilled,
    path: "/Home/home1"
  },
  {
    name: "Trainings",
    icon: GiTeacher,
    path: "/Home/trainings"
  },
  {
    name: "Certificats",
    icon: FaUserGraduate,
    path: "/Home/Certificats"
  },
  {
    name: "Download",
    icon: DownloadOutlined,
    path: "/Home/download"
  },
  {
    name: "Notifications",
    icon: BellFilled,
    path: "/notifications"
  },
];

const SidebarC = () => {
  return (
    <div className="flex w-10 md:w-56 h-screen bg-white border-r border-gray-200 py-5 flex-col">
      <div className="mt-10 flex flex-col space-y-6">
        {navLinks.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `flex items-center p-2 cursor-pointer ${
                isActive ? "bg-gray-100 text-black border-l-4 border-orange-500 font-semibold" : ""
              }`
            }
          >
            {React.createElement(item.icon, {
              className: 'w-6 h-6'
            })}
            <span className="hidden md:inline pl-3">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarC;
