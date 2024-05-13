import React, { useState, useEffect } from 'react';
import "../styles/sidebarcourse.css";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FaReadme } from "react-icons/fa6";
import { getState} from '../services/UsersService';


const Sidebarcours = ({ modules, onVideoSelect , onVideoSelect2}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('notes');
  const [selectedSubmodule, setSelectedSubmodule] = useState(null);
  const [openModules, setOpenModules] = useState(new Set());

  useEffect(() => {
    if (modules.length > 0) {
      for (const module of modules) {
        if (module.submodules.length > 0 && selectedSubmodule === null) {
          const firstSubmodule = module.submodules[0]; 
          setSelectedSubmodule(firstSubmodule.title); 
          selectContenu(firstSubmodule, module.id);
          toggleModule(module.id);
          break; 
        }
      }
    }
  }, [modules, selectedSubmodule]); 
  
   const handleTabChange = (tab) =>{
    setActiveTab(tab);
  }
  const toggleModule = (moduleId) => {
    setOpenModules(prevOpenModules => {
      const newOpenModules = new Set(prevOpenModules);
      if (newOpenModules.has(moduleId)) {
        newOpenModules.delete(moduleId); 
      } else {
        newOpenModules.add(moduleId); 
      }
      return newOpenModules;
    });
  };
 const selectContenu = (submodule, module) => {
    setSelectedVideo(submodule);
    onVideoSelect(submodule);
    onVideoSelect2(module);
   };
   const checkContentType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    console.log(extension)
    const parties = extension.split("/");
const dernierElement = parties[parties.length - 1];
const mot_pdf = dernierElement.split("?")[0];
console.log(mot_pdf)
    if (mot_pdf === 'pdf') {
      return 'pdf';
    } else {
      return 'video';
    }
  }
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
};

const [submoduleBoldStatus, setSubmoduleBoldStatus] = useState({});

  useEffect(() => {
    initializeSubmoduleBoldStatus();
  }, [ modules]);
  return (
    <div className="sidebarcours">
      <ul>
        {modules.map((module, index) => (
          <li key={index}>
            <div className="module-container font-bold" onClick={() => toggleModule(module.id)}>
              {module.name}
             
              {openModules.has(module.id) ? (
                <TiArrowSortedUp className="arrow-icon" />
              ) : (
                <TiArrowSortedDown className="arrow-icon" />
              )}
            </div>
            {openModules.has(module.id) && (
              <ul>
 {module.submodules && module.submodules.map((submodule, vIndex) => (
  <li key={vIndex}>
    <div className="video-clickable " >
      <div className="video-clickable " onClick={() => selectContenu(submodule, module.id)}>
                      <div  className={`  p-1 h-7 ${
    activeTab === submodule.title
      ? 'text-white-500 border-l-2 border-orange-500 font-bold'
      : ''
  }`} onClick={() => {
    handleTabChange(submodule.title);
  }}></div>
  {checkContentType(submodule.contenu) === 'pdf' ? (
      // Si le contenu est un PDF
      <FaReadme className={`play-icon ${
        submoduleBoldStatus[getSubmoduleKey(module.id, submodule.id)] ? 'video-title text-gray-400 font-bold' : ''}`} />
    ) : (
      // Si le contenu est une vidéo
      <BsFillPlayCircleFill  className={`play-icon ${
        submoduleBoldStatus[getSubmoduleKey(module.id, submodule.id)] ? 'video-title text-gray-400 font-bold' : ''}`}/>
    )}
                      <span
  className={`video-title font-bold${
    submoduleBoldStatus[getSubmoduleKey(module.id, submodule.id)] ? 'video-title text-zinc-400 font-bold' : ''
  }`}
  onClick={() => {
    handleTabChange(submodule.title);
  }}
>
  {submodule.title}
</span>
                    </div>
    </div>
  </li>
))}

              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebarcours;
