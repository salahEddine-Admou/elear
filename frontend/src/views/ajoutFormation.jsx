import React, {useState, useEffect} from 'react';
import ModuleInput from '../components/ModuleInput';
import FileUploadArea from '../components/FileUploadarea'; 
import NavBar from '../components/Navbar';
import axios from 'axios';
import { getModulesAdmin } from '../services/UsersService';
const AjoutFormation = () => {
  const [modules, setModules] = useState([]);
  const [selectedSubmodule, setSelectedSubmodule] = useState(null);
  const [fileUploads, setFileUploads] = useState({}); // State to track file uploads

  const handleSubmoduleSelect = (moduleId, index) => {
    const module = modules.find(m => m.id === moduleId);
    const submodule = module.submodules[index];
    setSelectedSubmodule({ moduleId, index, name: submodule });
  };

  const handleSubmoduleNameChange = (moduleId, index, newName) => {
    const updatedModules = modules.map(module => {
      if (module.id === moduleId) {
        const updatedSubmodules = [...module.submodules];
        updatedSubmodules[index] = newName;
        return { ...module, submodules: updatedSubmodules };
      }
      return module;
    });
    setModules(updatedModules);
    setSelectedSubmodule(prev => ({ ...prev, name: newName }));
  };

  const handleFileUpload = (moduleId, index, fileType, fileUrl) => {
    const updatedFileUploads = { ...fileUploads };
    if (!updatedFileUploads[moduleId]) {
      updatedFileUploads[moduleId] = {};
    }
    if (!updatedFileUploads[moduleId][index]) {
      updatedFileUploads[moduleId][index] = {};
    }
    updatedFileUploads[moduleId][index][fileType] = fileUrl;
    setFileUploads(updatedFileUploads);
  };
  useEffect(() => {
    
    const fetchData2 = async () => {
      try { 
        const modules1 = await getModulesAdmin(); // Supposons que getFormationsMore() soit une fonction qui récupère les données des modules depuis l'API
        setModules(modules1 || []);
        console.log("hiiii"+modules1);
      } catch (err) {
        console.error("Une erreur s'est produite lors de la récupération des modules :", err);
        
      } 
    };

    fetchData2(); 
  }, []); 
  return (
    <>
      <NavBar />
      <div className="flex my-16">
        <ModuleInput
          modules={modules}
          setModules={setModules}
          onSubmoduleSelect={handleSubmoduleSelect}
        />
        {selectedSubmodule && (
          <FileUploadArea
            moduleId={selectedSubmodule.moduleId}
            submoduleIndex={selectedSubmodule.index}
            submodule={selectedSubmodule.name}
            onSubmoduleNameChange={handleSubmoduleNameChange}
            onFileUpload={handleFileUpload}
            fileUploads={fileUploads[selectedSubmodule.moduleId]?.[selectedSubmodule.index] || {}}
          />
        )}
      </div>
    </>
  );
};

export default AjoutFormation;
