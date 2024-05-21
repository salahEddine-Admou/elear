﻿import React, { useState, useRef } from 'react';
import '../App.css';
import { addFormation} from "../services/UsersService";

const AddFormationModal = ({ isOpen, onClose }) => {
  const [formation, setFormation] = useState({
    title: '',
    domaine: '',
    date: '',
    photo: '',
  });
  const [showSuccess, setShowSuccess] = useState(false); // État pour afficher la boîte de dialogue de succès

  const dialogRef = useRef(null);

  // Handle form field changes
 

  // Handle form submission
  const handleSubmit = async (e) => {
    if (window.confirm('Êtes-vous sûr de vouloir ajouter cette formation ?')) {
    e.preventDefault();
  

    try {
      // Appel à votre fonction API pour ajouter un utilisateur
      const response = await addFormation(formation);
      if (response.status === 'success') {
        console.log('formation added successfully');
        setShowSuccess(true); // Affiche le message de succès
        setTimeout(() => {
          setShowSuccess(false);
          onClose(); // Fermez le modal
          // Réinitialiser l'état de l'utilisateur après la fermeture
          window.location.reload();
          setFormation({
            title: "",
            domaine: "",
            date: "",
            phot: "",
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
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'photo') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormation(prevState => ({
            ...prevState,
            photo: reader.result,
            photoPreview: reader.result  // Set the preview URL
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormation(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  return (
    <>
      {!showSuccess && (
        <dialog className="modal-backdrop w-[480px]" ref={dialogRef}>
          <div className="modal-container flex mx-auto  w-11/12 max-w-6xl h-auto">
            <div className="flex flex-col w-full items-start modal-content px-10 rounded-lg">
              <span className="modal-close font-black absolute top-0 right-0 h-12 mt-3 mr-4 cursor-pointer text-3xl" onClick={onClose}>&times;</span>
              <h2 className="text-lg font-bold mb-4 mt-4">Add New Formation</h2>
              <form onSubmit={handleSubmit} className='mb-2'>

              <span className='font-bold text-sm'>Photo</span><span className="text-orange-500">*</span><br />
       
        <label htmlFor="photo-upload" className="upload-photo-label">
        {!formation.photo && (
          <>  <span className="svg-icon"><svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.10605 20.1161H22.3061V11.5605H24.7061V21.3383C24.7061 22.0134 24.1688 22.5605 23.5061 22.5605H1.90605C1.24332 22.5605 0.706055 22.0134 0.706055 21.3383V11.5605H3.10605V20.1161ZM13.9061 7.89388V16.4494H11.5061V7.89388H5.50605L12.7061 0.560547L19.9061 7.89388H13.9061Z" fill="#9C9C9C"/>
</svg></span>  <span>Upload Photo...</span>    


          <input type="file" id="photo-upload" name="photo" accept="image/*" onChange={handleChange} style={{ display: 'none' }}  />
          </>  )}
          {formation.photo && (
            <>
            <span className="svg-icon"><svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.10605 20.1161H22.3061V11.5605H24.7061V21.3383C24.7061 22.0134 24.1688 22.5605 23.5061 22.5605H1.90605C1.24332 22.5605 0.706055 22.0134 0.706055 21.3383V11.5605H3.10605V20.1161ZM13.9061 7.89388V16.4494H11.5061V7.89388H5.50605L12.7061 0.560547L19.9061 7.89388H13.9061Z" fill="#9C9C9C"/>
</svg></span>  <span>Change Photo...</span>  
             <input type="file" id="photo-upload" name="photo" accept="image/*" onChange={handleChange} style={{ display: 'none' }}  />
                  <img src={formation.photo} alt="Uploaded" className=" ml-16"controls  width="45%" height="50px" />  
                  </>
                )}
          </label>
          <br/>
          
              <span className='font-bold text-sm'>Title</span><span className="text-orange-500">*</span><br />
                <input type="text" name="title"  value={formation.title } onChange={handleChange} className="mr-12 border-2 border-gray-400 px-2 w-full" /><br /><br />
                <span className='font-bold text-sm '>Domaine</span><span className="text-orange-500">*</span><br />
                <input type="text" name="domaine" value={formation.domaine }  onChange={handleChange} placeholder="" className="border-2 border-gray-400 px-2 w-full" required /><br /><br />
                <span className='font-bold text-sm '>Date</span><span className="text-orange-500">*</span><br />
                <input type="text" name="date" value={formation.date }  onChange={handleChange} className="border-2 border-gray-400 px-2 w-full text-sm" /><br /><br />
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
            <p className="success-text ">The formation was added <span className='font-bold'>successfully!</span></p>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFormationModal;