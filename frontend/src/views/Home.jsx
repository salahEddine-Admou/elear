import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div h-full className="justify-between">
      
      <div className="relative flex justify-between ">
        {/* <Sidebar /> */}
        <Search />
      </div>
    </div>
  );
}

export default Home;
