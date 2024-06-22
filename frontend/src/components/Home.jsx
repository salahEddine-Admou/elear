import React from 'react';
import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Search from './Search';


function Home() {

        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const toggleMenu = () => {
          setIsMenuOpen(!isMenuOpen);
        };
      
        return (
          <div h-full className='justify-between'>
         
            <Navbar/>
          <div className="relative flex justify-between ">
          <Sidebar/>
            
            <Search/>
          </div>
          </div>
          
    )
}



export default Home;