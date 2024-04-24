﻿import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import SideBar2 from "../components/SidebarC"; // Corrected assumption for alternative sidebar
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Navbar";

const Layouts = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Scroll to top on location change
    window.scrollTo(0, 0);

    // Check local storage for user role
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, [location]);

  const getSidebarComponent = () => {
    switch(userRole) {
      case 'ADMIN':
        return <SideBar />;
      case 'USER':
        return <SideBar2 />;
      default:
        return <SideBar2 />;
    }
  }

  return (
    <>
      <NavBar /> 
      <div className="flex pt-14 h-screen overflow-hidden"> 
        <div className="sticky h-screen"> 
          {getSidebarComponent()}
        </div>
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layouts;
