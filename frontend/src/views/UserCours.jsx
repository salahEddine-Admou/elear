import React, {useState, useEffect} from 'react';
import Side1 from '../components/sidebarcours';
import Parcourir from '../views/ParcourirModules';
import Navbar from '../components/Navbar'; 
import TestFinal from '../views/TestFinal';
import { getModules ,changeState, getState, getTest} from '../services/UsersService';
const UserCours = () => {
  const [submoduleDurations, setSubmoduleDurations] = useState({}); 
    const [modules, setModules] = useState([]);
    const [Questions, setQuestions] = useState({});
    const [Test, setTest] = useState({});
    const [selectedContenu2, setSelectedContenu2] = useState(null);
    const [selectedContenu, setSelectedContenu] = useState(null);
    const [submoduleBoldStatus, setSubmoduleBoldStatus] = useState({});
    const getSubmoduleKey = (moduleId, submoduleId) => `${moduleId}_${submoduleId}`;
    const [Statee, setStatee] = useState("sub");
    const [Titlee, setTitlee] = useState("sub");
    const [Timer, setTimer] = useState(0);
    const [allSubmodulesComplete, setAllSubmodulesComplete] = useState(false);
    useEffect(() => {
      const fetchQuestions = async () => {
          try {
              const response = await getTest();
              console.log(response);
              setQuestions(response)
              setTitlee(response.title); 
          } catch (error) {
              console.error('Failed to fetch questions', error);
          }
      };

      fetchQuestions();
  }, []);
    const initializeSubmoduleBoldStatus = async () => {
        const status = {};
      
        for (const module of modules) {
          for (const submodule of module.submodules || []) {
            const isBold = await getState(module.id, submodule.id);
            const key = getSubmoduleKey(module.id, submodule.id);
            status[key] = isBold;  
          }
        }
      
        setSubmoduleBoldStatus(status);
        console.log("hellooocomment"+submoduleBoldStatus)
      };
    useEffect(() => {
  
        initializeSubmoduleBoldStatus();
      }, [ modules]);
    const handleSubSelect = (trainingId, subId) => {
        const key = `${trainingId}_${subId}`;
       setSubmoduleBoldStatus(prev => ({ ...prev, [key]: true }));
      };
    const handleModuleSelect = (contenu2) => {
        setSelectedContenu2(contenu2);
      };
      const handleContenuSelect = (contenu) => {
        setSelectedContenu(contenu);
      };
      
      const setState = (newState) => {
setStatee(newState);
      }
      console.log(Statee);
    useEffect(() => {
    
        const fetchData2 = async () => {
          try { 
            const modules1 = await getModules(); // Supposons que getFormationsMore() soit une fonction qui récupère les données des modules depuis l'API
            setModules(modules1 || []);
          } catch (err) {
            console.error("Une erreur s'est produite lors de la récupération des modules :", err);
            
          } 
        };
    
        fetchData2(); 
      }, []); 
      useEffect(() => {
    
        const fetchData2 = async () => {
          try { 
            const Test = await getTest(); // Supposons que getFormationsMore() soit une fonction qui récupère les données des modules depuis l'API
            setTest(Test || []);
          } catch (err) {
            console.error("Une erreur s'est produite lors de la récupération des modules :", err);
            
          } 
        };
    
        fetchData2(); 
      }, []); 
      const handleClick = async (trainingId)=> {
        const fetch = await changeState(trainingId, selectedContenu2);
        console.log("hellooo yamina state"+fetch)
        if (fetch) { // Assuming changeState returns true/false based on success
            const key = `${selectedContenu2}_${trainingId}`;
            console.log("hellooo yamina state"+selectedContenu2.id)  
          setSubmoduleBoldStatus(prev => ({ ...prev, [key]: true }));
        }
        };
        console.log("hhhsdyfkugfjekjrlg"+modules)
        console.log("yamina"+Statee)
        useEffect(() => {
          const allComplete = Object.values(submoduleBoldStatus).every(status => status === true);
          setAllSubmodulesComplete(allComplete);
          if (allComplete) {
            console.log("All submodule statuses are set to true.");
          }
        }, [submoduleBoldStatus]);
        useEffect(() => {
          const fetchInitialTimer = async () => {
              try {
                  const response = await getTest();
                  setTimer(response.timeLimit);
                   console.log(response.timeLimit)
              } catch (error) {
                  console.error('Failed to fetch initial timer', error);
              }
          };
          fetchInitialTimer();
      }, []);
    return (
        <div> 
          <Navbar />
    <div className="course-container">
    < Side1
       modules={modules} TestTitle={Titlee} onVideoSelect={handleContenuSelect} onVideoSelect2={handleModuleSelect} submoduleBoldStatus={submoduleBoldStatus} setState={setState}/>
       {Statee === "sub" ? (
  <Parcourir
    onVideoSelect={handleSubSelect}
    selectedContenu={selectedContenu}
    selectedContenu2={selectedContenu2}
    handleClick={handleClick}
    Test={Test}
  />
) : (
  <TestFinal allSubmodulesComplete={allSubmodulesComplete}  Timer={Timer}/>
)};
       </div>
       </div>
    )

}
export default UserCours;
