import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiEditLine,RiTimelineView } from 'react-icons/ri';
import { addTestFinal,createQuestionWithOptionsTest,updateTest } from '../services/UsersService';
import Swal from 'sweetalert2';
import '../styles/Popp.css';  
import TestFinal from '../views/TestFinal';

const TestFinalInput = ({Timer}) => {
    const [expanded, setExpanded] = useState(false);
    const [showTest, setShowTest] = useState(true); 
    const [Completed, setCompleted] = useState(false);
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');
    const [savedTime, setSavedTime] = useState(''); 
    // const [editablQuestionId, setEditableQuestionId] = useState(null);
    const [questions, setQuestions] = useState([
        { id: 1, text: 'Question 1', options: [] },
        // Add more questions as needed
      ]);
    const [question ,setQuestion] = useState([]);
    const [editedQuestionText, setEditedQuestionText] = useState('');
    const [editableQuestionId, setEditableQuestionId] = useState(null);
    const [options, setOptions] = useState([]);
    const [option, setOption] = useState(['']);
      

    const startTest = () => {
        const selectedTimeInSeconds = parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second);
        if (selectedTimeInSeconds <= 0) {
            alert('Please select a valid time before starting the test.');
            return;
        }
        //console.log(Selected time: ${hour}:${minute}:${second});
        // Set timer and start test logic here
        setShowTest(false);
    };

    const handleClick1 = async (hour, minute, second) => {

const jso = {
    "timeLimit": Number(minute)
}
  console.log(jso)
            try {
              const reponse = await updateTest(jso);
          //    const updatedTests = await fetchFinalTests();
             // setTestFinals(updatedTests);
            //   setTestFinal2({ name: '' });
            //   setEditableTestId(null);
            //   setAlertMessage('Test final added successfully!');
            //   setAlertOpen(true);
            } catch (error) {
            //  console.error('Failed to add test final:', error);
            //   setAlertMessage('Failed to add test final');
            //   setAlertOpen(true);
            }
          
            const selectedTime = `${hour}:${minute}:${second}`;

        console.log('Selected time:', selectedTime);
    
        setSavedTime(selectedTime); 
        Swal.fire({
          icon: 'success',
          title: 'Time Saved',
          text: `Selected Time: ${selectedTime}`, // Utilisation des backticks pour le template string
          timer: 3000,
      });
      
    };
    
   
    const handleChangeHour = (event) => {
        const { value } = event.target;
        if (value >= 0 && value <= 23) {
            setHour(value.padStart(2, ''));
        }
    };

    const handleChangeMinute = (event) => {
        const { value } = event.target;
        if (value >= 0 && value <= 59) {
            setMinute(value.padStart(2, ''));
        }
    };

    const handleChangeSecond = (event) => {
        const { value } = event.target;
        if (value >= 0 && value <= 59) {
            setSecond(value.padStart(2, '00'));
        }
    };
      const handleClickAnnuler = () => {
        // Implement your handleClickAnnuler logic here
      };

    
    const handleTestFinal = async () => {

        const jso = {
                            "questionText": editedQuestionText,
                "options":[
                    {
                        "text": option,
                    },
                    {
                        "text": option,
                    }
                ] ,
                "correctOption": 9 
        }
console.log(jso)
        try {

            const reponse = await createQuestionWithOptionsTest(jso)
    
    
          // const response = await createQuestionWithOptionsTest(testId, questionData);
          console.log('Question created successfully:', reponse);
    
          Swal.fire({
            icon: 'success',
            title: 'Test Created',
            text: 'The test has been successfully created.',
          });
        } catch (error) {
          console.error('Failed to create test:', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Create Test',
            text: 'An error occurred while trying to create the test. Please try again later.',
          });
        }
      };
    
      const handleEditTestName = (questionId) => {
        const question = questions.find((q) => q.id === questionId);
        setEditedQuestionText(question.text);
        setEditableQuestionId(questionId);
      };
    
      const handleSaveQuestionText = (questionId) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === questionId ? { ...question, text: editedQuestionText } : question
          )
        );
        setEditableQuestionId(null);
      };


    const handleAddOption = () => {
        setOptions([...options, '']); // Add an empty string to the options array
    };

    const handleOptionChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value; // Update the option at the given index
        setOptions(newOptions);
    };


return (
    <>
        {showTest ? (
            <div className='mx-auto flex flex-col'>
                <div className="w-[55rem] py-6 px-4 mt-10 bg-gray-100 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500 flex flex-col items-start">
                    <p className="font-bold mb-4">Confirm the <span className='text-orange-500'>information</span></p>
                    <div className="flex mt-2">
                        <button
                            className="bg-orange-500 hover:bg-orange-600 text-black px-3 py-1.5 text-xs font-bold mr-2 flex items-center justify-center"
                            onClick={() => handleClick1(hour, minute, second)}
                        >
                            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.8383 1.69134C11.8409 1.31273 11.6173 0.969098 11.2702 0.81793C10.9231 0.666762 10.5193 0.737194 10.2438 0.996948L10.2436 0.996772L4.64107 6.45163L2.79514 4.39589L2.79498 4.39609C2.42 4.07211 1.85821 4.09371 1.50921 4.44553L1.1304 4.82635C0.789088 5.17017 0.759138 5.71504 1.06071 6.0942L1.06055 6.09432L4.09103 9.90255L4.09117 9.90244C4.27012 10.1282 4.54242 10.2599 4.83051 10.2599C5.1186 10.2599 5.3909 10.1282 5.56984 9.90244L5.57 9.90257L11.6309 2.28609L11.6307 2.28598C11.7655 2.11711 11.8387 1.90738 11.8383 1.69134Z" fill="black"/>
                            </svg>
                            <span>Yes</span>
                        </button>

                        <button className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1.5 text-xs font-bold" onClick={() => handleClickAnnuler()}>No</button>
                    </div>
                </div>

                <div className="py-2 px-12">  
                    <div className="relative w-[19rem] mx-auto mt-10 bg-gray-100 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
                        <p className="text-center font-bold mb-2">Final Tests 6 UX/ UI Course</p>
                        <RiEditLine className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500" />
                    </div>
                    
                    <div className='relative w-[45rem] p-4 mx-auto mt-10 bg-gray-100 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500'>
                        <p>You have 10 minutes to complete the test</p>
                        <RiEditLine className="absolute top-8 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500" />
                        <br/>
                        <ul className="text-left list-disc ml-12">
                            <li>multiple-choice questions</li>
                            <li>Answer all questions</li>
                            <li>No penalty for incorrect answers</li>
                            <li>If you navigate away from the test page during the test, you may lose your responses</li>
                        </ul>
                    </div>
                    <button className="relative flex w-[8rem] mx-auto mt-8 bg-orange-500 text-black px-6 py-2 text-center font-bold" onClick={startTest}>
                        {Completed ? 'Continue Test' : 'Start Test'}
                    </button>
                    <div className='relative flex flex-row w-[35rem] p-8 mx-auto mt-10 bg-gray-400 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500'>
                        <div className='mx-auto'>
                            {/* <svg className='absolute top-1/2 left-44 transform -translate-y-1/2' width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.333328 0.166504H33.6667V9.45805L20.2012 20.9998L33.6667 32.5417V41.8332H0.333328V32.5417L13.7987 20.9998L0.333328 9.45805V0.166504ZM17 18.2559L29.5 7.54165V4.33317H4.49999V7.54165L17 18.2559ZM17 23.7438L4.49999 34.458V37.6665H29.5V34.458L17 23.7438Z" fill="black"/>
                            </svg> */}
                            <svg className='absolute mt-3 top-1/2 left-[5rem] transform -translate-y-1/2' width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.333328 0.166504H33.6667V9.45805L20.2012 20.9998L33.6667 32.5417V41.8332H0.333328V32.5417L13.7987 20.9998L0.333328 9.45805V0.166504ZM17 18.2559L29.5 7.54165V4.33317H4.49999V7.54165L17 18.2559ZM17 23.7438L4.49999 34.458V37.6665H29.5V34.458L17 23.7438Z" fill="black"/>
                            </svg>
                            <label className="font-bold">Select Timing (HH:MM:SS)</label>
                                    <div className="flex mt-2">
                                        <input
                                            type="number"
                                            value={hour}
                                            onChange={handleChangeHour}
                                            min="0"
                                            max="23"
                                            className="border-2 border-gray-300 rounded-md px-3 py-1.5 mr-2 w-[5rem] focus:outline-none focus:border-blue-500"
                                        />
                                        <span>:</span>
                                        <input
                                            type="number"
                                            value={minute}
                                            onChange={handleChangeMinute}
                                            min="0"
                                            max="59"
                                            className="border-2 border-gray-300 rounded-md px-3 py-1.5 mx-2 w-[5rem] focus:outline-none focus:border-blue-500"
                                        />
                                        <span>:</span>
                                        <input
                                            type="number"
                                            value={second}
                                            onChange={handleChangeSecond}
                                            min="0"
                                            max="59"
                                            className="border-2 border-gray-300 rounded-md px-3 py-1.5 ml-2 w-[5rem] focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex flex-grow p-4">
                <div className="mx-auto flex flex-col">
                    <div className="w-[55rem] py-6 px-4 mt-10 bg-gray-100 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500 flex flex-col items-start">
                        <p className="font-bold mb-4">
                            Confirm the <span className="text-orange-500">information</span>
                        </p>
                        <div className="flex bg-center mt-2">
                            <button
                                className="bg-orange-500 hover:text-black px-3 py-1.5 text-xs font-bold mr-2 flex items-center justify-center"
                                onClick={() => handleTestFinal()}
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
                        {questions.map((question) => (
                            <div key={question.id} className="relative w-[19rem] mx-auto mt-2 bg-gray-100 border-2 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500 flex items-center">
                            {editableQuestionId === question.id ? (
                                <input
                                type="text"
                                value={editedQuestionText}
                                onChange={(e) => setEditedQuestionText(e.target.value)}
                                className="flex-1 p-2"
                                />
                            ) : (
                                <p className="flex-1 text-center">{question.text}</p>
                            )}
                            {editableQuestionId === question.id ? (
                                <button onClick={() => handleSaveQuestionText(question.id)} className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500">
                                Save
                                </button>
                            ) : (
                                <RiEditLine
                                onClick={() => handleEditTestName(question.id)}
                                className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                />
                            )}   </div>
                         ))}
                        
                        <div className="relative w-[50rem] p-8 bg-gray-200 border-12 border-gray-100 focus-within:ring-1 focus-within:ring-blue-500">
                                    <button
                                        className="relative  left-72 text-gray-400 bottom-[1rem] w-[10rem] bg-gray-200 border-2 border-gray-400 focus-within text-center font-bold mb-2"
                                        onClick={handleAddOption}
                                    >
                                        Add option(+)
                                    </button>
                                    <ul className="text-left list-disc ml-12">
                                        {options.map((option, index) => (
                                            // <li key={index} className="mb-2">
                                                <label className="flex mt-3 items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="mr-2 form-checkbox border-gray-400 text-blue-500 focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <input
                                                        type="text"
                                                        // className="ml-2 border-2 border-gray-400 p-1"
                                                        value={option}
                                                        onChange={(event) => handleOptionChange(index, event)}
                                                        placeholder="Enter option text"
                                                    />
                                                </label>
                                            // </li>
                                        ))}
                                    </ul>
                        </div>

                        </div>
                    </div>
{/* 
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
                                <p>{${hour}:${minute}:${second}}</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        )}
    </>
);
};

export default TestFinalInput;