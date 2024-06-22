import React, {useState, useEffect} from 'react';
import ModuleInput from '../components/ModuleInput';
import FileUploadArea from '../components/FileUploadarea'; 
import NavBar from '../components/Navbar';
import axios from 'axios';
import { getModulesAdmin } from '../services/UsersService';
import TestFinalInput from '../components/TestFinalsInput';
const AjoutFormation = () => {
  const [modules, setModules] = useState([]);
  const [selectedSubmodule, setSelectedSubmodule] = useState(null);
  const [fileUploads, setFileUploads] = useState({}); // State to track file uploads
  const [stateA, setStateA] = useState("sub");
  const setStateAdmin = (newState) => {
    setStateA(newState);
          }
  const handleSubmoduleSelect = (moduleId, index, s) => {
    const module = modules.find(m => m.id === moduleId);
    setStateA(s);
    // First, check if the module exists
    if (!module) {
        console.error('No module found with id:', moduleId);
        setSelectedSubmodule({ moduleId, index, name: null });
        return;  // Exit the function if no module is found
    }

    // Use optional chaining to check if submodules exist and the specific index is valid
    const submodule = module.submodules?.[index];
    if (!submodule) {
        console.error('No submodule found at index:', index);
        setSelectedSubmodule({ moduleId, index, name: null });
        return;  // Exit the function if no submodule is found at the specified index
    }

    // Set the selected submodule if everything is valid
    setSelectedSubmodule({ moduleId, index, name: submodule });
};




  const handleSubmoduleNameChange = (moduleId, index, newName, newContenu) => {
    const updatedModules = modules.map(module => {
        if (module.id === moduleId) {
            const updatedSubmodules = module.submodules.map((submodule, idx) => {
                if (idx === index) {
                    // Update both title and contenu for the submodule at the specified index
                    return { ...submodule, title: newName, contenu: newContenu };
                }
                return submodule;
            });
            // Return the updated module with the newly modified submodules array
            return { ...module, submodules: updatedSubmodules };
        }
        return module;
    });

    setModules(updatedModules);  // Update the main modules state
    // Update the selected submodule with the whole submodule object
    const updatedSubmodule = updatedModules.find(m => m.id === moduleId).submodules[index];
    setSelectedSubmodule({ moduleId, index, name: updatedSubmodule });
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
  console.log(selectedSubmodule)
  return (
    <>
      <NavBar />
      <div className="flex mt-16 h-full overflow-auto">
        <ModuleInput
          modules={modules}
          setModules={setModules}
          onSubmoduleSelect={handleSubmoduleSelect}
          setStateAdmin={setStateAdmin}
        />
        {stateA === "sub" ? (
        selectedSubmodule && (
          <FileUploadArea
            moduleId={selectedSubmodule.moduleId}
            submoduleIndex={selectedSubmodule.index}
            submodule={selectedSubmodule.name}
            onSubmoduleNameChange={handleSubmoduleNameChange}
            onFileUpload={handleFileUpload}
            fileUploads={fileUploads[selectedSubmodule.moduleId]?.[selectedSubmodule.index] || {}}
          />
        )
      ) : (
        <TestFinalInput
        />
      )}
    </div>
  </>
);
};
export default AjoutFormation;
