import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import { updateFormation,get  } from "../services/UsersService";
import Swal from 'sweetalert2';



const ModifyFormationModal = ({ isOpen, onClose,formationDetails,onUpdate }) => {
   
  console.log(formationDetails)
    const [formData, setFormData] = useState({
      title:  '',
      domaine: '',
      date:  '',
      photo: '',
    });
   

  const [showSuccess, setShowSuccess] = useState(false); // État pour afficher la boîte de dialogue de succès

  const dialogRef = useRef(null);


 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...formData,
      [name]: value
    }));
  };

  useEffect(() => {
    
    setFormData({
        title: formationDetails.title || '',
        domaine: formationDetails.domaine || '',
        date: formationDetails.date || '',
        photo: formationDetails.photo || '',
    })
  },[formationDetails, isOpen]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
  
    console.log(formationDetails);
    if (formationDetails && formationDetails.id) {
      try {
        const response = await updateFormation(formationDetails.id, formData);
  
        if (response.status === 'success') {
          onUpdate(response.data);
          // Afficher un message de succès
          Swal.fire({
            title: 'Mise à jour réussie !',
            text: 'La formation a été mise à jour avec succès.',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
          });
  
          // Fermer le modal après un délai
          setTimeout(() => {
            onClose();
          }, 3000);
        } else {
          // Afficher un message d'erreur
          Swal.fire({
            title: 'Erreur',
            text: `Échec de la mise à jour de la formation : ${response.message}`,
            icon: 'error',
            showConfirmButton: false,
            timer: 3000
          });
        }
      } catch (error) {
        // Gestion des erreurs de la requête
        Swal.fire({
          title: 'Erreur',
          text: "Une erreur est survenue lors de la mise à jour de la formation.",
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
        console.error("Erreur lors de la mise à jour de la formation:", error);
      }
    }
  };
  

   useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  


  return (
    <>
     {!showSuccess && (
       <dialog className="modal-backdrop w-[900px]" ref={dialogRef}>
       <div className="modal-container flex mx-auto w-900 h-auto">
         <div className="w-full items-start modal-content px-6 rounded-lg">
           <span className="modal-close font-black absolute top-0 right-0 h-12 mt-6 mr-2 cursor-pointer text-3xl" onClick={onClose}>&times;</span>
           <h2 className="text-lg font-bold mb-4 mt-4">Modify Formation</h2>
           <form onSubmit={handleSubmit} className='mb-4 w-full'>
           <span className='font-bold text-sm'>Photo</span><span className="text-orange-500">*</span><br />
          
            <label htmlFor="photo-upload" className="upload-photo-label mb-12 custom-width" style={{ position: 'relative', overflow: 'hidden','height': '150px', }}>
              {!formData.photo && (
                <>  <span className="svg-icon"><svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.10605 20.1161H22.3061V11.5605H24.7061V21.3383C24.7061 22.0134 24.1688 22.5605 23.5061 22.5605H1.90605C1.24332 22.5605 0.706055 22.0134 0.706055 21.3383V11.5605H3.10605V20.1161ZM13.9061 7.89388V16.4494H11.5061V7.89388H5.50605L12.7061 0.560547L19.9061 7.89388H13.9061Z" fill="#9C9C9C"/>
                </svg></span>  <span>Upload Photo...</span>    
                          <input type="file" id="photo-upload" name="photo" accept="image/*" onChange={handleChange} style={{ display: 'none' }}  />
                          </>  
              )}
              {formData.photo && (
                <>
                  <span className="svg-icon mr-2 icon-placeholder invisible">
                    <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.10605 20.1161H22.3061V11.5605H24.7061V21.3383C24.7061 22.0134 24.1688 22.5605 23.5061 22.5605H1.90605C1.24332 22.5605 0.706055 22.0134 0.706055 21.3383V11.5605H3.10605V20.1161ZM13.9061 7.89388V16.4494H11.5061V7.89388H5.50605L12.7061 0.560547L19.9061 7.89388H13.9061Z" fill="#9C9C9C"/>
                    </svg>
                  </span>
                  <span>Change Photo...</span>
                  <input type="file" id="photo-upload" name="photo" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
                  <img src={formData.photo} alt="Uploaded" className="ml-4 uploaded-photo" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
                  </>
                  )}
                  </label>
                  <br/>
                  <label className='font-bold text-sm'>
                  Title<span className="text-orange-500">*</span>
                  </label><br />
                  <input type="text" name="title" value={formData.title} onChange={handleChange} className="border-2 border-gray-400 px-2 py-1 w-full mb-4" />

                  <label className='font-bold text-sm'>
                  Domaine<span className="text-orange-500">*</span>
                  </label><br />
                  <input type="text" name="domaine" value={formData.domaine} onChange={handleChange} className="border-2 border-gray-400 px-2 py-1 w-full mb-4" required />

                  <label className='font-bold text-sm'>
                  Durée<span className="text-orange-500">*</span>
                  </label><br />
                  <input type="text" name="date" value={formData.date} onChange={handleChange} className="border-2 border-gray-400 px-2 py-1 w-full mb-4" />

                  <input type="submit" value="Modify" className="border-2 border-orange-500 bg-orange-500 text-white py-2 px-4 font-bold text-sm w-250" />
                  </form>
                  </div>
                  </div>
                  </dialog>  
                  )}
                  
</>
);
};

export default ModifyFormationModal;
