import React, { useState } from "react";
import "../App.css";
import Table from "./Table.jsx";
import AddUserModal from "./AddUserModal .jsx";
import { PlusCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import UserTable from "./Table.jsx";
import { deleteUsers, getUsers } from "../services/UsersService.jsx";
import Swal from 'sweetalert2';

const Search = () => {
 const [searchValue, setSearchValue] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filteredValue, setFilteredValue] = useState('');
  const [user, setUser] = useState();
  const [checkedIndices, setCheckedIndices] = useState(new Set());
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // or useState("")
  const [deletee, setDeletee] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  
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
  
const handleDeleteSelectedUsers = async () => {
  try {
    const confirmation = await Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e24e0e', // Couleur orange
      cancelButtonColor: '#808080', // Couleur grise
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    });

    if (confirmation.isConfirmed) {
      const selectedUserIds = Array.from(checkedIndices);
      console.log(selectedUserIds) 
      setSelectedUserIds(selectedUserIds)
      const response = await deleteUsers(selectedUserIds);
      setDeletee(true);
      if (response.status === 'success') {
        console.log(`Users with ids: ${selectedUserIds} deleted successfully`);
        Swal.fire({
          title: 'Supprimé !',
          text: 'Les utilisateurs ont été supprimés avec succès.',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        });
        fetchUsers();
      } else {
        console.error(`Failed to delete users with ids: ${selectedUserIds}: ${response.message}`);
        setError(`Failed to delete users: ${response.message}`);
        Swal.fire({
          title: 'Erreur !',
          text: `Échec de la suppression des utilisateurs : ${response.message}`,
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    }
  } catch (err) {
    console.error("An error occurred while deleting the users:", err);

    // Afficher plus de détails sur l'erreur
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      console.error("This is likely a network or CORS issue.");
      setError('Network or CORS error: Failed to delete the users');
    } else {
      setError('Failed to delete the users');
    }

    Swal.fire({
      title: 'Erreur !',
      text: 'Une erreur est survenue lors de la suppression des utilisateurs.',
      icon: 'error',
      showConfirmButton: false,
      timer: 3000
    });
  } finally {
    // setLoading(false);
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
            onClick={handleDeleteSelectedUsers}
            className="md:border-2 md:text-red-600 md:flex md:items-center md:justify-around md:space-x-2 md:border-red-600 md:hover:bg-red-600 md:hover:text-white md:py-2 md:px-6 md:font-bold"
          >
            <PlusCircleTwoTone twoToneColor="#52c41a" className="md:hidden" />
            <span className="hidden md:inline-block text-sm">Delete</span>
          </button>
        <button
          onClick={openModal}
          className="md:border-2  md:text-green-600 md:flex md:items-center md:justify-around md:space-x-2 md:border-green-600 md:hover:bg-green-600 md:hover:text-white md:py-2 md:px-6  md:font-bold"
          
        >
          <PlusCircleTwoTone twoToneColor="#52c41a" className="md:hidden " />
          <span className="hidden md:inline-block text-sm">Add User</span>
        </button>

        </div>
      </div>
      {/* <UserTable searchValue={filteredValue} user={user} /> */}
      <UserTable searchValue={filteredValue} user={user} checkedIndices={checkedIndices} setCheckedIndices={setCheckedIndices}  />

      <AddUserModal isOpen={isModalOpen} onClose={closeModal} Add={AddUs} />
    </div>
  );
};

export default Search;
