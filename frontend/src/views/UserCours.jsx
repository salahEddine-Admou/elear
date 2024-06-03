import React, {useState, useEffect} from 'react';
import Side1 from '../components/sidebarcours';
import Parcourir from '../views/ParcourirModules';
import Navbar from '../components/Navbar'; 
import { getModules ,changeState, getState} from '../services/UsersService';
const UserCours = () => {
  const [submoduleDurations, setSubmoduleDurations] = useState({}); 
    const [modules, setModules] = useState([]);
    const [selectedContenu2, setSelectedContenu2] = useState(null);
    const [selectedContenu, setSelectedContenu] = useState(null);
    const [submoduleBoldStatus, setSubmoduleBoldStatus] = useState({});
    const getSubmoduleKey = (moduleId, submoduleId) => `${moduleId}_${submoduleId}`;
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
    return (
        <div> 
          <Navbar />
    <div className="course-container">
    < Side1
       modules={modules} onVideoSelect={handleContenuSelect} onVideoSelect2={handleModuleSelect} submoduleBoldStatus={submoduleBoldStatus} />
       < Parcourir
       onVideoSesetBoldStatuslect={handleSubSelect} selectedContenu={selectedContenu}  selectedContenu2={selectedContenu2} handleClick={handleClick}/>
       </div>
       </div>
    )

}
export default UserCours;
