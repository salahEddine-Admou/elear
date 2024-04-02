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
    path: "/dashboard"
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
        className="w-5 h-5  rounded-full absolute py-3 right-[5px] top-4  flex items-center justify-center text-black text-3xl"
        onClick={toggleCollapsed}
      >
        {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
      </div>

      <div className="mt-10 flex flex-col  space-y-6 ">
        {navLinks.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) => `flex flex-row items-center space-x-3 font-normal p-2 cursor-pointer text-xl ${isActive ? "bg-[#34313221] text-black  border-l-4 border-[#ff7900] font-semibold text-xl" : ""}`}
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



/*
import React, { useState } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faFolder,
  faBars,
  faHouseChimney,
  faChevronRight,
  faTimes,
  faTachometerAlt,
  faBell,
  faBookOpen,
  fafolder,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {sidebarOpen && (
        <div className="sidebar text-black w-80 py-2 px-2 relative">
          <div className="absolute top-0 right-0 pt-2 pr-2">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="cursor-pointer h-6 "
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          <ul className="pt-8">
            <li>
              <a
                href="#dashboard"
                className="block py-6 px-5 hover:bg-gray-200 text-xl font-bold "
              >
                <FontAwesomeIcon
                  icon={faHouseChimney}
                  className="w-5 h-5 text-black px-4"
                />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#dashboard"
                className="block py-6 px-6 hover:bg-gray-200 text-xl font-bold "
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="w-10 h-6 text-black"
                />
                <span>Notifications</span>
              </a>
            </li>
            <li>
              <a
                href="#dashboard"
                className="block py-6 px-9 hover:bg-gray-200 text-xl font-bold "
              >
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="w-5 h-5 text-black mr-2"
                />
                <span>Formations</span>
              </a>
            </li>
            <li>
              <a
                href="#dashboard"
                className="block py-6 px-9 hover:bg-gray-200 text-xl font-bold "
              >
                <FontAwesomeIcon
                  icon={faFolder}
                  className="w-5 h-5 text-black mr-2"
                />
                <span>Tests</span>
              </a>
            </li>
          </ul>
        </div>
      )}
      {!sidebarOpen && (
        <div className="sidebar text-black w-[6rem]  relative">
          <div className="absolute top-0 right-0 mb-4">
            <FontAwesomeIcon
              icon={faChevronRight}
              className="cursor-pointer h-6 "
              onClick={() => setSidebarOpen(true)}
            />
          </div>
          <div className="mt-4">
            <ul className="pt-8 flex justify-start flex-col items-center space-y-6">
              <li>
                <a
                  href="#dashboard"
                  className="block p-4 hover:bg-gray-200 text-xl font-bold "
                >
                  <FontAwesomeIcon
                    icon={faHouseChimney}
                    className="w-8 h-8 text-black"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#dashboard"
                  className="block p-4 hover:bg-gray-200 text-xl font-bold "
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="w-8 h-8 text-black"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#dashboard"
                  className="block p-4 hover:bg-gray-200 text-xl font-bold "
                >
                  <FontAwesomeIcon
                    icon={faBookOpen}
                    className="w-8 h-8 text-black"
                  />
                </a>
              </li>
              <li>
                <a
                  href="#dashboard"
                  className="block p-4 hover:bg-gray-200 text-xl font-bold "
                >
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="w-8 h-8 text-black"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;*/
