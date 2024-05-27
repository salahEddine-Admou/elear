import React,{useState} from 'react';
import '../App.css';
import { deleteUser } from "../services/UsersService";



const DeleteUser = ({ selectedUsers, onDelete}) => {

    const [data, setData] = useState([]);
    const handleDeleteUser = async (userId) => {
      const response = await deleteUser(userId);
      if (response.status === 'success') {
        setData(data.filter(user => user.id !== userId));
      } else {
        console.error('Deletion failed');
      }
    };
    return (
        <button
          onClick={() => onDelete(handleDeleteUser)}
          className="md:border-2  md:text-red-600 md:flex md:items-center md:justify-around md:space-x-2 md:border-red-600 md:hover:bg-red-600 md:hover:text-white md:py-2 md:px-4  md:font-bold"
        >
          Delete All
        </button>
      );
}

export default DeleteUser;
