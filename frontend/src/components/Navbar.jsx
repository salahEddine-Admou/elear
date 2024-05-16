import React, { Fragment,useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from 'react-router-dom';
import Orangelogo from "../images/Orange_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"; // Ensure this is correctly imported
import {
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Settings from '../views/Settings';
import { getUserById } from '../services/UsersService'




const navigation = [];



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const navigate = useNavigate(); // Hook for navigation


     // Récupérer le nom d'utilisateur du stockage local
    const loggedInUsername = localStorage.getItem('username');

     const [imageFile, setImageFile] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState();



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    // je recupere l'image de profil du stockage local dans ce useEffect
    useEffect(() => {
      const profileImage = localStorage.getItem('profileImage');
      if (profileImage) {
        setImageFile(profileImage);// update l'etat de l'image de profil pour l'afficher
      }
    }, []);


  const handleSettingsClick = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        // Gérer le cas où le token est manquant
        console.error("User token is missing");
        return;
      }
  
      const userId = localStorage.getItem('userId');
      const userData = await getUserById(userId, token);
      setSelectedUser(userData);
      console.log(userData)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Gérer le cas où l'utilisateur n'est pas autorisé (token invalide ou expiré)
        console.error("User is not authorized. Please log in again.");
        // Rediriger vers la page de connexion ou afficher un message d'erreur
      } else {
        // Gérer d'autres erreurs
        console.error("Error fetching user data:", error);
      }
    }
  };
  
  const logout = async () => {
    const api = `http://localhost:8080/logOut`; // Logout URL

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(api, {
        method: 'GET', // Use 'GET' for logout requests
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('Logout successful');
        localStorage.removeItem("userToken"); // Remove token on successful logout
        navigate('/'); // Redirect to login
      } else {
        console.error('HTTP-Error:', response.status);
        alert(`Logout failed: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`Error: ${error.message}`);
    }
  };
  return (
    <Disclosure as="nav" className="bg-slate-950 fixed top-0 left-0 right-0 z-10">
      {({ Open }) => (
        <>
          <div className="mx-auto max-w-9xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between ">
                <div className="flex flex-shrink-0 items-center m-6">
                  <img className="h-9 w-auto " src={Orangelogo} alt="Orange" />
                  <div className="text-white ml-2 text-sm ">
                    <span className="font-bold">
                      Orange Digital
                      <br />
                      Center
                    </span>
                  </div>
              </div>
              
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div className="mr-6 ">
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {imageFile ? (
                      <img className="h-10 w-10 rounded-full" src={imageFile} alt="" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
                        {/* <span className="text-white"></span> */}
                      </div>
                    )}
                </Menu.Button>
                  </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <div className="mb-4">
                        {/* <span className="text-gray-800 font-bold px-9 space-y-8 text-xs">
                          {loggedInUsername}
                        </span> */}
                        <span className="text-gray-800 font-bold px-9 space-y-8 text-xs">{loggedInUsername}</span>

                        <FontAwesomeIcon
                          icon={faTimes} // Supposant que vous avez importé faTimes
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="mb-2 mr-4 m-4">
                        <Link
                          to="/settings"
                          // onClick={() => setIsModalOpen(false)} // Ou toute autre logique pour ouvrir le dialogue
                          onClick={handleSettingsClick} 
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-12 py-2 text-xs text-gray-700 border-2 border-black font-bold"
                          )}
                        >
                          Settings
                        </Link>
                        {isModalOpen && (
                          <Settings
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            user={selectedUser} // Passez les informations de l'utilisateur si nécessaire
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div className="mb-2 mr-4 m-4">
                      <button
                        onClick={logout} // Call the corrected logout function here
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-12 py-2 text-xs text-gray-700 border-2 border-orange-500 font-bold bg-orange-500 cursor-pointer"
                        )}
                      >
              Log out
            </button>
          </div>
        )}
      </Menu.Item>
    </Menu.Items>
  </Transition>
</Menu>;
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
