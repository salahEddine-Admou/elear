import React, { useState, useEffect } from 'react';
import "../styles/sidebarcourse.css";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FaReadme } from "react-icons/fa6";
import Swal from 'sweetalert2';
const Sidebarcours = ({ modules, TestTitle, onVideoSelect , onVideoSelect2,submoduleBoldStatus ,setState}) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('notes');
  const [selectedSubmodule, setSelectedSubmodule] = useState(null);
  const [openModules, setOpenModules] = useState(new Set());
  const [submoduleDurations, setSubmoduleDurations] = useState({});  
  const [Test, setTest] = useState({
  });  
 
  useEffect(() => {
    if (modules.length > 0) {

      for (const module of modules) {
        if (module.submodules.length > 0 && selectedSubmodule === null) {
          const firstSubmodule = module.submodules[0]; 
          setSelectedSubmodule(firstSubmodule.title); 
          selectContenu(firstSubmodule, module.id);
          setState("sub");
          toggleModule(module.id);
          setActiveTab(firstSubmodule.title)
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
  const toggleTest = () => {
   // onTestSe(lect(Test);
   
    setState("test");
  };



 const selectContenu = (submodule, module) => {
  const st = localStorage.getItem('st');
  if(st === ''){
    setSelectedVideo(submodule);
    onVideoSelect(submodule);
    onVideoSelect2(module);
    setState("sub");
  }else{
    Swal.fire({
      title: 'Attention!',
      text: 'Vous ne pouvez pas quitter cette page pendant que le test est en cours.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
   };


   const checkContentType = (url) => {
    if (!url) {
      console.log("URL is null or undefined, defaulting to 'video'.");
      return 'null';  // Default to 'video' when the URL is not provided.
    }
  
    // Check for data URL and extract MIME type
    if (url.startsWith("data:")) {
      const mimeType = url.substring(5, url.indexOf(';'));
      console.log("MIME Type:", mimeType);
      return mimeType.includes('pdf') ? 'pdf' : 'video';
    }
  
    // Fallback for non-data URLs
    const extension = url.split('.').pop().toLowerCase();
    console.log("File extension:", extension);
    if (extension === 'pdf') {
      return 'pdf';
    } else {
      return 'video';
    }
  };
  const getSubmoduleKey = (moduleId, submoduleId) => `${moduleId}_${submoduleId}`;



//const [submoduleBoldStatus, setSubmoduleBoldStatus] = useState({});

  useEffect(() => {
    
    const fetchDurations = async () => {

      
      const promises = modules.flatMap(module =>
        module.submodules
            .filter(submodule => checkContentType(submodule.contenu) === 'video')
            .map(submodule =>
                fetchDuration(submodule.contenu).then(duration => ({
                    key: `${module.id}_${submodule.id}`,
                    duration
                }))
            )
    );
    

      const results = await Promise.all(promises);
      const newDurations = results.reduce((acc, { key, duration }) => {
          acc[key] = duration;
          return acc;
      }, {});

      setSubmoduleDurations(newDurations);
  };

  if (modules.length > 0) {
      fetchDurations();
  }
 
  }, [ modules]);
  const fetchDuration = (url) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
          resolve(video.duration);
      });
      video.addEventListener('error', (e) => {
          reject(new Error("Error loading video: " + e.message));
      });
  });
};

const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  let result = "";
  if (hrs > 0) {
      result += `${hrs}h `;
  }
  if (mins > 0) { // Only add minutes if more than 0
      result += `${mins}min `;
  }
  if (secs > 0) { // Only add seconds if more than 0
      result += `${secs}sec`;
  }
  return result.trim(); // Trim to remove any trailing space
};

  return (
    <div className="sidebarcours overflow-auto sm:w-3/4 ">
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
  <li key={vIndex} >
    <div className="video-clickable "  onClick={() => selectContenu(submodule, module.id)}>
      <div className="video-clickable " onClick={() => selectContenu(submodule, module.id)}>
                      <div  className={`  p-1 h-9 ${
    activeTab === submodule.title
      ? 'text-white-500 border-l-2 border-orange-500 font-bold'
      : ''
  }`} onClick={() => {
    handleTabChange(submodule.title);
  }}></div>
  {checkContentType(submodule.contenu) === 'pdf' ? (
      // Si le contenu est un PDF
      <FaReadme className={`play-icon mt-4 ${
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
{checkContentType(submodule.contenu) === 'pdf' ? (
  <p>PDF :  <span>{submodule.title}</span></p>  // Assuming you want to label it as "PDF" when it's a PDF
) : (
  <>
  <p>Video :  <span>{submodule.title}</span></p>
  <small className='text-zinc-400'>{submoduleDurations[`${module.id}_${submodule.id}`] ? formatDuration(submoduleDurations[`${module.id}_${submodule.id}`]) : '0min 0sec'}</small>
  </>
)}

  
  
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
      <div className="module-container font-bold" onClick={() => toggleTest()}>
      {TestTitle}
        </div>
    </div>
  );
};
export default Sidebarcours;


 