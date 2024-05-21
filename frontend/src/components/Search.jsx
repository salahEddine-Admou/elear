import React, { useState } from "react";
import "../App.css";
import Table from "./Table.jsx";
import AddUserModal from "./AddUserModal .jsx"; // This is the modal component you'll create
import { PlusCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import UserTable from "./Table.jsx";

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredValue, setFilteredValue] = useState('');


  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSearch = () => {
    setFilteredValue(searchValue); // Set the filtered value to the current search value
  };

  return (
    <div className="bg-gray-100 w-full items-center min-h-screen">
      <div className="bg-white py-5 shadow rounded-lg w-auto m-10 mt-10 flex pr-2 items-center sm:flex-row justify-between">
        <div className="flex items-center flex-grow w-auto px-3 ">
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-gray-400 py-2 px-5 focus:outline-none focus:border-black font-bold w-full md:w-auto text-sm "
            value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="border-2 text-black border-black py-2 px-4  font-bold ml-4 hover:bg-black hover:text-white md:inline-flex hidden text-sm"
          onClick={handleSearch}
          >
            
            Search
          </button>
          <SearchOutlined className="md:hidden  border-2 text-black border-black rounded-full py-1 px-1 font-bold ml-4 hover:bg-black hover:text-white" />
        </div>
        <div className="flex space-x-2">
        <button
          onClick={openModal}
          className="md:border-2  md:text-green-600 md:flex md:items-center md:justify-around md:space-x-2 md:border-green-600 md:hover:bg-green-600 md:hover:text-white md:py-2 md:px-6  md:font-bold"
          
        >
          <PlusCircleTwoTone twoToneColor="#52c41a" className="md:hidden " />
          <span className="hidden md:inline-block text-sm">Add User</span>
        </button>
        </div>
      </div>
      <UserTable searchValue={filteredValue} />
      <AddUserModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Search;
