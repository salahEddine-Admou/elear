import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiEditLine } from 'react-icons/ri';

const ModuleInput = ({ modules, setModules, onSubmoduleSelect }) => {
  const [newModuleName, setNewModuleName] = useState('');
  const [submoduleInputs, setSubmoduleInputs] = useState({});
  const [editableModuleId, setEditableModuleId] = useState(null);

  const handleModuleNameChange = (e, moduleId) => {
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

  const handleDeleteSubmodule = (moduleId, index) => {
    const module = modules.find(m => m.id === moduleId);
    const updatedSubmodules = [...module.submodules];
    updatedSubmodules.splice(index, 1);
    setModules(modules.map(mod => mod.id === moduleId ? { ...mod, submodules: updatedSubmodules } : mod));
  };

  const handleEditModuleName = (moduleId) => {
    setEditableModuleId(moduleId);
  };

  const handleSaveModuleName = (moduleId) => {
    setEditableModuleId(null);
  };

  const handleEditSubmoduleName = (moduleId, index) => {
    const newName = prompt('Enter new submodule name', modules.find(mod => mod.id === moduleId).submodules[index]);
    if (newName) {
      const updatedModules = modules.map(module => {
        if (module.id === moduleId) {
          const updatedSubmodules = [...module.submodules];
          updatedSubmodules[index] = newName;
          return { ...module, submodules: updatedSubmodules };
        }
        return module;
      });
      setModules(updatedModules);
    }
  };

  const handleDeleteModule = (moduleId) => {
    setModules(modules.filter(mod => mod.id !== moduleId));
  };

  return (
    <div className="w-64 h-full bg-white-100 p-4 border-r">
      {modules.map((module) => (
        <div key={module.id} className="mb-4">
          <div className="font-bold relative">
            {editableModuleId === module.id ? (
              <input
                type="text"
                value={module.name}
                onChange={(e) => handleModuleNameChange(e, module.id)}
                onBlur={() => handleSaveModuleName(module.id)}
                autoFocus
                className="w-full border border-gray-300 bg-white-200 px-4 py-2 mt-2"
              />
            ) : (
              <div className="flex items-center border border-gray-300 px-4 py-2 mt-2">
                <div>{module.name}</div>
                <RiEditLine
                  className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => handleEditModuleName(module.id)}
                />
                <IoMdClose
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => handleDeleteModule(module.id)}
                />
              </div>
            )}
          </div>
          {module.submodules.map((submodule, index) => (
            <div key={index} className="flex items-center mt-2 relative">
              <div className="w-full items-center border border-gray-300 bg-gray-200 px-4 py-2"
                   onClick={() => onSubmoduleSelect(module.id, index)}>
                {submodule}
                <RiEditLine
                  className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => handleEditSubmoduleName(module.id, index)}
                />
                <IoMdClose
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => handleDeleteSubmodule(module.id, index)}
                />
              </div>
            </div>
          ))}
          <input
            type="text"
            value={submoduleInputs[module.id] || ''}
            onChange={(e) => handleSubmoduleInputChange(e, module.id)}
            onKeyPress={(e) => handleSubmoduleKeyPress(e, module.id)}
            placeholder="Add submodule..."
            className="w-full border border-gray-300 bg-grey-200 rounded px-4 py-2 mt-2"
          />
        </div>
      ))}
      <div className="mb-4 border-t pt-4">
        <input
          type="text"
          value={newModuleName}
          onChange={(e) => setNewModuleName(e.target.value)}
          onKeyPress={handleModuleKeyPress}
          placeholder="Add module..."
          className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
        />
      </div>
    </div>
  );
};

export default ModuleInput;
