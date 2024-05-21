import React, { useState, useEffect } from 'react';
import "../App.css";
import { getFormationsCurrent, getFormationsFinish } from '../services/UsersService';
import { useNavigate } from "react-router-dom"; // Importez useNavigate

const Training = () => {
    const [currentTrainings, setCurrentTrainings] = useState([]);
    const [finishedTrainings, setFinishedTrainings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAllCurrent, setShowAllCurrent] = useState(false);
    const [showAllFinish, setShowAllFinish] = useState(false);
    const navigate = useNavigate(); // Utilisez le hook useNavigate
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
          try {
            const fetchedCurrent = await getFormationsCurrent();
        const formations = fetchedCurrent.map(course => ({
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
            setCurrentTrainings(formations || []);
            const fetchedFinish = await getFormationsFinish();
            const formations1 = fetchedFinish.map(course => ({
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
              setFinishedTrainings(formations1 || []);
          } catch (err) {
            console.error("Error fetching courses:", err);
            setError('Failed to fetch courses');
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const visibleTrainings = showAllCurrent ? currentTrainings : currentTrainings.slice(0, 3);
    const visibleTrainingsF = showAllFinish ? finishedTrainings : finishedTrainings.slice(0, 3);
    const handleClick = (trainingId)=> {
        // Stocker l'ID dans le stockage local
        localStorage.setItem('selectedTrainingId', trainingId);
        
        // Rediriger vers une nouvelle page
        navigate('/modules');
    };
    const handleClick2 = ()=> {
        // Stocker l'ID dans le stockage local
       
        
        // Rediriger vers une nouvelle page
        navigate('/Home/Certificats');
    };
    return (
        <div className="bg-gray-200 overflow-hidden">
            <div>
                <div className="bg-white p-4 sm:p-6 mx-2 sm:mx-6 mt-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">Current Trainings</h2>
                    <div className="flex flex-wrap -mx-2">
                        {visibleTrainings.map((training, i) => (
                            <div key={i} className="p-4 w-full sm:w-1/2 lg:w-1/3">
                                <div className="shadow-lg">
                                    <img src={training.photo} alt="Training" className="w-full object-cover h-48" loading="lazy" />
                                    <div className="p-3">
                                        <h3 className="text-md lg:text-xl font-bold">{training.title}</h3>
                                        <p className="font-semibold text-sm lg:text-md">{training.domaine}</p>
                                        <span className='text-sm lg:text-md text-gray-500'>{training.progress}%</span>
                                        <div className='w-full bg-gray-200 h-2 mt-1.5'>
                                            <div className='bg-orange-500 h-2' style={{ width: `${training.progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-start mt-3">
                                            <button className="bg-orange-500 text-black px-3 py-1.5 text-xs lg:text-sm font-bold" onClick={() => handleClick(training.id)}>Access</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {currentTrainings.length > 3 && (
                        <div className="flex justify-center mt-4">
                            <button onClick={() => setShowAllCurrent(!showAllCurrent)} className="bg-orange-500 text-white px-4 py-2 text-sm lg:text-md font-bold">
                                {showAllCurrent ? 'Show Less' : 'Show All'}
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-white p-4 sm:p-6 mx-2 sm:mx-6 mt-8 mb-8">
                    <h2 className="text-lg sm:text-xl font-bold mb-4">Finished Trainings</h2>
                    <div className="flex flex-wrap -mx-2">
                        {visibleTrainingsF.map((training, i) => (
                            <div key={i} className="p-4 w-full sm:w-1/2 lg:w-1/3">
                                <a href="#" className="inline-block w-full h-full bg-white border overflow-hidden">
                                    <div className="shadow-lg">
                                        <img src={training.photo} alt="Training" className="w-full object-cover h-48" loading="lazy" />
                                        <div className="p-3 flex flex-col">
                                            <h3 className="text-md lg:text-xl font-bold">{training.title}</h3>
                                            <p className="font-semibold text-sm lg:text-md text-gray-500">{training.domaine}</p>
                                            <div className="mt-1.5">
                                                <button className="bg-orange-500 text-black text-xs lg:text-sm font-bold w-20 py-1" onClick={() => handleClick2()}>Access</button>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                    {finishedTrainings.length > 3 && (
                        <div className="flex justify-center mt-4">
                            <button onClick={() => setShowAllFinish(!showAllFinish)} className="bg-orange-500 text-white px-4 py-2 text-sm lg:text-md font-bold">
                                {showAllFinish ? 'Show Less' : 'Show All'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Training;
