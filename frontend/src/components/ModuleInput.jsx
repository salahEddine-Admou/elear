import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiEditLine } from 'react-icons/ri';
import { addModule, addSubmodule, deleteModule, deleteSubmodule, updateModule, addTestFinal, getTestName } from '../services/UsersService';
import CustomAlert from '../components/CustomAlert '
import Swal from 'sweetalert2';
import '../styles/Popp.css'
import TestInput from './TestInput';


const ModuleInput = ({ modules, setModules, onSubmoduleSelect, setStateAdmin }) => {
 modules.forEach(module => {
  module.submodules.forEach(module1 => {
    // console.log('Submodules for module:',module1.title);
   })
    });
    const [isFocused, setIsFocused] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentName, setCurrentName] = useState("");   
  const [editableModuleId, setEditableModuleId] = useState(null);
  const [module, setModule] = useState({ name: '' });
  const [module2, setModule2] = useState({ name: '' });
  const [testFinal, setTestFinal] = useState({ name: '' });
  const [testFinals, setTestFinals] = useState([]);

  const [submodule, setSubmodule] = useState({ 
    id:'',
    title: ''
   });
   const [showAllMore, setShowAllMore] = useState(false);
   const [initialSelectDone, setInitialSelectDone] = useState(false);
   const [alertOpen, setAlertOpen] = useState(false);
   const [alertMessage, setAlertMessage] = useState('');
   const [message, setMessage] = useState('');
   const handleFocus = () => {
    setIsFocused(true);
    setEditableModuleId(null);
  };
  const handleChange1 = async (e, id) => {
    const { value } = e.target;  
    setModuleEdits(prev => ({
      ...prev,
      [id]: value 
      
    }));
  setMessage(value)
  };
   useEffect(() => {
       if (!initialSelectDone && typeof onSubmoduleSelect === 'function' && modules.length > 0 && modules[0].submodules.length > 0) {
           onSubmoduleSelect(modules[0].id, 0, 'sub');
           setInitialSelectDone(true); 
       }
   }, [modules, onSubmoduleSelect, initialSelectDone]);

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      const trimmedValue = module2.name.trim();
      if (trimmedValue === '') {
        console.error('The module name cannot be empty.');
        Swal.fire({
          title: 'Invalid Input',
          text: 'The module name cannot be empty.',
          icon: 'warning',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'confirm-button-class'
          }
        });
        return;  
      }
      Swal.fire({
        title: 'Are you sure you want to add this Module?',
        icon: 'question',
        iconColor: 'rgb(226, 78, 14)',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'Cancel',
        customClass: {
          popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
          confirmButton: 'confirm-button-class', // Custom class for the confirm button
      cancelButton: 'cancel-button-class' // Custom class for the cancel button
        }
      }).then(async(result) => {
        if (result.isConfirmed) {
      e.preventDefault();  // Prevent the default action of the enter key
       handleChange(e);  // Await the handleChange function to finish
      try {
        // Wait until the state is updated before making an API call
        await new Promise(resolve => setTimeout(resolve, 0));  // A trick to wait for the state to update
        const response = await addModule(module2);
        if (response.status === 'success') {
          setModules(prevCourses  => [...prevCourses, {...response.data, submodules: response.data.submodules || []}]);
          setModule2({
            name:""
          })
          e.target.blur(); 
        } else {
          Swal.fire({
            title: 'Erreur',
            text: 'already exists',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'custom-ok-button'
            }
        });
          setModule2({
            name:""
          })
          console.error('Failed to add module:', response.message);
        }
      } catch (error) {
        console.error("Error adding module:", error);
      }
    }
   else if (result.dismiss === Swal.DismissReason.cancel) {
    setModule2({
      name:""
    })
    handleFocus();
   
    e.target.blur();
  }
    });
  
    }
  };
  const handleKeyPressTest = async (e) => {
    if (e.key === 'Enter') {
      const testFinalValue = testFinal.name.trim();
      if (testFinalValue === '') {
        console.error('The module name cannot be empty.');
        Swal.fire({
          title: 'Invalid Input',
          text: 'The module name cannot be empty.',
          icon: 'warning',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'confirm-button-class'
          }
        });
        return;  
      }
      Swal.fire({
        title: 'Are you sure you want to add this Module?',
        icon: 'question',
        iconColor: 'rgb(226, 78, 14)',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'Cancel',
        customClass: {
          popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
          confirmButton: 'confirm-button-class', // Custom class for the confirm button
      cancelButton: 'cancel-button-class' // Custom class for the cancel button
        }
      }).then(async(result) => {
        if (result.isConfirmed) {
      e.preventDefault();  // Prevent the default action of the enter key
       handleChange(e);  // Await the handleChange function to finish
      try {
        // Wait until the state is updated before making an API call
        await new Promise(resolve => setTimeout(resolve, 0));  // A trick to wait for the state to update
        const response = await addTestFinal(testFinal);
        if (response.status === 'success') {
          setTestFinal(prevFinalTests => [...prevFinalTests, {...response.data, testFinal: response.data.testFinal || []}]);
          setTestFinal({
            name:""
          })
          e.target.blur(); 
        } else {
          Swal.fire({
            title: 'Erreur',
            text: 'already exists',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'custom-ok-button'
            }
        });
          setTestFinal({
            name:""
          })
          console.error('Failed to add module:', response.message);
        }
      } catch (error) {
        console.error("Error adding module:", error);
      }
    }
   else if (result.dismiss === Swal.DismissReason.cancel) {
    setTestFinal({
      name:""
    })
    handleFocus();
   
    e.target.blur();
  }
    });
  
    }
  };
  const handleKeyPressModify = async (e, id) => {

    if (e.key === 'Enter') {
      
        const trimmedValue = module2.name.trim();
        if (trimmedValue === '') {
          setModules(modules.map(mod => mod.id === id ? { ...mod, name: currentName } : mod));
          console.error('The module name cannot be empty.');
          // Optionally, show an alert or a message to the user
          Swal.fire({
            title: 'Invalid Input',
            text: 'The module name cannot be empty.',
            icon: 'warning',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'confirm-button-class'
            }
          });
          return;  // Do not proceed with adding the module
        }

    Swal.fire({
      title: 'Are you sure you want to Update this Module?',
      icon: 'question',
      iconColor: 'rgb(226, 78, 14)',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update it',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
        confirmButton: 'confirm-button-class', // Custom class for the confirm button
    cancelButton: 'cancel-button-class' // Custom class for the cancel button
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
   
      e.preventDefault();  // Prevent the default action of the enter key
    //  handleChange2(e);  // Await the handleChange function to finish
       try {
        // Wait until the state is updated before making an API call
        await new Promise(resolve => setTimeout(resolve, 0));
       // console.log(submodule)  // A trick to wait for the state to update
   //  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii yamina")
        const response = await updateModule(id, module);
        if (response.status === 'success') {
          e.target.blur();
          //window.location.reload();
          setEditableModuleId(null);
       
        } 
        else{
          Swal.fire({
            title: 'Erreur',
            text: 'already exists',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'custom-ok-button' // Applying custom class to the confirm button
            }
        });
        }
      } catch (error) {
        console.error("Error modify module:", error);
      }
    
  }
  else if (result.dismiss === Swal.DismissReason.cancel) {
    setModules(modules.map(mod => mod.id === id ? { ...mod, name: currentName } : mod));

    handleFocus();
    e.target.blur();
    setEditableModuleId(null);
  }

}); 
  }
  };
 const handleKeyPress1 = async (e, id) => {
 // console.log(message)
 
    const me = {
      title: message
    };
    //  console.log(message)
//console.log(me.title)
 
    if (e.key === 'Enter') {
      const trimmedValue = me.title.trim();
      if (trimmedValue === '') {
        console.error('The Submodule name cannot be empty.');
        // Optionally, show an alert or a message to the user
        Swal.fire({
          title: 'Invalid Input',
          text: 'The Submodule name cannot be empty.',
          icon: 'warning',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'confirm-button-class'
          }
        });
        return;  // Do not proceed with adding the module
      }
      Swal.fire({
        title: 'Are you sure you want to add this SuModule?',
        icon: 'question',
      iconColor: 'rgb(226, 78, 14)',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'Cancel',
        customClass: {
          popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
          confirmButton: 'confirm-button-class', // Custom class for the confirm button
      cancelButton: 'cancel-button-class' // Custom class for the cancel button
        }
      }).then(async(result) => {
        if (result.isConfirmed) {
    e.preventDefault();  // Prevent the default action of the enter key
     handleChange1(e, id);  // Await the handleChange function to finish
     try {
      // Wait until the state is updated before making an API call
      await new Promise(resolve => setTimeout(resolve, 0));
     // console.log(submodule)  // A trick to wait for the state to update
      const response = await addSubmodule(me, id);
      if (response.status === 'success') {
        
        setModules(prevModules => prevModules.map(module => {
          if (module.id === id) {
              // Assuming response.data is the new submodule returned from the server
              const newSubmodules = [...module.submodules, response.data];
              return {...module, submodules: newSubmodules};
          }
          return module;
      }));

      handleChange1(e, id);
      setModuleEdits(prev => ({ ...prev, [id]: "" })); // Reset local input
      //  console.log('Submodule added successfully');
        // Reload the window or redirect as needed
       // window.location.reload();  // Consider using React Router for navigation instead
      } else {
        Swal.fire({
          title: 'Erreur',
          text: 'already exists',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
              confirmButton: 'custom-ok-button' // Applying custom class to the confirm button
          }
          
      });
      setModuleEdits(prev => ({ ...prev, [id]: "" }));
        console.error('Failed to add submodule:', response.message);
      }
    } catch (error) {
      console.error("Error adding submodule:", error);
    }
    
  }
  else if (result.dismiss === Swal.DismissReason.cancel) {
   handleFocus();
   // User clicked 'Cancel', reset the editable module ID
   setModuleEdits(prev => ({ ...prev, [id]: "" })); // Reset local input
   e.target.blur();
 }
   });
 
  }
};
const handleTest = async (e) => {
  setStateAdmin("test");

  
  
      const reponse1 = await getTestName();
      console.log(reponse1)
      if(reponse1 === "false"){
        try {
        const reponse = await addTestFinal();
        //    const updatedTests = await fetchFinalTests();
           // setTestFinals(updatedTests);
            console.log(reponse.data.id)
            localStorage.setItem('idTEST',reponse.data.id);
            
          //  setAlertMessage('Test final added successfully!');
           // setAlertOpen(true);
          } catch (error) {
            console.error('Failed to add test final:', error);
            //setAlertMessage('Failed to add test final');
            setAlertOpen(true);
          }
      }
     
  
 

};

  const handleChange = async (e) => {
    const { name, value } = e.target;

    // Correctly set the updated module
    setModule2(prev => ({ ...prev, [name]: value }));

  
  };
  
  const handleModuleNameChange = (e, moduleId) => {
    const { name, value } = e.target;
    
   // setModule(prev => ({ ...prev, [name]: value }));
    const newName = e.target.value;
    if (!isEditing) {
    const module = modules.find(m => m.id === moduleId);
    //console.log(module)
    if (module) {
     // console.log(module.name)
      setCurrentName(module.name);  // Store the current name before changes
      setIsEditing(true);
    }
  }
    setModules(modules.map(mod => mod.id === moduleId ? { ...mod, name: newName } : mod));
  };

  const handleEditModuleName = (moduleId) => {
    setEditableModuleId(moduleId);
  };

  const handleDeleteModule = async (moduleId) => {
    Swal.fire({
      title: 'Are you sure you want to delete this module?',
      icon: 'question',
      iconColor: 'rgb(226, 78, 14)',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
        confirmButton: 'confirm-button-class', // Custom class for the confirm button
    cancelButton: 'cancel-button-class' // Custom class for the cancel button
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
    setModules(prevModules => prevModules.filter(module => module.id !== moduleId));
    const response = await deleteModule(moduleId);
    if (response.status === 'success') {
      
      //window.location.reload();
    } else {
      console.error('Deletion failed');
    }
  }

}); 
  };
  const handleDeleteSubModule = async (subId, moduleid, index) => {
    Swal.fire({
      title: 'Are you sure you want to delete this Submodule?',
      icon: 'question',
      iconColor: 'rgb(226, 78, 14)',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
        confirmButton: 'confirm-button-class', // Custom class for the confirm button
    cancelButton: 'cancel-button-class' // Custom class for the cancel button
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setModules(prevModules => {
          let nextSelection = { moduleId: null, index: null }; // To store the next selection
          const newModules = prevModules.map((module, idx) => {
            if (module.id === moduleid) {
              const updatedSubmodules = module.submodules.filter(sub => sub.id !== subId);
              if (updatedSubmodules.length > 0) {
                // If there are still submodules left in the current module
                let nextIndex = module.submodules.findIndex(sub => sub.id === subId);
                if (nextIndex >= updatedSubmodules.length) {
                  nextIndex = updatedSubmodules.length - 1; // Select the last one if it was the last
                }
                nextSelection = { moduleId: moduleid, index: nextIndex };
              } else {
                // No submodules left in this module, find the last submodule of the previous module
                for (let j = idx - 1; j >= 0; j--) {
                  if (prevModules[j].submodules.length > 0) {
                    nextSelection = { 
                      moduleId: prevModules[j].id, 
                      index: prevModules[j].submodules.length - 1  // Select the last submodule of the previous module
                    };
                    break;
                  }
                }
              }
              return { ...module, submodules: updatedSubmodules };
            }
            return module;
          });
  
          // Set the next selection if any submodule or previous module is available
          if (nextSelection.moduleId !== null) {
            onSubmoduleSelect(nextSelection.moduleId, nextSelection.index, 'sub');
          } else {
            onSubmoduleSelect(null, null, 'sub');  // No submodules at all in the project
          }
          return newModules;
        });
  
    const response = await deleteSubmodule(subId,moduleid);
    if (response.status === 'success') {
      
      // window.location.reload();
    } else {
      console.error('Deletion failed');
    }

  }

});
  
  };
  const [moduleEdits, setModuleEdits] = useState({}); // To track changes locally
const handleonTestFinalSelect  = () =>{
  
}
  const handleBlur = (moduleId) => {
    // e.target.blur(); // Not necessary to call blur() here as onBlur is called because it's already blurring
    // window.location.reload(); // Uncomment if you really need to reload the entire page (not recommended in most SPAs)
    setEditableModuleId(null);
};
  
  const visibleTrainings= showAllMore ? modules : modules.slice(0, 3);
  return (
    <div className="w-64  bg-white-100 p-4 border-r overflow-auto h-[1100px]">
      {visibleTrainings.map((module) => (
        <div key={module.id} className="mb-4">
          <div className="font-bold relative">
            {editableModuleId === module.id ? (
              <input
              name="name"
                type="text"
                value={module.name}
                onChange={(e) => handleModuleNameChange(e, module.id)}
                onBlur={() => handleBlur(module.id)}
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
                  
                        handleDeleteModule(module.id);
                    
                }}
                />
              </div>
            )}
          </div>
          {module.submodules.map((submodule, index) => (
            <div key={index} className="flex items-center mt-2 relative">
              <div className="w-full items-center border border-gray-300 bg-gray-200 px-4 py-2"
                   onClick={() => onSubmoduleSelect(module.id, index, 'sub')}
                   
                   >
                {submodule.title}
                <RiEditLine
                  className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => onSubmoduleSelect(module.id, index, 'sub')} 
                />
                <IoMdClose
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default button click behavior
                 
                        handleDeleteSubModule(submodule.id,module.id,index);
                      
                    
                }}
                />
              </div>
            </div>
          ))}
          <input
            type="text"
            value={moduleEdits[module.id]}
            onFocus={handleFocus}
           // onChange={(e) => handleSubmoduleChange(e, module.id)}
          onChange={(e) => handleChange1(e, module.id)}
  onKeyPress={(e) => handleKeyPress1(e, module.id)}
            placeholder="Add submodule..."
            className="w-full border border-gray-300 bg-grey-200 rounded px-4 py-2 mt-2"
          />
        </div>
      ))}
      <div className="mb-4 border-t pt-4">
        <input
         onFocus={handleFocus}
          type="text"
          name="name"
      value={module2.name}
      onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder= " Add module..."
          className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
        />
      </div>
      {modules.length > 3 && (
    <div className="flex justify-center mt-4">
      <button onClick={() => setShowAllMore(!showAllMore)} className="bg-orange-500 text-white px-4 py-2 text-sm font-bold">
        {showAllMore ? 'Show Less' : 'Show All'}
      </button>
    </div>
  )}
<div className="flex justify-center mb-4 border-t pt-6">
<button onClick={() => handleTest()} className="bg-orange-500 text-black px-6 py-2 text-xs font-bold mr-8">
       ADD Test
      </button>
    </div>
  <CustomAlert
        isOpen={alertOpen}
        message={alertMessage}
        onClose={() => setAlertOpen(false)}
      />
    </div>
    
  );
};

export default ModuleInput;

                  
               
   
  























// import React, { useState, useEffect } from 'react';
// import { IoMdClose } from 'react-icons/io';
// import { RiEditLine } from 'react-icons/ri';
// import { addModule, addSubmodule, deleteModule, deleteSubmodule, updateModule, deleteTestFinal, addTestFinal,createQuiz } from '../services/UsersService';
// import CustomAlert from '../components/CustomAlert '
// import Swal from 'sweetalert2';
// import '../styles/Popp.css'

// const ModuleInput = ({ modules, setModules, onSubmoduleSelect }) => {
//  modules.forEach(module => {
//   module.submodules.forEach(module1 => {
//     // console.log('Submodules for module:',module1.title);
//    })
//     });

//     const [isFocused, setIsFocused] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentName, setCurrentName] = useState("");   
//   const [editableModuleId, setEditableModuleId] = useState(null);
//   const [module, setModule] = useState({ name: '' });
//   const [module2, setModule2] = useState({ name: '' });
//   const [finalTests, setFinalTests] = useState([]);
//   const [finalTestName, setFinalTestName] = useState({ name: '' }); // Define finalTestName state
//   const [editableTestId, setEditabelTestId] = useState(null);

//   const [submodule, setSubmodule] = useState({ 
//     id:'',
//     title: ''
//    });
//    const [showAllMore, setShowAllMore] = useState(false);
//    const [initialSelectDone, setInitialSelectDone] = useState(false);
//    const [alertOpen, setAlertOpen] = useState(false);
//    const [alertMessage, setAlertMessage] = useState('');
//    const [message, setMessage] = useState('');
//    const handleFocus = () => {
//     setIsFocused(true);
//     setEditableModuleId(null);
//   };
//   const handleChange1 = async (e, id) => {
//     const { value } = e.target;  
//     setModuleEdits(prev => ({
//       ...prev,
//       [id]: value 
      
//     }));
//   setMessage(value)
//   };
//    useEffect(() => {
//        if (!initialSelectDone && typeof onSubmoduleSelect === 'function' && modules.length > 0 && modules[0].submodules.length > 0) {
//            onSubmoduleSelect(modules[0].id, 0);
//            setInitialSelectDone(true); 
//        }
//    }, [modules, onSubmoduleSelect, initialSelectDone]);

//   const handleKeyPress = async (e) => {
//     if (e.key === 'Enter') {
//       const FormationId = module2.name.trim();
//       if (FormationId === '') {
//         console.error('The module name cannot be empty.');
//         Swal.fire({
//           title: 'Invalid Input',
//           text: 'The module name cannot be empty.',
//           icon: 'warning',
//           confirmButtonText: 'OK',
//           customClass: {
//             confirmButton: 'confirm-button-class'
//           }
//         });
//         return;  
//       }
//       Swal.fire({
//         title: 'Are you sure you want to add this Module?',
//         icon: 'question',
//         iconColor: 'rgb(226, 78, 14)',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, add it!',
//         cancelButtonText: 'Cancel',
//         customClass: {
//           popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
//           confirmButton: 'confirm-button-class', // Custom class for the confirm button
//       cancelButton: 'cancel-button-class' // Custom class for the cancel button
//         }
//       }).then(async(result) => {
//         if (result.isConfirmed) {
//       e.preventDefault();  // Prevent the default action of the enter key
//        handleChange(e);  // Await the handleChange function to finish
//       try {
//         // Wait until the state is updated before making an API call
//         await new Promise(resolve => setTimeout(resolve, 0));  // A trick to wait for the state to update
//         const response = await addModule(module2);
//         if (response.status === 'success') {
//           setModules(prevCourses => [...prevCourses, {...response.data, submodules: response.data.submodules || []}]);
//           setModule2({
//             name:""
//           })
//           e.target.blur(); 
//         } else {
//           Swal.fire({
//             title: 'Erreur',
//             text: 'already exists',
//             icon: 'error',
//             confirmButtonText: 'OK',
//             customClass: {
//                 confirmButton: 'custom-ok-button'
//             }
//         });
//           setModule2({
//             name:""
//           })
//           console.error('Failed to add module:', response.message);
//         }
//       } catch (error) {
//         console.error("Error adding module:", error);
//       }
//     }
//    else if (result.dismiss === Swal.DismissReason.cancel) {
//     setModule2({
//       name:""
//     })
//     handleFocus();
   
//     e.target.blur();
//   }
//     });
  
//     }
//   };
//   const handleKeyPressModify = async (e, id) => {

//     if (e.key === 'Enter') {
      
//         const FormationId = module2.name.trim();
//         if (FormationId === '') {
//           setModules(modules.map(mod => mod.id === id ? { ...mod, name: currentName } : mod));
//           console.error('The module name cannot be empty.');
//           // Optionally, show an alert or a message to the user
//           Swal.fire({
//             title: 'Invalid Input',
//             text: 'The module name cannot be empty.',
//             icon: 'warning',
//             confirmButtonText: 'OK',
//             customClass: {
//               confirmButton: 'confirm-button-class'
//             }
//           });
//           return;  // Do not proceed with adding the module
//         }

//     Swal.fire({
//       title: 'Are you sure you want to Update this Module?',
//       icon: 'question',
//       iconColor: 'rgb(226, 78, 14)',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, Update it',
//       cancelButtonText: 'Cancel',
//       customClass: {
//         popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
//         confirmButton: 'confirm-button-class', // Custom class for the confirm button
//     cancelButton: 'cancel-button-class' // Custom class for the cancel button
//       }
//     }).then(async (result) => {
//       if (result.isConfirmed) {
   
//       e.preventDefault();  // Prevent the default action of the enter key
//     //  handleChange2(e);  // Await the handleChange function to finish
//        try {
//         // Wait until the state is updated before making an API call
//         await new Promise(resolve => setTimeout(resolve, 0));
//        // console.log(submodule)  // A trick to wait for the state to update
//    //  console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii yamina")
//         const response = await updateModule(id, module);
//         if (response.status === 'success') {
//           e.target.blur();
//           //window.location.reload();
//           setEditableModuleId(null);
       
//         } 
//         else{
//           Swal.fire({
//             title: 'Erreur',
//             text: 'already exists',
//             icon: 'error',
//             confirmButtonText: 'OK',
//             customClass: {
//                 confirmButton: 'custom-ok-button' // Applying custom class to the confirm button
//             }
//         });
//         }
//       } catch (error) {
//         console.error("Error modify module:", error);
//       }
    
//   }
//   else if (result.dismiss === Swal.DismissReason.cancel) {
//     setModules(modules.map(mod => mod.id === id ? { ...mod, name: currentName } : mod));

//     handleFocus();
//     e.target.blur();
//     setEditableModuleId(null);
//   }

// }); 
//   }
//   };
//  const handleKeyPress1 = async (e, id) => {
//  // console.log(message)
 
//     const me = {
//       title: message
//     };
//     //  console.log(message)
// //console.log(me.title)
 
//     if (e.key === 'Enter') {
//       const FormationId = me.title.trim();
//       if (FormationId === '') {
//         console.error('The Submodule name cannot be empty.');
//         // Optionally, show an alert or a message to the user
//         Swal.fire({
//           title: 'Invalid Input',
//           text: 'The Submodule name cannot be empty.',
//           icon: 'warning',
//           confirmButtonText: 'OK',
//           customClass: {
//             confirmButton: 'confirm-button-class'
//           }
//         });
//         return;  // Do not proceed with adding the module
//       }
//       Swal.fire({
//         title: 'Are you sure you want to add this SuModule?',
//         icon: 'question',
//       iconColor: 'rgb(226, 78, 14)',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, add it!',
//         cancelButtonText: 'Cancel',
//         customClass: {
//           popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
//           confirmButton: 'confirm-button-class', // Custom class for the confirm button
//       cancelButton: 'cancel-button-class' // Custom class for the cancel button
//         }
//       }).then(async(result) => {
//         if (result.isConfirmed) {
//     e.preventDefault();  // Prevent the default action of the enter key
//      handleChange1(e, id);  // Await the handleChange function to finish
//      try {
//       // Wait until the state is updated before making an API call
//       await new Promise(resolve => setTimeout(resolve, 0));
//      // console.log(submodule)  // A trick to wait for the state to update
//       const response = await addSubmodule(me, id);
//       if (response.status === 'success') {
        
//         setModules(prevModules => prevModules.map(module => {
//           if (module.id === id) {
//               // Assuming response.data is the new submodule returned from the server
//               const newSubmodules = [...module.submodules, response.data];
//               return {...module, submodules: newSubmodules};
//           }
//           return module;
//       }));

//       handleChange1(e, id);
//       setModuleEdits(prev => ({ ...prev, [id]: "" })); // Reset local input
//       //  console.log('Submodule added successfully');
//         // Reload the window or redirect as needed
//        // window.location.reload();  // Consider using React Router for navigation instead
//       } else {
//         Swal.fire({
//           title: 'Erreur',
//           text: 'already exists',
//           icon: 'error',
//           confirmButtonText: 'OK',
//           customClass: {
//               confirmButton: 'custom-ok-button' // Applying custom class to the confirm button
//           }
          
//       });
//       setModuleEdits(prev => ({ ...prev, [id]: "" }));
//         console.error('Failed to add submodule:', response.message);
//       }
//     } catch (error) {
//       console.error("Error adding submodule:", error);
//     }
    
//   }
//   else if (result.dismiss === Swal.DismissReason.cancel) {
//    handleFocus();
//    // User clicked 'Cancel', reset the editable module ID
//    setModuleEdits(prev => ({ ...prev, [id]: "" })); // Reset local input
//    e.target.blur();
//  }
//    });
 
//   }
// };


//   const handleChange = async (e) => {
//     const { name, value } = e.target;

//     // Correctly set the updated module
//     setModule2(prev => ({ ...prev, [name]: value }));

  
//   };
  
//   const handleModuleNameChange = (e, moduleId) => {
//     const { name, value } = e.target;
    
//    // setModule(prev => ({ ...prev, [name]: value }));
//     const newName = e.target.value;
//     if (!isEditing) {
//     const module = modules.find(m => m.id === moduleId);
//     //console.log(module)
//     if (module) {
//      // console.log(module.name)
//       setCurrentName(module.name);  // Store the current name before changes
//       setIsEditing(true);
//     }
//   }
//     setModules(modules.map(mod => mod.id === moduleId ? { ...mod, name: newName } : mod));
//   };

//   const handleEditModuleName = (moduleId) => {
//     setEditableModuleId(moduleId);
//   };

//   const handleDeleteModule = async (moduleId) => {
//     Swal.fire({
//       title: 'Are you sure you want to delete this module?',
//       icon: 'question',
//       iconColor: 'rgb(226, 78, 14)',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, Delete it',
//       cancelButtonText: 'Cancel',
//       customClass: {
//         popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
//         confirmButton: 'confirm-button-class', // Custom class for the confirm button
//     cancelButton: 'cancel-button-class' // Custom class for the cancel button
//       }
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//     setModules(prevModules => prevModules.filter(module => module.id !== moduleId));
//     const response = await deleteModule(moduleId);
//     if (response.status === 'success') {
      
//       //window.location.reload();
//     } else {
//       console.error('Deletion failed');
//     }
//   }

// }); 
//   };
//   const handleDeleteSubModule = async (subId, moduleid, index) => {
//     Swal.fire({
//       title: 'Are you sure you want to delete this Submodule?',
//       icon: 'question',
//       iconColor: 'rgb(226, 78, 14)',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, Delete it',
//       cancelButtonText: 'Cancel',
//       customClass: {
//         popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
//         confirmButton: 'confirm-button-class', // Custom class for the confirm button
//     cancelButton: 'cancel-button-class' // Custom class for the cancel button
//       }
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         setModules(prevModules => {
//           let nextSelection = { moduleId: null, index: null }; // To store the next selection
//           const newModules = prevModules.map((module, idx) => {
//             if (module.id === moduleid) {
//               const updatedSubmodules = module.submodules.filter(sub => sub.id !== subId);
//               if (updatedSubmodules.length > 0) {
//                 // If there are still submodules left in the current module
//                 let nextIndex = module.submodules.findIndex(sub => sub.id === subId);
//                 if (nextIndex >= updatedSubmodules.length) {
//                   nextIndex = updatedSubmodules.length - 1; // Select the last one if it was the last
//                 }
//                 nextSelection = { moduleId: moduleid, index: nextIndex };
//               } else {
//                 // No submodules left in this module, find the last submodule of the previous module
//                 for (let j = idx - 1; j >= 0; j--) {
//                   if (prevModules[j].submodules.length > 0) {
//                     nextSelection = { 
//                       moduleId: prevModules[j].id, 
//                       index: prevModules[j].submodules.length - 1  // Select the last submodule of the previous module
//                     };
//                     break;
//                   }
//                 }
//               }
//               return { ...module, submodules: updatedSubmodules };
//             }
//             return module;
//           });
  
//           // Set the next selection if any submodule or previous module is available
//           if (nextSelection.moduleId !== null) {
//             onSubmoduleSelect(nextSelection.moduleId, nextSelection.index);
//           } else {
//             onSubmoduleSelect(null, null);  // No submodules at all in the project
//           }
//           return newModules;
//         });
  
//     const response = await deleteSubmodule(subId,moduleid);
//     if (response.status === 'success') {
      
//       // window.location.reload();
//     } else {
//       console.error('Deletion failed');
//     }

//   }

// });
  
//   };
//   const [moduleEdits, setModuleEdits] = useState({}); // To track changes locally

//   const handleBlur = (moduleId) => {
//     // e.target.blur(); // Not necessary to call blur() here as onBlur is called because it's already blurring
//     // window.location.reload(); // Uncomment if you really need to reload the entire page (not recommended in most SPAs)
//     setEditableModuleId(null);
// };


// // Function to handle deleting final test
// const handleDeleteFinalTest = async (testId) => {
//   Swal.fire({
//     title: 'Are you sure you want to delete this test?',
//     icon: 'question',
//     iconColor: 'rgb(226, 78, 14)',
//     showCancelButton: true,
//     confirmButtonText: 'Yes, Delete it',
//     cancelButtonText: 'Cancel',
//     customClass: {
//       popup: 'sweetalert-popup', // Utilisez la classe personnalisée ici
//       confirmButton: 'confirm-button-class', // Custom class for the confirm button
//       cancelButton: 'cancel-button-class' // Custom class for the cancel button
//     }
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       setFinalTests(prevFinalTests => prevFinalTests.filter(test => test.id !== testId));
//       const response = await deleteTestFinal(testId);
//       if (response.status === 'success') {
//         // Handle successful deletion if needed
//         console.log('Test deleted successfully');
//       } else {
//         console.error('Deletion failed');
//       }
//     }
//   });
// };


// // Function to handle editing final test (if needed)
// const handleEditFinalTest = (testId) => {
//   setEditabelTestId(testId);
// };

// const handleAddFinalTest = async (testId) => {
//   const formationId = finalTestName.trim();
//   if (formationId === '') {
//     console.error('Final test name cannot be empty.');
//     Swal.fire({
//       title: 'Invalid Input',
//       text: 'Final test name cannot be empty.',
//       icon: 'warning',
//       confirmButtonText: 'OK',
//       customClass: {
//         confirmButton: 'confirm-button-class'
//       }
//     });
//     return;
//   }

//   const testFinal = { name:formationId }; // Assurez-vous que les données de `testFinal` correspondent à ce que votre backend attend

//   try {
//     const response = await addTestFinal(testFinal, testId);
//     if (response.status === 'success') {
//       setFinalTests(prevFinalTests => [...prevFinalTests, response.data]);
//       setFinalTestName('');
//     } else {
//       Swal.fire({
//         title: 'Erreur',
//         text: response.message || 'Failed to add final test.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//         customClass: {
//           confirmButton: 'custom-ok-button'
//         }
//       });
//     }
//   } catch (error) {
//     console.error("Error adding final test:", error);
//     Swal.fire({
//       title: 'Erreur',
//       text: error.message || 'An error occurred while adding the final test.',
//       icon: 'error',
//       confirmButtonText: 'OK',
//       customClass: {
//         confirmButton: 'custom-ok-button'
//       }
//     });
//   }
// };


// const handleKeyPressFinalTest = async (e, id) => {
//   const message = e.target.value; // Assuming e.target.value holds the input message

//   if (e.key === 'Enter') {
//     const TestId = message.trim(); // Renamed from FormationId to TestId

//     if (TestId === '') {
//       console.error('The Test name cannot be empty.'); // Updated error message
//       Swal.fire({
//         title: 'Invalid Input',
//         text: 'The Test name cannot be empty.', // Updated alert text
//         icon: 'warning',
//         confirmButtonText: 'OK',
//         customClass: {
//           confirmButton: 'confirm-button-class'
//         }
//       });
//       return;
//     }

//     Swal.fire({
//       title: 'Are you sure you want to add this Test?',
//       icon: 'question',
//       iconColor: 'rgb(226, 78, 14)',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, add it!',
//       cancelButtonText: 'Cancel',
//       customClass: {
//         popup: 'sweetalert-popup',
//         confirmButton: 'confirm-button-class',
//         cancelButton: 'cancel-button-class'
//       }
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         e.preventDefault();
//         try {
//           await new Promise(resolve => setTimeout(resolve, 0));

//           const response = await createQuiz({ title: TestId }, id); // Updated function call

//           if (response.status === 'success') {
//             setFinalTests(prevFinalTests => prevFinalTests.map(finalTest => {
//               if (finalTest.id === id) {
//                 const newFinalTests = [...finalTest.finalTestName, response.data];
//                 return { ...finalTest, finalTestName: newFinalTests };
//               }
//               return finalTest;
//             }));

//             handleChange1(e, id);
//             setEditableTestId(prev => ({ ...prev, [id]: '' })); // Updated function name
//           } else {
//             Swal.fire({
//               title: 'Error',
//               text: 'Failed to add Test: ' + response.message, // Updated error message
//               icon: 'error',
//               confirmButtonText: 'OK',
//               customClass: {
//                 confirmButton: 'custom-ok-button'
//               }
//             });
//             setEditableTestId(prev => ({ ...prev, [id]: '' })); // Updated function name
//             console.error('Failed to add Test:', response.message); // Updated error message
//           }
//         } catch (error) {
//           console.error("Error adding Test:", error); // Updated error message
//         }
//       } else if (result.dismiss === Swal.DismissReason.cancel) {
//         handleFocus();
//         setEditableTestId(prev => ({ ...prev, [id]: '' })); // Updated function name
//         e.target.blur();
//       }
//     });
//   }
// };

  
//   const visibleTrainings= showAllMore ? modules : modules.slice(0, 3);
//   return (
//     <div className="w-64  bg-white-100 p-4 border-r overflow-auto h-[1100px]">
//       {visibleTrainings.map((module) => (
//         <div key={module.id} className="mb-4">
//           <div className="font-bold relative">
//             {editableModuleId === module.id ? (
//               <input
//               name="name"
//                 type="text"
//                 value={module.name}
//                 onChange={(e) => handleModuleNameChange(e, module.id)}
//                 onBlur={() => handleBlur(module.id)}
//                onKeyPress={(e) => handleKeyPressModify(e, module.id, module.name)}
//                 autoFocus
//                 className="w-full border border-gray-300 bg-white-200 px-4 py-2 mt-2"
//               />
//             ) : (
//               <div className="flex items-center border border-gray-300 px-4 py-2 mt-2">
//                 <div >{module.name}</div>
//                 <RiEditLine
//                   className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                   onClick={() => handleEditModuleName(module.id)}
                  
//                 />
//                 <IoMdClose
//                   className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                   onClick={(e) => {
//                     e.preventDefault(); // Prevent default button click behavior
                  
//                         handleDeleteModule(module.id);
                    
//                 }}
//                 />
//               </div>
//             )}
//           </div>
//           {module.submodules.map((submodule, index) => (
//             <div key={index} className="flex items-center mt-2 relative">
//               <div className="w-full items-center border border-gray-300 bg-gray-200 px-4 py-2"
//                    onClick={() => onSubmoduleSelect(module.id, index)}
                   
//                    >
//                 {submodule.title}
//                 <RiEditLine
//                   className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                   onClick={() => onSubmoduleSelect(module.id, index)} 
//                 />
//                 <IoMdClose
//                   className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                   onClick={(e) => {
//                     e.preventDefault(); // Prevent default button click behavior
                 
//                         handleDeleteSubModule(submodule.id,module.id,index);
                      
                    
//                 }}
//                 />
//               </div>
//             </div>
//           ))}
//           <input
//             type="text"
//             value={moduleEdits[module.id]}
//             onFocus={handleFocus}
//            // onChange={(e) => handleSubmoduleChange(e, module.id)}
//           onChange={(e) => handleChange1(e, module.id)}
//   onKeyPress={(e) => handleKeyPress1(e, module.id)}
//             placeholder="Add submodule..."
//             className="w-full border border-gray-300 bg-grey-200 rounded px-4 py-2 mt-2"
//           />
//         </div>
//       ))}
//       <div className="mb-4 border-t pt-4">
//         <input
//          onFocus={handleFocus}
//           type="text"
//           name="name"
//       value={module2.name}
//       onChange={handleChange}
//           onKeyPress={handleKeyPress}
//           placeholder= " Add module..."
//           className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
//         />
//       </div>
//       {modules.length > 3 && (
//     <div className="flex justify-center mt-4">
//       <button onClick={() => setShowAllMore(!showAllMore)} className="bg-orange-500 text-white px-4 py-2 text-sm font-bold">
//         {showAllMore ? 'Show Less' : 'Show All'}
//       </button>
//     </div>
//   )}
//   <CustomAlert
//         isOpen={alertOpen}
//         message={alertMessage}
//         onClose={() => setAlertOpen(false)}
//       />

//     {/* Render final tests */}
//     {finalTests.map((test) => (
//         <div key={test.id} className="flex items-center mt-2 relative">
//           <div className="w-full items-center border border-gray-300 bg-gray-200 px-4 py-2">
//             {test.name}
//             <RiEditLine
//               className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
//               onClick={() => handleEditFinalTest(test.id)}
//             />
//             <IoMdClose
//               className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//               onClick={() => handleDeleteFinalTest(test.id)}
//             />
//           </div>
//         </div>
//       ))}
//       <input
//         type="text"
//         value={finalTestName}
//         onChange={(e) => setFinalTestName(e.target.value)}
//         onKeyPress={handleKeyPressFinalTest}
//         placeholder="Add final test..."
//         className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2 mt-2"
//       />
//     </div>

  
//   );
// };

// export default ModuleInput;

                  
               
   
  