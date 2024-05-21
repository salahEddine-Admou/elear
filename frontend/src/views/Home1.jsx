import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; // Importez useNavigate
import img from '../images/img.png';
import { getFormationsCurrent, getFormationsMore} from '../services/UsersService';



const Home1 = () => {
  const [courses, setCourses] = useState([]);
  const [coursesM, setCoursesM] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAllCurrent, setShowAllCurrent] = useState(false);
  const [showAllMore, setShowAllMore] = useState(false);
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
  
  

    const handleClick = (trainingId)=> {
        // Stocker l'ID dans le stockage local
        localStorage.setItem('selectedTrainingId', trainingId);
        
        // Rediriger vers une nouvelle page
        navigate('/modules');
    };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const visibleTrainings = showAllCurrent ? courses : courses.slice(0, 3);
  const visibleTrainings2= showAllMore ? coursesM : coursesM.slice(0, 3);
  return (
    <div className='px-4 md:px-12'>
      <h1 className='font-bold text-xl md:text-3xl mt-12'>Welcome again <span className='text-orange-500'>Aymane Helfa!</span></h1>
      <div className='mt-12 '>
        <div className='flex flex-row space-x-3 mb-8 '><div className='text-xl font-bold w-56 '>Continue Studying</div>
        <div className='bg-gray-300 h-0.5 m-4 w-full'></div></div>

        
        <div className='flex flex-col '>
                    <div className="flex flex-col md:flex-col space-y-4  ">
                    {visibleTrainings.map((training, i) => (
                      <div className=''>
                            <div key={i} className="  w-1/3">
                                
                                    <div className=" flex flex-row w-full  ">
                                        <img src={training.photo} alt="Training" className="w-full" loading="lazy" />
                                        <div className="p-3.5 w-full ">
                                            <h3 className="text-xl font-bold">{training.title}</h3>
                                            <p className="font-semibold mt-1.5 text-sm">{training.domaine}</p>
                                            <span className='font-semibold text-sm text-gray-500'>{training.progress}%</span>
                                            
                                            <div className='w-full bg-gray-200 h-2 mt-1.5  '>
                                              <div className='bg-orange-500 h-2 ' style={{ width: `${training.progress}%` }}></div>
                                            </div>
                                            <div className="flex justify-start mt-3">
                                                <button className="bg-orange-500 text-black px-3 py-1.5 text-xs font-bold" onClick={() => handleClick(training.id)}>Continue</button>
                                            </div>
                                        </div>
                                    </div>
                                
                            </div>
                            </div>
                        ))}
                       
                    </div>
                    {courses.length > 3 && (
                        <div className="flex justify-center mt-4">
                            <button onClick={() => setShowAllCurrent(!showAllCurrent)} className="bg-orange-500 text-white px-4 py-2 text-sm font-bold">
                                {showAllCurrent ? 'Show Less' : 'Show All'}
                            </button>
                        </div>
                        
                    )}
                    </div>










       
      </div>
      <div className='mt-10'>
      <div className='flex flex-row '>
        <div className='text-xl font-bold w-56  mb-4'>More courses</div>
        <div className='bg-gray-300 h-0.5 m-4 w-full px-20'></div></div>
        <div className='flex flex-col md:flex-row  md:space-y-0 md:space-x-8 mt-4 mb-8'>
       


        <div className='flex flex-col '>
        <div className="flex flex-wrap -mx-2">
    {visibleTrainings2.map((training, i) => (
        <div key={i} className="p-4 w-full sm:w-1/2 lg:w-3/4">
        <a href="#" className="inline-block w-full h-full bg-white border overflow-hidden">
            <div className="shadow-lg">
                <img src={training.photo} alt="Training" className="w-full object-cover h-48" loading="lazy" />
                <div className="p-3 flex flex-col">
                    <h3 className="text-md lg:text-xl font-bold">{training.title}</h3>
                    <p className="font-semibold text-sm lg:text-md text-gray-500">{training.domaine}</p>
                    <div className="mt-1.5">
                        <button className="bg-orange-500 text-black text-xs lg:text-sm font-bold w-20 py-1">Access</button>
                    </div>
                </div>
            </div>
        </a>
    </div>
    ))}
</div>

                    {coursesM.length > 3 && (
                        <div className="flex justify-center mt-4">
                            <button onClick={() => setShowAllMore(!showAllMore)} className="bg-orange-500 text-white px-4 py-2 text-sm font-bold ">
                                {showAllMore ? 'Show Less' : 'Show All'}
                            </button>
                        </div>
                        
                    )}
                    </div>










         
        </div>
      </div>
    </div>
  );
}


export default Home1;
