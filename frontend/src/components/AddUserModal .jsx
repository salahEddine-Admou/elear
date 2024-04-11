import React, { useState, useRef } from 'react';
import '../App.css';
import { addUser} from "../services/UsersService";

const AddUserModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState({
  
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    date: '',
    address: '',
    role: '',
  });
  const [showSuccess, setShowSuccess] = useState(false); // État pour afficher la boîte de dialogue de succès

  const dialogRef = useRef(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (window.confirm('Êtes-vous sûr de vouloir ajouter cet utilisateur ?')) {
    e.preventDefault();
    console.log(user);

    try {
      // Appel à votre fonction API pour ajouter un utilisateur
      const response = await addUser(user);
      if (response.status === 'success') {
        console.log('User added successfully');
        setShowSuccess(true); // Affiche le message de succès
        setTimeout(() => {
          setShowSuccess(false);
          onClose(); // Fermez le modal
          // Réinitialiser l'état de l'utilisateur après la fermeture
          window.location.reload();
          setUser({
            fullName: "",
            username: "",
            email: "",
            password: "",
            date: "",
            role: "",
          });
        }, 3000); // Message de succès affiché pendant 3 secondes
      } else {
        // Gérez les réponses d'erreur de votre API ici
        console.error('Failed to add user:', response.message);
      }
    } catch (error) {
      // Gestion des erreurs de la requête
      console.error("Error adding user:", error);
    }
  }
  };

  // Handle closing of the success dialog
  const handleSuccessClose = () => {
    setShowSuccess(false);
  };

  // Open or close the dialog based on the isOpen prop
  React.useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <>
      {!showSuccess && (
        <dialog className="modal-backdrop w-[480px]" ref={dialogRef}>
          <div className="modal-container flex mx-auto  w-11/12 max-w-6xl h-auto">
            <div className="flex flex-col w-full items-start modal-content px-10 rounded-lg">
              <span className="modal-close font-black absolute top-0 right-0 h-12 mt-3 mr-4 cursor-pointer text-3xl" onClick={onClose}>&times;</span>
              <h2 className="text-lg font-bold mb-4 mt-4">Add New User</h2>
              <form onSubmit={handleSubmit} className='mb-2'>
              <span className='font-bold text-sm'>Full Name</span><span className="text-orange-500">*</span><br />
                <input type="text" name="fullName"  value={user.fullName } onChange={handleChange} className="mr-12 border-2 border-gray-400 px-2 w-full" /><br /><br />
                <span className='font-bold text-sm '>User name</span><span className="text-orange-500">*</span><br />
                <input type="text" name="username" value={user.username } onChange={handleChange} placeholder="" className="border-2 border-gray-400 px-2 w-full" required /><br /><br />
                <span className='font-bold text-sm '>Email</span><span className="text-orange-500">*</span><br />
                <input type="email" name="email" value={user.email } onChange={handleChange} placeholder="" className="border-2 border-gray-400 px-2 w-full" required /><br /><br />
                <span className='font-bold text-sm '>password</span><span className="text-orange-500">*</span><br />
                <input type="password" name="password" value={user.password } onChange={handleChange} className="border-2 border-gray-400 px-2 w-full" required /><br /><br />
                <span className='font-bold text-sm '>Date of birth</span><span className="text-orange-500">*</span><br />
                <input type="date" name="date" value={user.date } onChange={handleChange} className="border-2 border-gray-400 px-2 w-full text-sm" /><br /><br />
                <span className='font-bold text-sm '>Role</span><span className="text-orange-500">*</span><br />
                <select
                name="role"
                value={user.role}
                onChange={handleChange}
                className="border-2 border-gray-400 px-2 w-full text-sm"
                required
                >
                {/* Option par défaut pour inciter à la sélection */}
                <option value="" >Sélectionnez une adresse</option>
                <option  value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
                <option value="TRAINER">TRAINER</option>

                {/* Si vous avez des options dynamiques, vous pouvez les rendre ainsi */}
                {/* {addresses.map((address, index) => (
                    <option key={index} value={address}>
                    {address}
                    </option>
                ))} */}
                </select>
                <br /><br />
                <input type="submit" value="Add" className="border-2 border-orange-500 bg-orange-500 mb-6 px-4 font-bold text-sm" />
              </form>
            </div>
          </div>
        </dialog>
      )}
      {showSuccess && (
        <div className="success-dialog px-4 py-4 w-[80%]" onClick={handleSuccessClose}>
          <div className="">
            <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7324 14.0927L18.3918 27.1488C18.3918 27.1488 17.2101 28.7659 15.5428 27.0218C14.038 25.4484 9.87196 20.4801 9.87196 20.4801C9.87196 20.4801 8.92301 19.2739 10.3337 17.9409C11.5239 16.8163 12.4374 17.2737 12.7202 17.5559C13.1825 18.0172 16.1588 21.0185 16.1588 21.0185C16.1588 21.0185 16.5177 21.3776 17.0563 20.7877L26.1403 11.7076C26.1403 11.7076 27.2447 10.6806 28.4761 11.7838C29.7492 12.9239 28.7324 14.0927 28.7324 14.0927ZM19.3383 4.64921C26.6772 4.66163 32.814 10.2306 33.5367 17.5338C34.2593 24.8371 29.333 31.5008 22.1389 32.9513C14.9447 34.4018 7.82115 30.1677 5.6574 23.1549C3.49364 16.1422 6.99301 8.63042 13.7538 5.77518C15.5206 5.02796 17.42 4.64499 19.3383 4.64921ZM19.3383 0.233887C8.97404 0.233887 0.572144 8.63579 0.572144 19.0001C0.572144 29.3643 8.97404 37.7662 19.3383 37.7662C29.7026 37.7662 38.1045 29.3643 38.1045 19.0001C38.1045 8.63579 29.7026 0.233887 19.3383 0.233887Z" fill="#14AE5C" />
            </svg></div>
          <div className="">
            <p className="success-text ">The user was added <span className='font-bold'>successfully!</span></p>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUserModal;
