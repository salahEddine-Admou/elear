import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiEditLine } from 'react-icons/ri';
import { addModule, addSubmodule, deleteModule, deleteSubmodule, updateModule } from '../services/UsersService';

const ModuleInput = ({ modules, setModules, onSubmoduleSelect }) => {
 modules.forEach(module => {
  module.submodules.forEach(module1 => {
      console.log('Submodules for module:',module1.title);
    })
    });
  const [newModuleName, setNewModuleName] = useState('');
  const [submoduleInputs, setSubmoduleInputs] = useState({});
  const [editableModuleId, setEditableModuleId] = useState(null);
  const [module, setModule] = useState({ name: '' });
  const [module2, setModule2] = useState({ name2: '' });
  const [submodule, setSubmodule] = useState({ title: ''
   });
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent the default action of the enter key
       handleChange(e);  // Await the handleChange function to finish
      try {
        // Wait until the state is updated before making an API call
        await new Promise(resolve => setTimeout(resolve, 0));  // A trick to wait for the state to update
        const response = await addModule(module);
        if (response.status === 'success') {
          console.log('Module added successfully');
          // Reload the window or redirect as needed
          window.location.reload();  // Consider using React Router for navigation instead
        } else {
          console.error('Failed to add module:', response.message);
        }
      } catch (error) {
        console.error("Error adding module:", error);
      }
    }
  };
  const handleKeyPressModify = async (e, id) => {
    
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent the default action of the enter key
    //  handleChange2(e);  // Await the handleChange function to finish
       try {
        // Wait until the state is updated before making an API call
        await new Promise(resolve => setTimeout(resolve, 0));
       // console.log(submodule)  // A trick to wait for the state to update
     console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii yamina")
        const response = await updateModule(id, module);
        if (response.status === 'success') {
      
           window.location.reload();
       
        } 
      } catch (error) {
        console.error("Error modify module:", error);
      }
    }
  };
 const handleKeyPress1 = async (e, id) => {
  if (e.key === 'Enter') {
    e.preventDefault();  // Prevent the default action of the enter key
     handleChange1(e, id);  // Await the handleChange function to finish
     try {
      // Wait until the state is updated before making an API call
      await new Promise(resolve => setTimeout(resolve, 0));
      console.log(submodule)  // A trick to wait for the state to update
      const response = await addSubmodule(submodule, id);
      if (response.status === 'success') {
        console.log('Submodule added successfully');
        // Reload the window or redirect as needed
        window.location.reload();  // Consider using React Router for navigation instead
      } else {
        console.error('Failed to add module:', response.message);
      }
    } catch (error) {
      console.error("Error adding module:", error);
    }
  }
};

const handleChange1 = async (e, id) => {
  const { value } = e.target;  // Grab value from the event's target
  // Update the submodule title in your state
  setSubmodule(prev => ({ ...prev, title: value }));

};
  const handleChange = async (e) => {
    const { name, value } = e.target;

    // Correctly set the updated module
    setModule(prev => ({ ...prev, [name]: value }));

  
  };
  const handleChange2 = async (e) => {
    const { name, value } = e.target;

    // Correctly set the updated module using inputName instead of name
    setModule(prev => ({ ...prev, [name]: value }));
console.log(module2)
  
  };
  
  const handleModuleNameChange = (e, moduleId) => {
    const { name, value } = e.target;
    setModule(prev => ({ ...prev, [name]: value }));
    const newName = e.target.value;
    
    setModules(modules.map(mod => mod.id === moduleId ? { ...mod, name: newName } : mod));
  };

  const handleSubmoduleInputChange = (e, moduleId) => {
    const { value } = e.target;
    setSubmoduleInputs({
      ...submoduleInputs,
      [moduleId]: value
    });
  };

  const handleModuleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (newModuleName.trim() === '') {
        alert('Module name cannot be empty.');
        return;
      }

      if (modules.some(module => module.name.toLowerCase() === newModuleName.toLowerCase())) {
        alert('Module name must be unique.');
        return;
      }

      const newModuleId = Date.now();
      setModules((prevModules) => [
        ...prevModules,
        {
          id: newModuleId,
          name: newModuleName,
          submodules: [],
        },
      ]);
      setSubmoduleInputs({
        ...submoduleInputs,
        [newModuleId]: ''
      });
      setNewModuleName('');
    }
  };

  const handleSubmoduleKeyPress = (e, moduleId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newSubmodule = submoduleInputs[moduleId].trim();
      if (!newSubmodule) {
        alert('Submodule name cannot be empty.');
        return;
      }

      const module = modules.find(m => m.id === moduleId);
      if (module.submodules.includes(newSubmodule)) {
        alert('Submodule name must be unique within the module.');
        return;
      }

      const updatedSubmodules = [...module.submodules, newSubmodule];
      setModules(modules.map(mod => mod.id === moduleId ? { ...mod, submodules: updatedSubmodules } : mod));
      setSubmoduleInputs({
        ...submoduleInputs,
        [moduleId]: ''
      });
    }
  };



  const handleEditModuleName = (moduleId) => {
    setEditableModuleId(moduleId);
  };

 

  const handleEditSubmoduleName = (moduleId, index) => {
    const newName = prompt('Enter new submodule name', modules.find(mod => mod.id === moduleId).submodules[index].title);
    if (newName) {
      const updatedModules = modules.map(module => {
        if (module.id === moduleId) {
          const updatedSubmodules = [...module.submodules];
          updatedSubmodules[index].title = newName;
          return { ...module, submodules: updatedSubmodules };
        }
        return module;
      });
      setModules(updatedModules);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    const response = await deleteModule(moduleId);
    if (response.status === 'success') {
      window.location.reload();
    } else {
      console.error('Deletion failed');
    }
  };
  const handleDeleteSubModule = async (subId, moduleid) => {
    const response = await deleteSubmodule(subId,moduleid);
    if (response.status === 'success') {
      window.location.reload();
    } else {
      console.error('Deletion failed');
    }
  };

  return (
    <div className="w-64 h-full bg-white-100 p-4 border-r">
      {modules.map((module) => (
        <div key={module.id} className="mb-4">
          <div className="font-bold relative">
            {editableModuleId === module.id ? (
              <input
              name="name"
                type="text"
                value={module.name}
                onChange={(e) => handleModuleNameChange(e, module.id)}
             // onBlur={() => handleSaveModuleName(module.id)}
               onKeyPress={(e) => handleKeyPressModify(e, module.id, module.name)}
                autoFocus
                className="w-full border border-gray-300 bg-white-200 px-4 py-2 mt-2"
              />
            ) : (
              <div className="flex items-center border border-gray-300 px-4 py-2 mt-2">
                <div >{module.name}</div>
                <RiEditLine
                  className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => handleEditModuleName(module.id)}
                  
                />
                <IoMdClose
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default button click behavior
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce Module ?')) {
                        handleDeleteModule(module.id);
                    }
                }}
                />
              </div>
            )}
          </div>
          {module.submodules.map((submodule, index) => (
            <div key={index} className="flex items-center mt-2 relative">
              <div className="w-full items-center border border-gray-300 bg-gray-200 px-4 py-2"
                   onClick={() => onSubmoduleSelect(module.id, index)}>
                {submodule.title}
                <RiEditLine
                  className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => handleEditSubmoduleName(module.id, index)}
                />
                <IoMdClose
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default button click behavior
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce SubModule ?')) {
                        handleDeleteSubModule(submodule.id,module.id);
                    }
                }}
                />
              </div>
            </div>
          ))}
          <input
            type="text"
            value={submodule.id}
           onChange={(e) => handleChange1(e, module.id)}
  onKeyPress={(e) => handleKeyPress1(e, module.id)}
            placeholder="Add submodule..."
            className="w-full border border-gray-300 bg-grey-200 rounded px-4 py-2 mt-2"
          />
        </div>
      ))}
      <div className="mb-4 border-t pt-4">
        <input
          type="text"
          name="name"
      value={module.name}
      onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder=" Add module..."
          className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
        />
      </div>
    </div>
  );
};

export default ModuleInput;

                  
               
   
  