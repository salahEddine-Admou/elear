import React, { useEffect } from "react";
import SideBar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Navbar";

const Layouts = () => {
  const location = useLocation();
  useEffect(() => window.scrollTo(0, 0), [location]);

  return (
    <>
      <NavBar /> 
      <div className="flex pt-14 h-screen overflow-hidden"> 
        <div className="sticky  h-screen"> 
          <SideBar />
        </div>
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layouts;
