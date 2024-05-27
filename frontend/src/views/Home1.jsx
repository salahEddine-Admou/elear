import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; // Importez useNavigate
import img from '../images/img.png';
import { getFormationsCurrent, getFormationsMore, inscription, getUserFromToken} from '../services/UsersService';

// import { getFormationsCurrent, getFormationsMore,getUserFromToken} from '../services/UsersService';




const Home1 = () => {
  const [loggedInfullName, setLoggedInfullName] = useState('');
  const [courses, setCourses] = useState([]);
  const [coursesM, setCoursesM] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAllCurrent, setShowAllCurrent] = useState(false);
  const [showAllMore, setShowAllMore] = useState(false);
  const [name, setName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); 
  const navigate = useNavigate(); // Utilisez le hook useNavigate
  useEffect(() => {
    const fullName = localStorage.getItem("fullName")
    if (fullName) {
      setName(fullName);
    }
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
        console.log(courses)
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
        const fetchedCoursesM = await getFormationsMore();
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
  
  //FullNAme
  useEffect(() => {
    const fullName = getUserFromToken();
    setLoggedInfullName(fullName);
  }, []);
  

    const handleClick = (trainingId)=> {
        // Stocker l'ID dans le stockage local
        localStorage.setItem('selectedTrainingId', trainingId);
        
        // Rediriger vers une nouvelle page
        navigate('/modules');
    };
    const handleClickAcces = async(trainingTitle)=> {
      // Stocker l'ID dans le stockage local
      try {
        // Appel à votre fonction API pour ajouter un utilisateur
        const response = await inscription(trainingTitle);
        if (response.status === 'success') {
          console.log('successfully');
          setShowSuccess(true); // Affiche le message de succès
          setTimeout(() => {
            setShowSuccess(false);
            console.log("hiiii hello"+response.data)

            const formation = {
              id: response.data.formation.id,
              title: response.data.formation.title,
              domaine: response.data.formation.domaine,
              description: response.data.formation.description,
              photo: response.data.formation.photo,
              langue: response.data.formation.langue,
              localisation: response.data.formation.localisation,
              modules: response.data.formation.modules.map(module => ({
                id: module.id,
                title: module.title,
                stateM: module.stateM,
                subtitles: module.subtitles
              })),
              state: response.data.state,
              progress: response.data.progress
            };




            setCourses(prevCourses => [...prevCourses, formation]);
            setCoursesM(prevCoursesM => prevCoursesM.filter(course => course.title !== trainingTitle));
            // Réinitialiser l'état de l'utilisateur après la fermeture
            //window.location.reload();
          }, 1000);
        } else {
          // Gérez les réponses d'erreur de votre API ici
          console.error('Failed :', response.message);
        }
      } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Error:", error);
      }
  };
  
  const handleSuccessClose = () => {
    setShowSuccess(false);
  };
 // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const visibleTrainings = showAllCurrent ? courses : courses.slice(0, 3);
  const visibleTrainings2= showAllMore ? coursesM : coursesM.slice(0, 3);
  return (
    <div className='px-4 md:px-12'>

      <h1 className='font-bold text-xl md:text-3xl mt-12'>Welcome again <span className='text-orange-500'>{name}!</span></h1>

      <h1 className='font-bold text-xl md:text-3xl mt-12'>Welcome again <span className='text-orange-500'>{loggedInfullName}!</span></h1>

      <div className='mt-12 '>
        <div className='flex flex-row space-x-3 mb-8 '><div className='text-xl font-bold w-56 '>Continue Studying</div>
        <div className='bg-gray-300 h-0.5 m-4 w-full'></div></div>

        
        <div className='flex flex-col '>
                    <div className="flex flex-col md:flex-col space-y-4  ">
                    {visibleTrainings.length > 0 ? (
                     visibleTrainings.map((training, i) => (
                      <div className=''>
                      <div key={i} className="flex flex-col sm:flex-row sm:w-2/3 md:w-1/3">
                          <img src={training.photo} alt="Training" className="w-full" loading="lazy" />
                          <div className="p-3.5 w-full ">
                              <h3 className="text-xl font-bold">{training.title}</h3>
                              <p className="font-semibold mt-1.5 text-sm">{training.domaine}</p>
                              <span className='font-semibold text-sm text-gray-500'>{training.progress}%</span>
                              
                              <div className='w-full bg-gray-200 h-2 mt-1.5'>
                                <div className='bg-orange-500 h-2' style={{ width: `${training.progress}%` }}></div>
                              </div>
                              <div className="flex justify-start mt-3">
                                  <button className="bg-orange-500 text-black px-3 py-1.5 text-xs font-bold" onClick={() => handleClick(training.id)}>Continue</button>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                      ))
                    ) : (
                      <div className="w-full text-center w-1/3 p-8">
                        <p className='font-bold'>No Current Trainings</p>
                      </div>
                    )}
                       
                    </div>
                    {courses.length > 3 && (
                        <div className="flex justify-center mt-4">
                            <button onClick={() => setShowAllCurrent(!showAllCurrent)} className="bg-orange-500 text-white px-4 py-2 text-sm font-bold">
                                {showAllCurrent ? 'Show Less' : 'Show All'}
                            </button>
                        </div>
                        
                    )}
                    </div>

                    <div className='mt-10 mb-10'>
  <div className='flex flex-row items-center'>
    <div className='text-xl font-bold mb-4'>More courses</div>
    <div className='bg-gray-300 h-0.5 flex-grow m-4'></div>
  </div>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4 '>
    {visibleTrainings2.length > 0 ? (
      visibleTrainings2.map((training, index) => (
        <div key={index} className="bg-white border shadow-lg overflow-hidden">
          <img src={training.photo} alt="Training" className="w-full object-cover h-48" loading="lazy" />
          <div className="p-3">
            <h3 className="text-md lg:text-xl font-bold">{training.title}</h3>
            <p className="font-semibold text-sm lg:text-md text-gray-500">{training.domaine}</p>
            <button className="mt-1.5 bg-orange-500 text-black text-xs lg:text-sm font-bold w-20 py-1" onClick={() => handleClickAcces(training.title)}>Access</button>
          </div>
        </div>
      ))
    ) : (
      <div className="w-full text-center ">
        <p className='font-bold'>No Trainings  available</p>
      </div>
    )}
  </div>
  {coursesM.length > 3 && (
    <div className="flex justify-center mt-4">
      <button onClick={() => setShowAllMore(!showAllMore)} className="bg-orange-500 text-white px-4 py-2 text-sm font-bold">
        {showAllMore ? 'Show Less' : 'Show All'}
      </button>
    </div>
  )}
   {showSuccess && (
        <div className="success-dialog px-4 py-4 w-[80%]" onClick={handleSuccessClose}>
          <div className="">
            <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7324 14.0927L18.3918 27.1488C18.3918 27.1488 17.2101 28.7659 15.5428 27.0218C14.038 25.4484 9.87196 20.4801 9.87196 20.4801C9.87196 20.4801 8.92301 19.2739 10.3337 17.9409C11.5239 16.8163 12.4374 17.2737 12.7202 17.5559C13.1825 18.0172 16.1588 21.0185 16.1588 21.0185C16.1588 21.0185 16.5177 21.3776 17.0563 20.7877L26.1403 11.7076C26.1403 11.7076 27.2447 10.6806 28.4761 11.7838C29.7492 12.9239 28.7324 14.0927 28.7324 14.0927ZM19.3383 4.64921C26.6772 4.66163 32.814 10.2306 33.5367 17.5338C34.2593 24.8371 29.333 31.5008 22.1389 32.9513C14.9447 34.4018 7.82115 30.1677 5.6574 23.1549C3.49364 16.1422 6.99301 8.63042 13.7538 5.77518C15.5206 5.02796 17.42 4.64499 19.3383 4.64921ZM19.3383 0.233887C8.97404 0.233887 0.572144 8.63579 0.572144 19.0001C0.572144 29.3643 8.97404 37.7662 19.3383 37.7662C29.7026 37.7662 38.1045 29.3643 38.1045 19.0001C38.1045 8.63579 29.7026 0.233887 19.3383 0.233887Z" fill="#14AE5C" />
            </svg></div>
          <div className="">
            <p className="success-text ">you are successfully registred <span className='font-bold'>registered!</span></p>
          </div>
        </div>
      )}
</div>









       
      </div>
      
    </div>
  );
}


export default Home1;
