import React, { useEffect, useState } from "react";
import "../index.css";
import {
  ShoppingOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  FolderFilled,
  DownloadOutlined,
  MailFilled,
  BellFilled,
  HomeFilled,
  UserOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const navLinks = [
  {
    name: "Dashboard",
    icon: HomeFilled,
    path: "/dashbord"
  },
  {
    name: "Users",
    icon: UserOutlined,
    path: "/users"
  },
  {
    name: "Email",
    icon: MailFilled,
    path: "/email"
  },
  {
    name: "Notifications",
    icon: BellFilled,
    path: "/notification"
  },
  {
    name: "Formation",
    icon: ShoppingOutlined,
    path: "/formation"
  },
  {
    name: "Download",
    icon: DownloadOutlined,
    path: "/download"
  },
  {
    name: "Test",
    icon: FolderFilled,
    path: "/test"
  },
];

 const SideBar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1400);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (window.innerWidth < 700) {
      
    }
  })

  return (
    <>
    <div
      className={`flex w-64 h-screen  border ease-in-out duration-700 bg-white border-r-1 py-5 flex-col relative sidebar-transition ${collapsed ? "w-[80px] px-5 py-4" : "w-64"}`}
    >
      <div
        className="w-5 h-5  rounded-full absolute py-3 right-[5px] top-4  flex items-center justify-center text-black text-2xl"
        onClick={toggleCollapsed}
      >
        {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
      </div>

      <div className="mt-10 flex flex-col  space-y-6 ">
        {navLinks.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) => `flex flex-row items-center space-x-3 font-normal p-2 cursor-pointer  ${isActive ? "bg-[#34313221] text-black  border-l-4 border-[#ff7900] font-semibold " : ""}`}
            onClick={() => { } }
          >
            {React.createElement(item.icon)}
            {!collapsed && <span className="">{item.name}</span>}
          </NavLink>
        ))}
      </div>
    </div></>
  );
};

export default SideBar;


