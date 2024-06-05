import React, { useState } from "react";
import "../App.css";
import Table from "./Table.jsx";
import AddUserModal from "./AddUserModal .jsx"; // This is the modal component you'll create
import { PlusCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import UserTable from "./Table.jsx";
import { deleteSelectedUsers } from "../services/UsersService.jsx";
import Swal from "sweetalert2";


const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredValue, setFilteredValue] = useState('');
  const [user, setUser] = useState();
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [data, setData] = useState([]);

  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const AddUs = (user) => {
    setUser(user);
  };
  const handleSearch = () => {
    setFilteredValue(searchValue); // Set the filtered value to the current search value
  };
const handleDeleteAll = async () => {
    console.log('Selected users:', selectedUsers);
    const result = await Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Cette action est irréversible!",
        icon: 'warning',
        iconColor: 'rgb(226, 78, 14)',
        showCancelButton: true,
        confirmButtonColor: '#e24e0e', // Couleur orange
        cancelButtonColor: '#808080', // Couleur grise
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler',
        customClass: {
            popup: 'sweetalert-popup',
            confirmButton: 'confirm-button-class',
            cancelButton: 'cancel-button-class'
        }
    });

    if (result.isConfirmed) {
        const userIds = Array.from(selectedUsers);
        const deleteResponse = await deleteSelectedUsers(userIds);

        if (deleteResponse.status === 'success') {
            setData(data.filter(user => !userIds.includes(user.id))); // Assurez-vous d'utiliser `user.id` si c'est l'identifiant correct
            setSelectedUsers(new Set());

            Swal.fire({
                title: 'Supprimé!',
                text: 'Les utilisateurs sélectionnés ont été supprimés.',
                icon: 'success',
                showConfirmButton: false, // Masque le bouton OK
                timer: 3000 // Affiche le message pendant 3 secondes
            });
        } else {
            Swal.fire({
                title: 'Erreur!',
                text: deleteResponse.message,
                icon: 'error',
                showConfirmButton: true,
            });
        }
    }
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

        <button
          onClick={handleDeleteAll}
          className="md:border-2  md:text-red-600 md:flex md:items-center md:justify-around md:space-x-2 md:border-red-600 md:hover:bg-red-600 md:hover:text-white md:py-2 md:px-6  md:font-bold"
          
        >
          <PlusCircleTwoTone twoToneColor="#52c41a" className="md:hidden " />
          <span className="hidden md:inline-block text-sm">Delete</span>
        </button>

        </div>
      </div>
      <UserTable
        searchValue={filteredValue}
        user={user}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        data={data}
        setData={setData}
      />
      <AddUserModal isOpen={isModalOpen} onClose={closeModal} Add={AddUs} />
    </div>
  );
};

export default Search;
