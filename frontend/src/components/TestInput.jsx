import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiEditLine } from 'react-icons/ri';
import { createQuiz, createQuestionWithOptions, createQuestionWithOptionsTest, addTestFinal } from '../services/UsersService';
import Swal from 'sweetalert2';
import '../styles/Popp.css';
import NavBar from './Navbar';
import CustomAlert from './CustomAlert ';

const TestInput = () => {
  const [testFinals, setTestFinals] = useState([]);
  const [testFinal2, setTestFinal2] = useState({ name: '' });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [editableTestFinalId, setEditableTestId] = useState(null);
  const [showAllMore, setShowAllMore] = useState(false);
  const visibleTestFinals = showAllMore ? testFinals : testFinals.slice(0, 3);

  const handleKeyPressModify = async (e) => {
    if (e.key === 'Enter') {
      try {
        const reponse = await addTestFinal();
    //    const updatedTests = await fetchFinalTests();
       // setTestFinals(updatedTests);
        setTestFinal2({ name: '' });
        setEditableTestId(null);
        setAlertMessage('Test final added successfully!');
        setAlertOpen(true);
      } catch (error) {
        console.error('Failed to add test final:', error);
        setAlertMessage('Failed to add test final');
        setAlertOpen(true);
      }
    }
  };

  const handleTestFinalNameChange = (e) => {
    const { name, value } = e.target;
    setTestFinal2(prev => ({ ...prev, [name]: value }));
  };

  const handleTestFinalName = (testFinal2Id) => {
    setEditableTestId(testFinal2Id);
  };

  const handleDeleteTestFinal = (testFinal2Id) => {
    // Add your delete logic here
  };

  const handleBlur = () => {
    setEditableTestId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
      const testFinal = await fetchFinalTests();
       setTestFinals(testFinal || []);
      } catch (err) {
    //    console.error('Error fetching tests:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex mt-12">
        <div className="w-64 bg-white p-4 border-r overflow-auto h-[800px]">
          {visibleTestFinals.map((testFinal) => (
            <div key={testFinal.id} className="mb-4">
              <div className="font-bold relative">
                {editableTestFinalId === testFinal.id ? (
                  <input
                    type="text"
                    name="name"
                    value={testFinal2.name}
                    onChange={handleTestFinalNameChange}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPressModify}
                    autoFocus
                    className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
                  />
                ) : (
                  <div className="flex items-center border border-gray-300 px-4 py-2 mt-2">
                    <div>{testFinal.name}</div>
                    <RiEditLine
                      className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() => handleTestFinalName(testFinal.id)}
                    />
                    <IoMdClose
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteTestFinal(testFinal.id);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="mb-4 border-t pt-2">
            <input
              type="text"
              name="name"
              value={testFinal2.name}
              onChange={handleTestFinalNameChange}
              onKeyPress={handleKeyPressModify}
              placeholder="Add Test Final..."
              className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
            />
          </div>
          {testFinals.length > 3 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowAllMore(!showAllMore)}
                className="bg-orange-500 text-white px-4 py-2 text-sm font-bold"
              >
                {showAllMore ? 'Show Less' : 'Show All'}
              </button>
            </div>
          )}
        </div>
        {testFinals.length > 0 && (
          <div className="flex flex-grow p-4">
            <div className="mx-auto flex flex-col">
              <div className="w-[55rem] py-6 px-4 mt-10 bg-gray-100 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500 flex flex-col items-start">
                <p className="font-bold mb-4">
                  Confirm the <span className="text-orange-500">information</span>
                </p>
                <div className="flex bg-center mt-2">
                  <button
                    className="bg-orange-500 hover:text-black px-3 py-1.5 text-xs font-bold mr-2 flex items-center justify-center"
                    onClick={() => handleClick(selectedTestFinal.id, selectedTestFinal.title, selectedTestFinal.contenu)}
                  >
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.8383 1.69134C11.8409 1.31273 11.6173 0.969098 11.2702 0.81793C10.9231 0.666762 10.5193 0.737194 10.2438 0.996948L10.2436 0.996772L4.64107 6.45163L2.79514 4.39589L2.79498 4.39609C2.42 4.07211 1.85821 4.09371 1.50921 4.44553L1.1304 4.82635C0.789088 5.17017 0.759138 5.71504 1.06071 6.0942L1.06055 6.09432L4.09103 9.90255L4.09117 9.90244C4.27012 10.1282 4.54242 10.2599 4.83051 10.2599C5.1186 10.2599 5.3909 10.1282 5.56984 9.90244L5.57 9.90257L11.6309 2.28609L11.6307 2.28598C11.7655 2.11711 11.8387 1.90738 11.8383 1.69134Z"
                        fill="black"
                      />
                    </svg>
                    <span>Yes</span>
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1.5 text-xs font-bold"
                    onClick={handleClickAnnuler}
                  >
                    No
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center mt-10 space-y-10">
                <div className="relative w-[19rem] bg-gray-200 border-2 border-gray-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <p className="text-center font-bold mb-2">Question 1/10</p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="relative w-[50rem] bg-gray-50 border-2 border-gray-200 focus-within:ring-1 focus-within:ring-blue-500">
                    <p className="flex text-center font-bold mb-2">What is your experience?</p>
                    <RiEditLine className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500" />
                  </div>
                  <div className="relative w-[50rem] p-8 bg-gray-200 border-12 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
                    <button
                      className="absolute left-72 text-gray-400 bottom-[7rem] w-[10rem] bg-gray-200 border-2 border-gray-400 focus-within
                      focus-within
                      text-center font-bold mb-2"
                      onClick={() => {
                        alert('Ajouter une nouvelle question');
                      }}
                    >
                      Add option(+)
                    </button>
                    <ul className="text-left list-disc ml-12">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
                        multiple-choice questions
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
                        Answer all questions
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
                        No penalty for incorrect answers
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
                        If you navigate away from the test page during the test, you may lose your responses
                      </label>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-row w-[35rem] p-8 mx-auto mt-10 bg-gray-400 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
                <div className="mx-auto">
                  <svg
                    className="absolute top-1/2 left-44 transform -translate-y-1/2"
                    width="34"
                    height="42"
                    viewBox="0 0 34 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.333328 0.166504H33.6667V9.45805L20.2012 20.9998L33.6667 32.5417V41.8332H0.333328V32.5417L13.7987 20.9998L0.333328 9.45805V0.166504ZM17 18.2559L29.5 7.54165V4.33317H4.49999V7.54165L17 18.2559ZM17 23.7438L4.49999 34.458V37.6665H29.5V34.458L17 23.7438Z"
                      fill="black"
                    />
                  </svg>
                  <div className="flex flex-col">
                    <p>Select timing</p>
                    <p>00.00.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <CustomAlert
        isOpen={alertOpen}
        message={alertMessage}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
};

export default TestInput;


// import React, { useState, useEffect } from 'react';
// import { IoMdClose } from 'react-icons/io';
// import { RiEditLine } from 'react-icons/ri';
// import { createQuiz, createQuestionWithOptions, createQuestionWithOptionsTest, addTestFinal } from '../services/UsersService';
// import Swal from 'sweetalert2';
// import '../styles/Popp.css';
// import NavBar from './Navbar';
// import CustomAlert from './CustomAlert ';

// const TestInput = () => {
//   const [testFinals, setTestFinals] = useState([]);
//   const [selectedSubmodule, setSelectedSubmodule] = useState(null);
//   const [testFinal2, setTestFinal2] = useState({ name: '' });
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [editableTestFinalId, setEditableTestId] = useState(null);
//   const [showAllMore, setShowAllMore] = useState(false);
//   const visibleTestFinals = showAllMore ? testFinals : testFinals.slice(0, 3);

//   const handleSubtestFinalSelect = (moduleId, index) => {
//     const module = testFinals.find(m => m.id === moduleId);
//     if (!module) {
//       console.error('No module found with id:', moduleId);
//       setSelectedSubmodule({ moduleId, index, name: null });
//       return;
//     }
//     const submodule = module.subtestFinal?.[index];
//     if (!submodule) {
//       console.error('No submodule found at index:', index);
//       setSelectedSubmodule({ moduleId, index, name: null });
//       return;
//     }
//     setSelectedSubmodule({ moduleId, index, name: submodule });
//   };

//   const handleKeyPressModify = async (e) => {
//     if (e.key === 'Enter') {
//       if (selectedSubmodule && selectedSubmodule.moduleId) {
//         try {
//           await addTestFinal(testFinal2, selectedSubmodule.moduleId);
//           const updatedTests = await fetchFinalTests();
//           setTestFinals(updatedTests);
//           setTestFinal2({ name: '' });
//           setEditableTestId(null);
//           setAlertMessage('Test final added successfully!');
//           setAlertOpen(true);
//         } catch (error) {
//           console.error('Failed to add test final:', error);
//           setAlertMessage('Failed to add test final');
//           setAlertOpen(true);
//         }
//       } else {
//         setAlertMessage('Please select a valid submodule.');
//         setAlertOpen(true);
//       }
//     }
//   };

//   const handleTestFinalNameChange = (e) => {
//     const { name, value } = e.target;
//     setTestFinal2(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTestFinalName = (testFinal2Id) => {
//     setEditableTestId(testFinal2Id);
//   };

//   const handleDeleteTestFinal = (testFinal2Id) => {
//     // Add your delete logic here
//   };

//   const handleClickAnnuler = () => {
//     setSelectedSubmodule(null);
//   };

//   const handleBlur = () => {
//     setEditableTestId(null);
//   };

//   useEffect(() => {
//     const fetchData2 = async () => {
//       try {
//         const testFinal = await fetchFinalTests();
//         setTestFinals(testFinal || []);
//       } catch (err) {
//         console.error('Error fetching modules:', err);
//       }
//     };
//     fetchData2();
//   }, []);

//   const handleFocus = () => {
//     // Add your logic here
//   };

//   return (
//     <>
//       <NavBar />
//       <div className="flex mt-12">
//         <div className="w-64 bg-white p-4 border-r overflow-auto h-[800px]">
//           {visibleTestFinals.map((testFinal) => (
//             <div key={testFinal.id} className="mb-4">
//               <div className="font-bold relative">
//                 {editableTestFinalId === testFinal.id ? (
//                   <input
//                     onFocus={handleFocus}
//                     type="text"
//                     name="name"
//                     value={testFinal2.name}
//                     onChange={handleTestFinalNameChange}
//                     onBlur={handleBlur}
//                     onKeyPress={handleKeyPressModify}
//                     autoFocus
//                     className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
//                   />
//                 ) : (
//                   <div className="flex items-center border border-gray-300 px-4 py-2 mt-2">
//                     <div>{testFinal.name}</div>
//                     <RiEditLine
//                       className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                       onClick={() => handleTestFinalName(testFinal.id)}
//                     />
//                     <IoMdClose
//                       className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleDeleteTestFinal(testFinal.id);
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//           <div className="mb-4 border-t pt-2">
//             <input
//               onFocus={handleFocus}
//               type="text"
//               name="name"
//               value={testFinal2.name}
//               onChange={handleTestFinalNameChange}
//               onKeyPress={handleKeyPressModify}
//               placeholder="Add Test Final..."
//               className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
//             />
//           </div>
//           {testFinals.length > 3 && (
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={() => setShowAllMore(!

//                   showAllMore)}
//                   className="bg-orange-500 text-white px-4 py-2 text-sm font-bold"
//                   >
//                   {showAllMore ? 'Show Less' : 'Show All'}
//                   </button>
//                   </div>
//                   )}
//                   </div>
//                   {testFinals.length > 0 && (
//                   <div className="flex flex-grow p-4">
//                   <div className="mx-auto flex flex-col">
//                   <div className="w-[55rem] py-6 px-4 mt-10 bg-gray-100 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500 flex flex-col items-start">
//                   <p className="font-bold mb-4">
//                   Confirm the <span className="text-orange-500">information</span>
//                   </p>
//                   <div className="flex bg-center mt-2">
//                   <button
//                   className="bg-orange-500 hover
//                   text-black px-3 py-1.5 text-xs font-bold mr-2 flex items-center justify-center"
//                   onClick={() => handleClick(selectedSubmodule.id, selectedSubmodule.title, selectedSubmodule.contenu)}
//                   >
//                   <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path
//                                        fillRule="evenodd"
//                                        clipRule="evenodd"
//                                        d="M11.8383 1.69134C11.8409 1.31273 11.6173 0.969098 11.2702 0.81793C10.9231 0.666762 10.5193 0.737194 10.2438 0.996948L10.2436 0.996772L4.64107 6.45163L2.79514 4.39589L2.79498 4.39609C2.42 4.07211 1.85821 4.09371 1.50921 4.44553L1.1304 4.82635C0.789088 5.17017 0.759138 5.71504 1.06071 6.0942L1.06055 6.09432L4.09103 9.90255L4.09117 9.90244C4.27012 10.1282 4.54242 10.2599 4.83051 10.2599C5.1186 10.2599 5.3909 10.1282 5.56984 9.90244L5.57 9.90257L11.6309 2.28609L11.6307 2.28598C11.7655 2.11711 11.8387 1.90738 11.8383 1.69134Z"
//                                        fill="black"
//                                      />
//                   </svg>
//                   <span>Yes</span>
//                   </button>
//                   <button
//                                    className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1.5 text-xs font-bold"
//                                    onClick={handleClickAnnuler}
//                                  >
//                   No
//                   </button>
//                   </div>
//                   </div>
//                   <div className="flex flex-col items-center mt-10 space-y-10">
//                   <div className="relative w-[19rem] bg-gray-200 border-2 border-gray-500 focus-within:ring-1 focus-within:ring-blue-500">
//                   <p className="text-center font-bold mb-2">Question 1/10</p>
//                   </div>
//                   <div className="flex flex-col gap-1">
//                   <div className="relative w-[50rem] bg-gray-50 border-2 border-gray-200 focus-within:ring-1 focus-within:ring-blue-500">
//                   <p className="flex text-center font-bold mb-2">What is your experience?</p>
//                   <RiEditLine className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500" />
//                   </div>
//                   <div className="relative w-[50rem] p-8 bg-gray-200 border-12 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
//                   <button
//                   className="absolute left-72 text-gray-400 bottom-[7rem] w-[10rem] bg-gray-200 border-2 border-gray-400 focus-within
//                   focus-within
//                   text-center font-bold mb-2"
//                   onClick={() => {
//                   alert('Ajouter une nouvelle question');
//                   }}
//                   >
//                   Add option(+)
//                   </button>
//                   <ul className="text-left list-disc ml-12">
//                   <label className="flex items-center">
//                   <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                   multiple-choice questions
//                   </label>
//                   <label className="flex items-center">
//                   <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                   Answer all questions
//                   </label>
//                   <label className="flex items-center">
//                   <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                   No penalty for incorrect answers
//                   </label>
//                   <label className="flex items-center">
//                   <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                   If you navigate away from the test page during the test, you may lose your responses
//                   </label>
//                   </ul>
//                   </div>
//                   </div>
//                   </div>
//                   <div className="relative flex flex-row w-[35rem] p-8 mx-auto mt-10 bg-gray-400 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
//                   <div className="mx-auto">
//                   <svg
//                                    className="absolute top-1/2 left-44 transform -translate-y-1/2"
//                                    width="34"
//                                    height="42"
//                                    viewBox="0 0 34 42"
//                                    fill="none"
//                                    xmlns="http://www.w3.org/2000/svg"
//                                  >
//                   <path
//                                      d="M0.333328 0.166504H33.6667V9.45805L20.2012 20.9998L33.6667 32.5417V41.8332H0.333328V32.5417L13.7987 20.9998L0.333328 9.45805V0.166504ZM17 18.2559L29.5 7.54165V4.33317H4.49999V7.54165L17 18.2559ZM17 23.7438L4.49999 34.458V37.6665H29.5V34.458L17 23.7438Z"
//                                      fill="black"
//                                    />
//                   </svg>
//                   <div className="flex flex-col">
//                   <p>Select timing</p>
//                   <p>00.00.00</p>
//                   </div>
//                   </div>
//                   </div>
//                   </div>
//                   </div>
//                   )}
//                   </div>
//                   <CustomAlert
//                   isOpen={alertOpen}
//                   message={alertMessage}
//                   onClose={() => setAlertOpen(false)}
//                   />
//                   </>
//                   );
//                   };
                  
//                   export default TestInput;
                  
                  














// import React, { useState, useEffect } from 'react';
// import { IoMdClose } from 'react-icons/io';
// import { RiEditLine } from 'react-icons/ri';
// import { createQuiz, createQuestionWithOptions, createQuestionWithOptionsTest, addTestFinal } from '../services/UsersService';
// import Swal from 'sweetalert2';
// import '../styles/Popp.css';
// import NavBar from './Navbar';
// import CustomAlert from './CustomAlert ';

// const TestInput = () => {
//   const [testFinals, setTestFinals] = useState([]);
//   const [selectedSubmodule, setSelectedSubmodule] = useState(null);
//   const [testFinal2, setTestFinal2] = useState({ name: '' });
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [editableTestFinalId, setEditableTestId] = useState(null);
//   const [showAllMore, setShowAllMore] = useState(false);
//   const visibleTestFinals = showAllMore ? testFinals : testFinals.slice(0, 3);

//   const handleSubtestFinalSelect = (moduleId, index) => {
//     const module = testFinals.find(m => m.id === moduleId);
//     if (!module) {
//       console.error('No module found with id:', moduleId);
//       setSelectedSubmodule({ moduleId, index, name: null });
//       return;
//     }
//     const submodule = module.subtestFinal?.[index];
//     if (!submodule) {
//       console.error('No submodule found at index:', index);
//       setSelectedSubmodule({ moduleId, index, name: null });
//       return;
//     }
//     setSelectedSubmodule({ moduleId, index, name: submodule });
//   };

//   const handleKeyPressModify = async (e) => {
//     if (e.key === 'Enter') {
//       // if (selectedSubmodule && selectedSubmodule.moduleId) {
//         try {
//           await addTestFinal(testFinal2, selectedSubmodule.moduleId);
//           const updatedTests = await fetchFinalTests();
//           setTestFinals(updatedTests);
//           setTestFinal2({ name: '' });
//           setEditableTestId(null);
//           setAlertMessage('Test final added successfully!');
//           setAlertOpen(true);
//         } catch (error) {
//           console.error('Failed to add test final:', error);
//           setAlertMessage('Failed to add test final');
//           setAlertOpen(true);
//         }
//       } else {
//         // console.error('Selected submodule is not valid.');
//         setAlertMessage('Please select a valid submodule.');
//         setAlertOpen(true);
//       }
//     // }
//   };


//   // const handleKeyPressModify = async (e) => {
//   //   if (e.key === 'Enter') {
//   //     try {
//   //       await addTestFinal(testFinal2, selectedSubmodule.moduleId);
//   //       const updatedTests = await fetchFinalTests();
//   //       setTestFinals(updatedTests);
//   //       setTestFinal2({ name: '' });
//   //       setEditableTestId(null);
//   //       setAlertMessage('Test final added successfully!');
//   //       setAlertOpen(true);
//   //     } catch (error) {
//   //       console.error('Failed to add test final:', error);
//   //       setAlertMessage('Failed to add test final');
//   //       setAlertOpen(true);
//   //     }
//   //   }
//   // };

//   const handleTestFinalNameChange = (e) => {
//     const { name, value } = e.target;
//     setTestFinal2(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTestFinalName = (testFinal2Id) => {
//     setEditableTestId(testFinal2Id);
//   };

//   const handleDeleteTestFinal = (testFinal2Id) => {
//     // Add your delete logic here
//   };

//   const handleClickAnnuler = () => {
//     setSelectedSubmodule(null);
//   };

//   const handleBlur = () => {
//     setEditableTestId(null);
//   };

//   useEffect(() => {
//     const fetchData2 = async () => {
//       try {
//         const testFinal = await fetchFinalTests();
//         setTestFinals(testFinal || []);
//       } catch (err) {
//         console.error('Error fetching modules:', err);
//       }
//     };
//     fetchData2();
//   }, []);

//   const handleFocus = () => {
//     // Add your logic here
//   };

//   return (
//     <>
//       <NavBar />
//       <div className="flex mt-12">
//         <div className="w-64 bg-white p-4 border-r overflow-auto h-[800px]">
//           {visibleTestFinals.map((testFinal) => (
//             <div key={testFinal.id} className="mb-4">
//               <div className="font-bold relative">
//                 {editableTestFinalId === testFinal.id ? (
//                   <input
//                     onFocus={handleFocus}
//                     type="text"
//                     name="name"
//                     value={testFinal2.name}
//                     onChange={handleTestFinalNameChange}
//                     onBlur={handleBlur}
//                     onKeyPress={handleKeyPressModify}
//                     autoFocus
//                     className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
//                   />
//                 ) : 
//                 (
//                   <div className="flex items-center border border-gray-300 px-4 py-2 mt-2">
//                     <div>{testFinal.name}</div>
//                     <RiEditLine
//                       className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                       onClick={() => handleTestFinalName(testFinal.id)}
//                     />
//                     <IoMdClose
//                       className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleDeleteTestFinal(testFinal.id);
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//           <div className="mb-4 border-t pt-2">
//             <input
//               onFocus={handleFocus}
//               type="text"
//               name="name"
//               value={testFinal2.name}
//               onChange={handleTestFinalNameChange}
//               onKeyPress={handleKeyPressModify}
//               placeholder="Add Test Final..."
//               className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
//             />
//           </div>
//           {testFinals.length > 3 && (
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={() => setShowAllMore(!showAllMore)}
//                 className="bg-orange-500 text-white px-4 py-2 text-sm font-bold"
//               >
//                 {showAllMore ? 'Show Less' : 'Show All'}
//               </button>
//             </div>
//           )}
//         </div>
//         <div className="flex flex-grow p-4">
//           <div className="mx-auto flex flex-col">
//             <div className="w-[55rem] py-6 px-4 mt-10 bg-gray-100 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500 flex flex-col items-start">
//               <p className="font-bold mb-4">
//                 Confirm the <span className="text-orange-500">information</span>
//               </p>
//               <div className="flex bg-center mt-2">
//                 <button
//                   className="bg-orange-500 hover:bg-orange-600 text-black px-3 py-1.5 text-xs font-bold mr-2 flex items-center justify-center"
//                   onClick={() => handleClick(selectedSubmodule.id, selectedSubmodule.title, selectedSubmodule.contenu)}
//                 >
//                   <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M11.8383 1.69134C11.8409 1.31273 11.6173 0.969098 11.2702 0.81793C10.9231 0.666762 10.5193 0.737194 10.2438 0.996948L10.2436 0.996772L4.64107 6.45163L2.79514 4.39589L2.79498 4.39609C2.42 4.07211 1.85821 4.09371 1.50921 4.44553L1.1304 4.82635C0.789088 5.17017 0.759138 5.71504 1.06071 6.0942L1.06055 6.09432L4.09103 9.90255L4.09117 9.90244C4.27012 10.1282 4.54242 10.2599 4.83051 10.2599C5.1186 10.2599 5.3909 10.1282 5.56984 9.90244L5.57 9.90257L11.6309 2.28609L11.6307 2.28598C11.7655 2.11711 11.8387 1.90738 11.8383 1.69134Z"
//                       fill="black"
//                     />
//                   </svg>
//                   <span>Yes</span>
//                 </button>
//                 <button
//                   className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1.5 text-xs font-bold"
//                   onClick={handleClickAnnuler}
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//             <div className="flex flex-col items-center mt-10 space-y-10">
//               <div className="relative w-[19rem] bg-gray-200 border-2 border-gray-500 focus-within:ring-1 focus-within:ring-blue-500">
//                 <p className="text-center font-bold mb-2">Question 1/10</p>
//               </div>
//               <div className="flex flex-col gap-1">
//                 <div className="relative w-[50rem] bg-gray-50 border-2 border-gray-200 focus-within:ring-1 focus-within:ring-blue-500">
//                   <p className="flex text-center font-bold mb-2">What is your experience?</p>
//                   <RiEditLine className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500" />
//                 </div>
//                 <div className="relative w-[50rem] p-8 bg-gray-200 border-12 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
//                   <button
//                     className="absolute left-72 text-gray-400 bottom-[7rem] w-[10rem] bg-gray-200 border-2 border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 text-center font-bold mb-2"
//                     onClick={() => {
//                       alert('Ajouter une nouvelle question');
//                     }}
//                   >
//                     Add option(+)
//                   </button>
//                   <ul className="text-left list-disc ml-12">
//                     <label className="flex items-center">
//                       <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                       multiple-choice questions
//                     </label>
//                     <label className="flex items-center">
//                       <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                       Answer all questions
//                     </label>
//                     <label className="flex items-center">
//                       <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                       No penalty for incorrect answers
//                     </label>
//                     <label className="flex items-center">
//                       <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                       If you navigate away from the test page during the test, you may lose your responses
//                     </label>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="relative flex flex-row w-[35rem] p-8 mx-auto mt-10 bg-gray-400 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
//               <div className="mx-auto">
//                 <svg
//                   className="absolute top-1/2 left-44 transform -translate-y-1/2"
//                   width="34"
//                   height="42"
//                   viewBox="0 0 34 42"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M0.333328 0.166504H33.6667V9.45805L20.2012 20.9998L33.6667 32.5417V41.8332H0.333328V32.5417L13.7987 20.9998L0.333328 9.45805V0.166504ZM17 18.2559L29.5 7.54165V4.33317H4.49999V7.54165L17 18.2559ZM17 23.7438L4.49999 34.458V37.6665H29.5V34.458L17 23.7438Z"
//                     fill="black"
//                   />
//                 </svg>
//                 <div className="flex flex-col">
//                   <p>Select timing</p>
//                   <p>00.00.00</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <CustomAlert
//         isOpen={alertOpen}
//         message={alertMessage}
//         onClose={() => setAlertOpen(false)}
//       />
//     </>
//   );
// };

// export default TestInput;





// import React, { useState, useEffect } from 'react';
// import { IoMdClose } from 'react-icons/io';
// import { RiEditLine, RiTimelineView } from 'react-icons/ri';
// import { createQuiz, createQuestionWithOptions, createQuestionWithOptionsTest, addTestFinal } from '../services/UsersService';
// import Swal from 'sweetalert2';
// import '../styles/Popp.css';
// import ModuleInput from './ModuleInput';
// import NavBar from './Navbar';
// import CustomAlert from './CustomAlert ';

// const TestInput = () => {
//   const [testFinals, setTestFinals] = useState([]);
//   const [selectedSubmodule, setSelectedSubmodule] = useState(null);
//   const [testFinal2, setTestFinal2] = useState({ name: '' });
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [editableTestFinalId, setEditableTestId] = useState(null);
//   const [showAllMore, setShowAllMore] = useState(false);
//   const visibleTestFinals = showAllMore ? testFinals : testFinals.slice(0, 3);

//   const handleSubtestFinalSelect = (moduleId, index) => {
//     const module = testFinal.find(m => m.id === moduleId);
//     if (!module) {
//       console.error('No module found with id:', moduleId);
//       setSelectedSubmodule({ moduleId, index, name: null });
//       return;
//     }
//     const submodule = module.subtestFinal?.[index];
//     if (!submodule) {
//       console.error('No submodule found at index:', index);
//       setSelectedSubmodule({ moduleId, index, name: null });
//       return;
//     }
//     setSelectedSubmodule({ moduleId, index, name: submodule });
//   };

//   const handleKeyPressModify = async (e) => {
//     // Add your logic here
//   };

//   const handleTestFinalNameChange = async (e) => {
//     const { name, value } = e.target;
//     setTestFinal2(prev => ({ ...prev, [name]: value }));
    
//   };

//   const handleTestFinalName = (testFinal2Id) => {
//     setEditableTestId(testFinal2Id);
//   };

//   const handleDeleteTestFinal = (testFinal2Id) => {
//     // Add your logic here
//   };

//   const handleClickAnnuler = async () => {
//     console.log(selectedSubmodule?.name);
//     setSelectedSubmodule({
//       title: selectedSubmodule?.name,
//       contenu: selectedSubmodule?.contenu,
//     });
//   };

//   const handleBlur = (testFinalId) => {
//     setEditableTestId(null);
//   };

//   useEffect(() => {
//     const fetchData2 = async () => {
//       try {
//         const modules1 = await fetchFinalTests(); 
//         setTestFinals(modules1 || []);
//       } catch (err) {
//         console.error('Error fetching modules:', err);
//       }
//     };
//     fetchData2();
//   }, []);

//   const handleFocus = () => {
//     // Add your logic here
//   };

//   return (
//     <>
//       <NavBar />
//       <div className="flex mt-12 ">
//         <div className="w-64 bg-white p-4 border-r overflow-auto h-[800px]">
//           {visibleTestFinals.map((testFinal) => (
//             <div key={testFinal.id} className="mb-4">
//               <div className="font-bold relative">
//                 {editableTestFinalId === testFinal.id ? (
//                   <input
//                     onFocus={handleFocus}
//                     type="text"
//                     name="name"
//                     value={testFinal2.name}
//                     onChange={handleTestFinalNameChange}
//                     onBlur={() => handleBlur(testFinal.id)}
//                     onKeyPress={handleKeyPressModify}
//                     autoFocus
//                     className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
//                   />
//                 ) : (
//                   <div className="flex items-center border border-gray-300 px-4 py-2 mt-2">
//                     <div>{testFinal2.name}</div>
//                     <RiEditLine
//                       className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                       onClick={() => handleTestFinalName(testFinal2.id)}
//                     />
//                     <IoMdClose
//                       className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleDeleteTestFinal(testFinal2.id);
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//           <div className="mb-4 border-t pt-2">
//             <input
//               onFocus={handleFocus}
//               type="text"
//               name="name"
//               value={testFinal2.name}
//               onChange={handleTestFinalNameChange}
//               onKeyPress={handleKeyPressModify}
//               placeholder="Add Test Final..."
//               className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
//             />
//           </div>
//           {testFinals.length > 3 && (
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={() => setShowAllMore(!showAllMore)}
//                 className="bg-orange-500 text-white px-4 py-2 text-sm font-bold"
//               >
//                 {showAllMore ? 'Show Less' : 'Show All'}
//               </button>
//             </div>
//           )}
//         </div>
//         <div className="flex flex-grow p-4">
//           <div className="mx-auto flex flex-col">
//             <div className="w-[55rem] py-6 px-4 mt-10 bg-gray-100 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500 flex flex-col items-start">
//               <p className="font-bold mb-4">
//                 Confirm the <span className="text-orange-500">information</span>
//               </p>
//               <div className="flex bg-center mt-2 ">
//                 <button
//                   className="bg-orange-500 hover:bg-orange-600 text-black px-3 py-1.5 text-xs font-bold mr-2 flex items-center justify-center"
//                   onClick={() => handleClick(selectedSubmodule.id, selectedSubmodule.title, selectedSubmodule.contenu)}
//                 >
//                   <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M11.8383 1.69134C11.8409 1.31273 11.6173 0.969098 11.2702 0.81793C10.9231 0.666762 10.5193 0.737194 10.2438 0.996948L10.2436 0.996772L4.64107 6.45163L2.79514 4.39589L2.79498 4.39609C2.42 4.07211 1.85821 4.09371 1.50921 4.44553L1.1304 4.82635C0.789088 5.17017 0.759138 5.71504 1.06071 6.0942L1.06055 6.09432L4.09103 9.90255L4.09117 9.90244C4.27012 10.1282 4.54242 10.2599 4.83051 10.2599C5.1186 10.2599 5.3909 10.1282 5.56984 9.90244L5.57 9.90257L11.6309 2.28609L11.6307 2.28598C11.7655 2.11711 11.8387 1.90738 11.8383 1.69134Z"
//                       fill="black"
//                     />
//                   </svg>
//                   <span>Yes</span>
//                 </button>
//                 <button
//                   className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1.5 text-xs font-bold"
//                   onClick={handleClickAnnuler}
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//             <div className="flex flex-col items-center mt-10 space-y-10">
//               <div className="relative w-[19rem] bg-gray-200 border-2 border-gray-500 focus-within:ring-1 focus-within:ring-blue-500">
//                 <p className="text-center font-bold mb-2">Question 1/10</p>
//               </div>
//               <div className="flex flex-col gap-1">
//               <div className="relative w-[50rem] bg-gray-50 border-2 border-gray-200 focus-within:ring-1 focus-within:ring-blue-500">
//                 <p className="flex text-center font-bold mb-2">What is your experience?</p>
//                 <RiEditLine className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500" />
//               </div>
//               <div className="relative w-[50rem] p-8 bg-gray-200 border-12 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
//                 <button
//                   className="absolute left-72 text-gray-400 bottom-[7rem] w-[10rem] bg-gray-200 border-2 border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 text-center font-bold mb-2"
//                   onClick={() => {
//                     alert('Ajouter une nouvelle question');
//                   }}
//                 >
//                   Add option(+)
//                 </button>
//                 <ul className="text-left list-disc ml-12">
//                 <label className="flex items-center">
//                   <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                   multiple-choice questions
//                 </label>
//                 <label className="flex items-center">
//                   <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                   Answer all questions
//                 </label>
//                 <label className="flex items-center">
//                   <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                   No penalty for incorrect answers
//                 </label>
//                 <label className="flex items-center">
//                   <input type="checkbox" className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500" />
//                   If you navigate away from the test page during the test, you may lose your responses
//                 </label>
//               </ul>
//                       </div>
//             </div>
//             </div>
//             <div className="relative flex flex-row w-[35rem] p-8 mx-auto mt-10 bg-gray-400 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
//               <div className="mx-auto">
//                 <svg
//                   className="absolute top-1/2 left-44 transform -translate-y-1/2"
//                   width="34"
//                   height="42"
//                   viewBox="0 0 34 42"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M0.333328 0.166504H33.6667V9.45805L20.2012 20.9998L33.6667 32.5417V41.8332H0.333328V32.5417L13.7987 20.9998L0.333328 9.45805V0.166504ZM17 18.2559L29.5 7.54165V4.33317H4.49999V7.54165L17 18.2559ZM17 23.7438L4.49999 34.458V37.6665H29.5V34.458L17 23.7438Z"
//                     fill="black"
//                   />
//                 </svg>
//                 <div className="flex flex-col">
//                   <p>Select timing</p>
//                   <p>00.00.00</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <CustomAlert
//         isOpen={alertOpen}
//         message={alertMessage}
//         onClose={() => setAlertOpen(false)}
//       />
//     </>
//   );
// };

// export default TestInput;











// import React, { useState, useEffect } from 'react';
// import { IoMdClose } from 'react-icons/io';
// import { RiEditLine,RiTimelineView } from 'react-icons/ri';
// import { createQuiz, createQuestionWithOptions, createQuestionWithOptionsTest, addTestFinal, fetchFinalTests } from '../services/UsersService';
// import Swal from 'sweetalert2';
// import '../styles/Popp.css';  // Assurez-vous que les mêmes styles sont importés
// import ModuleInput from './ModuleInput';
// import NavBar from './Navbar';
// import CustomAlert from './CustomAlert ';
// const TestInput = () => {
  
//     const [testFinals, setTestFinals] = useState([]);
//     const [selectedSubmodule, setSelectedSubmodule] = useState(null);
//     const [testFinal2, settestFinal2] = useState({ name: '' });
//     const [alertOpen, setAlertOpen] = useState(false);
//    const [alertMessage, setAlertMessage] = useState('');
  
//     const [editableTestFinalId, setEditabelTestId] = useState(null);

//     const handleSubtestFinalelect = (moduleId, index) => {
//     const module = testFinal.find(m => m.id === moduleId);

//     // First, check if the module exists
//     if (!module) {
//         console.error('No module found with id:', moduleId);
//         setSelectedSubmodule({ moduleId, index, name: null });
//         return;  // Exit the function if no module is found
//     }

//     // Use optional chaining to check if subtestFinal exist and the specific index is valid
//     const submodule = module.subtestFinal?.[index];
//     if (!submodule) {
//         console.error('No submodule found at index:', index);
//         setSelectedSubmodule({ moduleId, index, name: null });
//         return;  // Exit the function if no submodule is found at the specified index
//     }

//     // Set the selected submodule if everything is valid
//     setSelectedSubmodule({ moduleId, index, name: submodule });
//     };

   
//     const handleKeyPressModify = async (e) => {
     
//     };

//     const handleTestFinalNameChange = async (e) => {
//       const { name, value } = e.target;
  
//       // Correctly set the updated module
//       setModule2(prev => ({ ...prev, [name]: value }));
  
    
//     };



//     const handleSubmoduleNameChange = (moduleId, index, newName, newContenu) => {
//     const updatedtestFinal = testFinal.map(module => {
//         if (module.id === moduleId) {
//             const updatedSubtestFinal = module.subtestFinal.map((submodule, idx) => {
//                 if (idx === index) {
//                     // Update both title and contenu for the submodule at the specified index
//                     return { ...submodule, title: newName, contenu: newContenu };
//                 }
//                 return submodule;
//             });
//             // Return the updated module with the newly modified subtestFinal array
//             return { ...module, subtestFinal: updatedSubtestFinal };
//         }
//         return module;
//     });

//     settestFinal(updatedtestFinal);  // Update the main testFinal state
//     // Update the selected submodule with the whole submodule object
//     const updatedSubmodule = updatedtestFinal.find(m => m.id === moduleId).subtestFinal[index];
//     setSelectedSubmodule({ moduleId, index, name: updatedSubmodule });
//     };

//     const handleTestFinalName = (testFinal2Id) => {
//       setEditabelTestId(testFinal2Id);
//     };

//     const handleDeleteTestFinal = (testFinal2Id) => {
//       // setEditabelTestId(testFinal2Id);
//     };
//     const handleClickAnnuler = async () => {
//       console.log(submodule.title)
//       setsubmodulupdate({
//         title: submodule.title,
//         contenu: submodule.contenu,
//       });
//     setVal("false")
       
      
//     };

//     const handleBlur = (testFinalId) => {
//       // e.target.blur(); // Not necessary to call blur() here as onBlur is called because it's already blurring
//       // window.location.reload(); // Uncomment if you really need to reload the entire page (not recommended in most SPAs)
//       setEditabelTestId(null);
//   };

//     useEffect(() => {
    
//         const fetchData2 = async () => {
//           try { 
//             const testFinal1 = await getModulesAdmin(); // Supposons que getFormationsMore() soit une fonction qui récupère les données des modules depuis l'API
//             setModules(modules1 || []);
//             console.log("hiiii"+modules1);
//           } catch (err) {
//             console.error("Une erreur s'est produite lors de la récupération des modules :", err);
            
//           } 
//         };
    
//         fetchData2(); 
//       }, []); 
//       console.log(selectedSubmodule)
//       const handleFocus = () => {
     
//       };
//       const [showAllMore, setShowAllMore] = useState(false);
//       const visibleTestFinal= showAllMore ? testFinals : testFinals.slice(0, 3);
//     return (
//         <>
//            <NavBar />
// <div className="w-64 bg-white p-4 border-r overflow-auto h-[1100px]">
//   {visibleTestFinal.map((testFinal) => (
//     <div key={testFinal.id} className="mb-4">
//       <div className="font-bold relative">
//         {editableTestFinalId === testFinal.id ? (
//           <input
//             onFocus={handleFocus}
//             type="text"
//             name="name"
//             value={testFinal2.name}
//             onChange={(e) => handleTestFinalNameChange(e, testFinal.id)}
//             onBlur={() => handleBlur(testFinal.id)}
//             onKeyPress={(e) => handleKeyPressModify(e, testFinal.id)}
//             autoFocus
//             className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
//           />
//         ) : (
//           <div className="flex items-center border border-gray-300 px-4 py-2 mt-2">
//             <div>{testFinal2.name}</div>
//             <RiEditLine
//               className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
//               onClick={() => handleTestFinalName(testFinal2.id)}
//             />
//             <IoMdClose
//               className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//               onClick={(e) => {
//                 e.preventDefault(); // Prevent default button click behavior
//                 handleDeleteTestFinal(testFinal2.id);
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   ))}
//   <div className="mx-auto flex flex-col">
//     <div className="w-[55rem] py-6 px-4 mt-10 bg-gray-100 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500 flex flex-col items-start">
//       <p className="font-bold mb-4">
//         Confirm the <span className="text-orange-500">information</span>
//       </p>
//       <p>
//         In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document
//       </p>
//       <div className="flex mt-2">
//         <button
//           className="bg-orange-500 hover:bg-orange-600 text-black px-3 py-1.5 text-xs font-bold mr-2 flex items-center justify-center"
//           onClick={() => handleClick(submodule.id, submodulupdate.title, submodulupdate.contenu)}
//         >
//           <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path
//               fillRule="evenodd"
//               clipRule="evenodd"
//               d="M11.8383 1.69134C11.8409 1.31273 11.6173 0.969098 11.2702 0.81793C10.9231 0.666762 10.5193 0.737194 10.2438 0.996948L10.2436 0.996772L4.64107 6.45163L2.79514 4.39589L2.79498 4.39609C2.42 4.07211 1.85821 4.09371 1.50921 4.44553L1.1304 4.82635C0.789088 5.17017 0.759138 5.71504 1.06071 6.0942L1.06055 6.09432L4.09103 9.90255L4.09117 9.90244C4.27012 10.1282 4.54242 10.2599 4.83051 10.2599C5.1186 10.2599 5.3909 10.1282 5.56984 9.90244L5.57 9.90257L11.6309 2.28609L11.6307 2.28598C11.7655 2.11711 11.8387 1.90738 11.8383 1.69134Z"
//               fill="black"
//             />
//           </svg>
//           <span>Yes</span>
//         </button>
//         <button
//           className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1.5 text-xs font-bold"
//           onClick={handleClickAnnuler}
//         >
//           No
//         </button>
//       </div>
//     </div>

//     <div className="flex flex-col items-center mt-10 space-y-10">
//       <div className="relative w-[19rem] bg-gray-200 border-2 border-gray-500 focus-within:ring-1 focus-within:ring-blue-500">
//         <p className="text-center font-bold mb-2">Question 1/10</p>
//       </div>
//       <div className="relative w-[45rem] bg-gray-50 border-2 border-gray-200 focus-within:ring-1 focus-within:ring-blue-500">
//         <p className="flex text-center font-bold mb-2">What is your experience?</p>
//         <RiEditLine className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500" />
//       </div>
//       <div className="relative w-[50rem] p-8 bg-gray-200 border-12 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
//         <button
//           className="absolute left-64 text-gray-400 bottom-[7rem] w-[10rem] bg-gray-200 border-2 border-gray-400 focus-within:ring-1 focus-within:ring-blue-500 text-center font-bold mb-2"
//           onClick={() => {
//             alert('Ajouter une nouvelle question');
//           }}
//         >
//           Add option(+)
//         </button>
//         <ul className="text-left list-disc ml-12">
//           <li>multiple-choice questions</li>
//           <li>Answer all questions</li>
//           <li>No penalty for incorrect answers</li>
//           <li>If you navigate away from the test page during the test, you may lose your responses</li>
//         </ul>
//       </div>
//     </div>
//     <div className="relative flex flex-row w-[35rem] p-8 mx-auto mt-10 bg-gray-400 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
//       <div className="mx-auto">
//         <svg
//           className="absolute top-1/2 left-44 transform -translate-y-1/2"
//           width="34"
//           height="42"
//           viewBox="0 0 34 42"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M0.333328 0.166504H33.6667V9.45805L20.2012 20.9998L33.6667 32.5417V41.8332H0.333328V32.5417L13.7987 20.9998L0.333328 9.45805V0.166504ZM17 18.2559L29.5 7.54165V4.33317H4.49999V7.54165L17 18.2559ZM17 23.7438L4.49999 34.458V37.6665H29.5V34.458L17 23.7438Z"
//             fill="black"
//           />
//         </svg>

//         <div className="flex flex-col">
//           <p>Select timing</p>
//           <p>00.00.00</p>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="mb-4 border-t pt-4">
//         <input
//          onFocus={handleFocus}
//           type="text"
//           name="name"
//       value={testFinal2.name}
//       onChange={(e) => handleTestFinalNameChange}
//             onKeyPress={(e) => handleKeyPressModify}
//                placeholder= " Add Test Final..."
//           className="w-full border border-gray-300 bg-gray-200 rounded px-4 py-2"
//         />
//       </div>
//       {testFinals.length > 3 && (
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
// </div>

  

//         </>
//     );
// };

// export default TestInput;