﻿import React, { useState, useEffect } from 'react';
import img from '../images/img.png';
import { getFormationsCurrent, getFormationsMoreAdmin,deleteFormation,getFormation } from '../services/UsersService';
import { useNavigate } from "react-router-dom"; // Importez useNavigate
import AddFormationModal from '../components/AddFormationModal';
import ModifyFormationModal from '../components/ModifyFormationModal';
import Swal from 'sweetalert2';

const Formation = (onAdd) => {
  const [courses, setCourses] = useState([]);
  const [coursesM, setCoursesM] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAllCurrent, setShowAllCurrent] = useState(false);
  const [showAllMore, setShowAllMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formationId, setFormationId] = useState(null);
  const [formationDetails, setFormationDetails] = useState({}); 
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState(null);

 
  const navigate = useNavigate(); // Utilisez le hook useNavigate
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedCourses = await getFormationsCurrent();
        const formations = fetchedCourses.map(course => ({
          id: course.formation.id,
          title: course.formation.title,
          domaine: course.formation.domaine,
          description: course.formation.description,
          photo: course.formation.photo,
          langue: course.formation.langue,
          localisation: course.formation.localisation,
          modules: course.formation.modules.map(module => ({
            id: module.id,
            title: module.title,
            stateM: module.stateM,
            subtitles: module.subtitles
          })),
          state: course.state,
          progress: course.progress
        }));
        setCourses(formations || []);
      } catch (err) {
        console.error("An error occurred while fetching courses:", err);
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    
  
    const fetchData2 = async () => {
      try {
        setLoading(true);
        const fetchedCoursesM = await getFormationsMoreAdmin();
        setCoursesM(fetchedCoursesM || []);
      } catch (err) {
        console.error("An error occurred while fetching courses:", err);
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
  
    
  
    fetchData();
    fetchData2();
 
  }, []);
  
  const handleButtonClick = (id, name) => {
    localStorage.setItem('selectedTrainingId', id);
    localStorage.setItem('selectedTrainingName', 'Final Test - '+name); 
        // Rediriger vers une nouvelle page
        navigate('/AjoutModuleFormation');
  };

  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleAddClick = () => {
    setSelected(true)
    openModal();
  };
  
  const handleDeleteClick = async (id) => {
    try {
      setLoading(true);
      console.log(`Deleting formation with id: ${id}`);
    
      // Affichage de la boîte de dialogue de confirmation
      const confirmation = await Swal.fire({
        title: 'Êtes-vous sûr(e) de vouloir supprimer cette formation ?',
        text: "Cette action est irréversible !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e24e0e', // Couleur orange
        cancelButtonColor: '#808080', // Couleur grise
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler'
      });
    
      if (confirmation.isConfirmed) {
        const updatedCourses = coursesM.filter(course => course.id !== id);
          setCoursesM(updatedCourses);
    
        // Suppression de la formation (assurez-vous que deleteFormation est asynchrone et retourne une réponse correcte)
        const response = await deleteFormation(id);
    
        if (response.status === 'success') {
          console.log(`Formation with id: ${id} deleted successfully`);
    
          // Rafraîchir la liste des formations après la suppression
          
          Swal.fire({
            title: 'Supprimé !',
            text: 'La formation a été supprimée avec succès.',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000
          });
    
          // Actualiser automatiquement la page après la suppression
          setTimeout(() => {
          //  window.location.reload();
          }, 30);
        } else {
          console.error(`Failed to delete formation with id: ${id}: ${response.message}`);
          setError(`Failed to delete formation: ${response.message}`);
          Swal.fire({
            title: 'Erreur !',
            text: `Échec de la suppression de la formation : ${response.message}`,
            icon: 'error',
            showConfirmButton: false,
            timer: 3000
          });
        }
      }
    } catch (err) {
      console.error("An error occurred while deleting the formation:", err);
    
      // Afficher plus de détails sur l'erreur
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        console.error("This is likely a network or CORS issue.");
        setError('Network or CORS error: Failed to delete the formation');
      } else {
        setError('Failed to delete the formation');
      }
    
      Swal.fire({
        title: 'Erreur !',
        text: 'Une erreur est survenue lors de la suppression de la formation.',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000
      });
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleAddFormation = async (newFormation) => {
  
    setCoursesM(prevFormations => [...prevFormations, newFormation]);
     
    
  };

  const handleOpenModal = async (id) => {
    setFormationId(id);
    setIsOpen(true);
    // Récupérer les détails de la formation à partir de son ID
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("User token is missing");
        return;
      }
      const formation = await getFormation(id); // Correction ici
      setFormationDetails(formation);
    } catch (error) {
      console.error("Error fetching formation details:", error);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setFormationId();
    setFormationDetails({});
  };
  const handleFormationUpdate = (updatedFormation) => {
    setCoursesM(coursesM.map(formation => {
      return formation.id === updatedFormation.id ? updatedFormation : formation;
    }));
  };


  if (error) return <div>Error: {error}</div>;
  const visibleTrainings = showAllCurrent ? courses : courses.slice(0, 3);
  const visibleTrainings2= showAllMore ? coursesM : coursesM.slice(0, 2);

  return (
      <div className="bg-gray-200 ">
          <div className='py-16 '>

              <div className="bg-white p-4 sm:p-6 mx-2 sm:mx-6 h-full  mb-8 py-16 overflow-hidden ">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Formation</h2>
                    <div className="flex flex-wrap -mx-2">
                    {visibleTrainings2.map((training, i) => (
        <div key={i} className="p-2 w-full sm:w-1/2 lg:w-2/6">
        <a  className="inline-block w-full h-full bg-white border overflow-hidden">
            <div className="shadow-lg">
                <img src={training.photo} alt="Training" className="w-full object-cover h-48" loading="lazy" />
                <div className="p-3 flex flex-col">
                    <h3 className="text-md lg:text-xl font-bold">{training.title}</h3>
                    <p className="font-semibold text-sm lg:text-md text-gray-500">{training.domaine}</p>
                    <div className="mt-1.5">
                        <button  onClick={() => handleButtonClick(training.id,training.title)} className="bg-orange-500 text-black text-xs lg:text-sm font-bold w-20 py-1">Edit</button>
                        <button  onClick={() => handleOpenModal(training.id)} className="bg-orange-500 text-black text-xs lg:text-sm font-bold w-20 py-1 ml-2">Modify</button>
                        <button onClick={() => handleDeleteClick(training.id)} className="bg-red-500 text-black text-xs lg:text-sm font-bold w-20 py-1 ml-2">Delete</button>
                    
                    </div>
                </div>
            </div>
        </a>
    </div>
    ))}
    
          <div className="flex justify-center bg-gray-200 p-4 w-full sm:w-1/2 lg:w-2/6 mb-2 mt-2 ">
          <button 
        onClick={(e) => {
          e.preventDefault();
          handleAddClick();
        }}
          style={{ marginLeft: '10px' }}><svg width="151" height="240" viewBox="0 0 154 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M75.1 17.1V9.5H78.9V17.1H86.5V20.9H78.9V28.5H75.1V20.9H67.5V17.1H75.1ZM77 38C66.5066 38 58 29.4933 58 19C58 8.50659 66.5066 0 77 0C87.4933 0 96 8.50659 96 19C96 29.4933 87.4933 38 77 38ZM77 34.2C85.3948 34.2 92.2 27.3948 92.2 19C92.2 10.6053 85.3948 3.8 77 3.8C68.6053 3.8 61.8 10.6053 61.8 19C61.8 27.3948 68.6053 34.2 77 34.2Z" fill="#ADADAD"/>
          <path d="M5.45898 52.5605H9.11133L7.31445 46.8965L5.45898 52.5605ZM5.64453 43.6055H9.04297L14.1406 58H10.8789L9.95117 55.041H4.64844L3.65234 58H0.507812L5.64453 43.6055ZM19.0703 47.1016C19.7148 47.1016 20.2878 47.2448 20.7891 47.5312C21.2904 47.8112 21.6973 48.2018 22.0098 48.7031V43.625H24.832V58H22.127V56.5254C21.7298 57.1569 21.2773 57.6159 20.7695 57.9023C20.2617 58.1888 19.6302 58.332 18.875 58.332C17.6315 58.332 16.5833 57.8307 15.7305 56.8281C14.8841 55.819 14.4609 54.5267 14.4609 52.9512C14.4609 51.1348 14.8776 49.7057 15.7109 48.6641C16.5508 47.6224 17.6706 47.1016 19.0703 47.1016ZM19.6758 55.9883C20.4635 55.9883 21.0625 55.6953 21.4727 55.1094C21.8828 54.5234 22.0879 53.765 22.0879 52.834C22.0879 51.5319 21.7591 50.6009 21.1016 50.041C20.6979 49.7025 20.2292 49.5332 19.6953 49.5332C18.8815 49.5332 18.2826 49.8424 17.8984 50.4609C17.5208 51.0729 17.332 51.8346 17.332 52.7461C17.332 53.7292 17.5241 54.5169 17.9082 55.1094C18.2988 55.6953 18.888 55.9883 19.6758 55.9883ZM30.6895 47.1016C31.334 47.1016 31.9069 47.2448 32.4082 47.5312C32.9095 47.8112 33.3164 48.2018 33.6289 48.7031V43.625H36.4512V58H33.7461V56.5254C33.349 57.1569 32.8965 57.6159 32.3887 57.9023C31.8809 58.1888 31.2493 58.332 30.4941 58.332C29.2507 58.332 28.2025 57.8307 27.3496 56.8281C26.5033 55.819 26.0801 54.5267 26.0801 52.9512C26.0801 51.1348 26.4967 49.7057 27.3301 48.6641C28.1699 47.6224 29.2897 47.1016 30.6895 47.1016ZM31.2949 55.9883C32.0827 55.9883 32.6816 55.6953 33.0918 55.1094C33.502 54.5234 33.707 53.765 33.707 52.834C33.707 51.5319 33.3783 50.6009 32.7207 50.041C32.3171 49.7025 31.8483 49.5332 31.3145 49.5332C30.5007 49.5332 29.9017 49.8424 29.5176 50.4609C29.14 51.0729 28.9512 51.8346 28.9512 52.7461C28.9512 53.7292 29.1432 54.5169 29.5273 55.1094C29.918 55.6953 30.5072 55.9883 31.2949 55.9883ZM49.2402 47.1016C50.3405 47.1016 51.2389 47.3913 51.9355 47.9707C52.6387 48.5436 52.9902 49.4974 52.9902 50.832V58H50.1387V51.5254C50.1387 50.9655 50.0638 50.5358 49.9141 50.2363C49.6406 49.6895 49.1198 49.416 48.3516 49.416C47.4076 49.416 46.7598 49.8164 46.4082 50.6172C46.2259 51.0404 46.1348 51.5807 46.1348 52.2383V58H43.3613V47.375H46.0469V48.9277C46.4049 48.3809 46.7435 47.987 47.0625 47.7461C47.6354 47.3164 48.3613 47.1016 49.2402 47.1016ZM59.1602 49.3672C58.5156 49.3672 58.0143 49.569 57.6562 49.9727C57.3047 50.3763 57.0833 50.9232 56.9922 51.6133H61.3184C61.2728 50.8776 61.0482 50.321 60.6445 49.9434C60.2474 49.5592 59.7526 49.3672 59.1602 49.3672ZM59.1602 47.0723C60.0456 47.0723 60.8431 47.2383 61.5527 47.5703C62.2624 47.9023 62.8483 48.4264 63.3105 49.1426C63.7272 49.7741 63.9974 50.5065 64.1211 51.3398C64.1927 51.8281 64.222 52.5312 64.209 53.4492H56.9238C56.9629 54.5169 57.2982 55.2656 57.9297 55.6953C58.3138 55.9622 58.776 56.0957 59.3164 56.0957C59.8893 56.0957 60.3548 55.9329 60.7129 55.6074C60.9082 55.4316 61.0807 55.1875 61.2305 54.875H64.0723C64.0007 55.5065 63.6719 56.1478 63.0859 56.7988C62.1745 57.834 60.8984 58.3516 59.2578 58.3516C57.9036 58.3516 56.709 57.9154 55.6738 57.043C54.6387 56.1706 54.1211 54.7513 54.1211 52.7852C54.1211 50.9427 54.5866 49.5299 55.5176 48.5469C56.4551 47.5638 57.6693 47.0723 59.1602 47.0723ZM70.5059 47.3555H73.3281L74.9492 55.0215L76.6094 47.3555H79.5098L76.4238 58H73.5625L71.8926 50.2461L70.2031 58H67.3125L64.3242 47.3555H67.3125L68.9727 54.9922L70.5059 47.3555ZM84.3105 49.4355V47.4531H85.7949V44.4844H88.5488V47.4531H90.2773V49.4355H88.5488V55.0605C88.5488 55.4967 88.6042 55.7702 88.7148 55.8809C88.8255 55.985 89.1641 56.0371 89.7305 56.0371C89.8151 56.0371 89.903 56.0371 89.9941 56.0371C90.0918 56.0306 90.1862 56.0241 90.2773 56.0176V58.0977L88.959 58.1465C87.6439 58.1921 86.7454 57.9642 86.2637 57.4629C85.9512 57.1439 85.7949 56.6523 85.7949 55.9883V49.4355H84.3105ZM97.2383 47.1016C97.2904 47.1016 97.3327 47.1048 97.3652 47.1113C97.4043 47.1113 97.4857 47.1146 97.6094 47.1211V49.9727C97.4336 49.9531 97.2773 49.9401 97.1406 49.9336C97.0039 49.9271 96.8932 49.9238 96.8086 49.9238C95.6888 49.9238 94.9368 50.2884 94.5527 51.0176C94.3379 51.4277 94.2305 52.0592 94.2305 52.9121V58H91.4277V47.3555H94.084V49.2109C94.5137 48.5013 94.888 48.0163 95.207 47.7559C95.7279 47.3197 96.4049 47.1016 97.2383 47.1016ZM104.512 52.8242C104.336 52.9349 104.157 53.026 103.975 53.0977C103.799 53.1628 103.555 53.2246 103.242 53.2832L102.617 53.4004C102.031 53.5046 101.611 53.6315 101.357 53.7812C100.928 54.0352 100.713 54.429 100.713 54.9629C100.713 55.4382 100.843 55.7832 101.104 55.998C101.37 56.2064 101.693 56.3105 102.07 56.3105C102.669 56.3105 103.219 56.1348 103.721 55.7832C104.229 55.4316 104.492 54.7904 104.512 53.8594V52.8242ZM102.822 51.5254C103.337 51.4603 103.704 51.3789 103.926 51.2812C104.323 51.112 104.521 50.8483 104.521 50.4902C104.521 50.054 104.368 49.7546 104.062 49.5918C103.763 49.4225 103.32 49.3379 102.734 49.3379C102.077 49.3379 101.611 49.5007 101.338 49.8262C101.143 50.0671 101.012 50.3926 100.947 50.8027H98.2617C98.3203 49.8717 98.5807 49.1068 99.043 48.5078C99.7786 47.5703 101.042 47.1016 102.832 47.1016C103.997 47.1016 105.033 47.3327 105.938 47.7949C106.842 48.2572 107.295 49.1296 107.295 50.4121V55.2949C107.295 55.6335 107.301 56.0436 107.314 56.5254C107.334 56.89 107.389 57.1374 107.48 57.2676C107.572 57.3978 107.708 57.5052 107.891 57.5898V58H104.863C104.779 57.7852 104.72 57.5833 104.688 57.3945C104.655 57.2057 104.629 56.9909 104.609 56.75C104.225 57.1667 103.783 57.5215 103.281 57.8145C102.682 58.1595 102.005 58.332 101.25 58.332C100.286 58.332 99.4889 58.0586 98.8574 57.5117C98.2324 56.9583 97.9199 56.1771 97.9199 55.168C97.9199 53.8594 98.4245 52.9121 99.4336 52.3262C99.987 52.0072 100.801 51.7793 101.875 51.6426L102.822 51.5254ZM112.029 46.0859H109.207V43.5176H112.029V46.0859ZM109.207 47.3555H112.029V58H109.207V47.3555ZM120.025 47.1016C121.126 47.1016 122.024 47.3913 122.721 47.9707C123.424 48.5436 123.775 49.4974 123.775 50.832V58H120.924V51.5254C120.924 50.9655 120.849 50.5358 120.699 50.2363C120.426 49.6895 119.905 49.416 119.137 49.416C118.193 49.416 117.545 49.8164 117.193 50.6172C117.011 51.0404 116.92 51.5807 116.92 52.2383V58H114.146V47.375H116.832V48.9277C117.19 48.3809 117.529 47.987 117.848 47.7461C118.421 47.3164 119.146 47.1016 120.025 47.1016ZM128.607 46.0859H125.785V43.5176H128.607V46.0859ZM125.785 47.3555H128.607V58H125.785V47.3555ZM136.604 47.1016C137.704 47.1016 138.602 47.3913 139.299 47.9707C140.002 48.5436 140.354 49.4974 140.354 50.832V58H137.502V51.5254C137.502 50.9655 137.427 50.5358 137.277 50.2363C137.004 49.6895 136.483 49.416 135.715 49.416C134.771 49.416 134.123 49.8164 133.771 50.6172C133.589 51.0404 133.498 51.5807 133.498 52.2383V58H130.725V47.375H133.41V48.9277C133.768 48.3809 134.107 47.987 134.426 47.7461C134.999 47.3164 135.725 47.1016 136.604 47.1016ZM146.895 55.7148C147.546 55.7148 148.096 55.4707 148.545 54.9824C148.994 54.4876 149.219 53.7031 149.219 52.6289C149.219 51.6198 149.004 50.8516 148.574 50.3242C148.151 49.7969 147.581 49.5332 146.865 49.5332C145.889 49.5332 145.215 49.9922 144.844 50.9102C144.648 51.3984 144.551 52.0007 144.551 52.7168C144.551 53.3353 144.655 53.8854 144.863 54.3672C145.241 55.2656 145.918 55.7148 146.895 55.7148ZM146.201 47.1016C146.735 47.1016 147.201 47.1829 147.598 47.3457C148.275 47.6257 148.822 48.14 149.238 48.8887V47.3555H151.943V57.4531C151.943 58.8268 151.712 59.862 151.25 60.5586C150.456 61.7565 148.932 62.3555 146.68 62.3555C145.319 62.3555 144.209 62.0885 143.35 61.5547C142.49 61.0208 142.015 60.2233 141.924 59.1621H144.951C145.029 59.4876 145.156 59.722 145.332 59.8652C145.632 60.1191 146.136 60.2461 146.846 60.2461C147.848 60.2461 148.519 59.9108 148.857 59.2402C149.079 58.8105 149.189 58.0879 149.189 57.0723V56.3887C148.923 56.8444 148.636 57.1862 148.33 57.4141C147.777 57.8372 147.057 58.0488 146.172 58.0488C144.805 58.0488 143.711 57.5703 142.891 56.6133C142.077 55.6497 141.67 54.3477 141.67 52.707C141.67 51.125 142.064 49.7969 142.852 48.7227C143.639 47.6419 144.756 47.1016 146.201 47.1016Z" fill="#ADADAD"/>
          </svg></button>
          </div>
        
</div>


                    {coursesM.length > 2 && (
                        <div className="flex justify-center mt-4">
                            <button onClick={() => setShowAllMore(!showAllMore)} className="bg-orange-500 text-white px-4 py-2 text-sm font-bold ">
                                {showAllMore ? 'Show Less' : 'Show All'}
                            </button>
                        </div>
                        
                    )}
                   
              </div>
          </div>
          {selected&& (
        <AddFormationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddFormation={handleAddFormation}
        />
      )}
      {isOpen && (
        <ModifyFormationModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        formationDetails={formationDetails}    
        onUpdate={handleFormationUpdate} // Passing the update handler 
        />
      )}
      </div>
  );
}

export default Formation
    