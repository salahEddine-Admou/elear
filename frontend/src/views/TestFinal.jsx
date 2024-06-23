import React, { useState, useEffect } from 'react';
import "../App.css";
import { getTest, setEndFormation } from '../services/UsersService'; 
import Swal from 'sweetalert2';
import { useNavigate, Link } from "react-router-dom"; 
import { deleteInscr } from '../services/UsersService';
const TestFinal = ({allSubmodulesComplete,  Timer}) => {
    const [questions, setQuestions] = useState([]); 
    const [title, setTitle] = useState('');
    const [testCompleted, setTestCompleted] = useState(false);
    const [Completed, setCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const [timer, setTimer] = useState(-1);
    const [isActive, setIsActive] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showTest, setShowTest] = useState(false); 

    
    useEffect(() => {
        console.log(Timer)
        setTimer(Timer);
       console.log(localStorage.getItem('answers'));
    }, []);
    useEffect(() => {
        let interval = null;
        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => {
                    const newTimer = prevTimer - 1;
                    const currentTime = Date.now();
                    localStorage.setItem('timer', newTimer);
                    localStorage.setItem('lastUpdated', currentTime);  // Stocker l'heure de la dernière mise à jour
                    return newTimer;
                });
            }, 1000);
        } else if (timer === 0) {
            localStorage.setItem('st', "");
            getTime();
            clearInterval(interval);
            setIsActive(false);
            const fois = localStorage.getItem('fois');
            if(Number(fois)<3){
                setShowTest(false);
                getTime();
            }
            if(Number(fois)===3){
                setShowTest(false);
                localStorage.setItem('name', "");
               
            }
            localStorage.setItem('currentQuestionIndex',0)
            const savedCurrentQuestionIndex = parseInt( localStorage.getItem('currentQuestionIndex'));
                                console.log(savedCurrentQuestionIndex);
                                setCurrentQuestionIndex(savedCurrentQuestionIndex); 
            calculateScore();
        }
        return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
    }, [isActive, timer]);

    
    
    useEffect(() => {
        if (localStorage.getItem('st') === "true") {
        const savedTimer = parseInt(localStorage.getItem('timer'), 10);
        const lastUpdated = parseInt(localStorage.getItem('lastUpdated'), 10);
        const savedCurrentQuestionIndex = localStorage.getItem('currentQuestionIndex');
        const currentTime = Date.now();
        if (!isNaN(savedTimer) && lastUpdated) {
            const timeElapsed = Math.floor((currentTime - lastUpdated) / 1000); 
            const updatedTimer = Math.max(savedTimer - timeElapsed, 0);
            setTimer(updatedTimer);
                setCurrentQuestionIndex(savedCurrentQuestionIndex);
            if (updatedTimer > 0) {
                setIsActive(true);  
            } else {
                setIsActive(false);
            }
        }
    }
    }, []);
  
        

    const startTimer = () => setIsActive(true);
    const pauseTimer = () => setIsActive(false);


   
useEffect(() => {
   

    const fetchQuestions = async () => {
        try {
            const ste = localStorage.getItem("st");
            setCompleted(ste);
            const response = await getTest();
            setTitle(response.title);
            setQuestions(response.questions);
            localStorage.setItem('questions', response.questions);
            setUserAnswers(Array(response.questions.length).fill(null));
        } catch (error) {
            console.error('Failed to fetch questions', error);
        }
    };

    fetchQuestions();
}, []);


const getTime = async () => {

try {
    const response = await getTest();
    setTimer(response.timeLimit * 60);
    setIsActive(true);
} catch (error) {
    console.error('Failed to fetch initial timer', error);
}
}

    const startTest = async () => {
        setIsActive(false);
      if (allSubmodulesComplete) {
       
                                if (localStorage.getItem('st') === "true") {
                                    setIsActive(true);
                                const savedCurrentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10);
                                console.log(savedCurrentQuestionIndex);
                                setCurrentQuestionIndex(savedCurrentQuestionIndex);  // Repositionne l'index de la question
                                setUserAnswers(Array(questions.length).fill(null));
                                setShowTest(true);
                                setTestCompleted(false);
                                localStorage.setItem('st', true);
                                
                            localStorage.setItem('name', title);
                                }else{
                                    localStorage.setItem('currentQuestionIndex', "0");
                            const fois = localStorage.getItem('fois');
                            console.log(fois); // It will log the value as a string, e.g., "0"

                    if (Number(fois) === 0) {
                                    console.log("hii");
                                    localStorage.setItem('fois', "1");
                                    setShowTest(true);
                                setTestCompleted(false); 
                                 setIsActive(true);
                                localStorage.setItem('st', true);
                                }
                            
                                if (Number(fois) === 3) {
                                   
                                    setShowTest(false);
                                setTestCompleted(true); 
                                localStorage.setItem('st', "true");
                                }
                            
                               if (Number(fois) > 0 && Number(fois) < 3) {    
                                const lastAttemptTime = localStorage.getItem('lastAttemptTime');
                                const currentTime = new Date().getTime();
                            const timePassed = currentTime - lastAttemptTime;
                            if (timePassed >= 60 * 1000) {
                                getTime();




    
                                setShowTest(true);
                                setTestCompleted(false); 
                                localStorage.setItem('fois', String(Number(fois) + 1));
                                localStorage.setItem('st', true);
                            } else {
                                const timeLeft = 60 * 1000  - timePassed;
                                //const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
                                const minutesLeft = Math.floor(timeLeft / (60 * 1000));
                                const secondesLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);
                                setShowTest(false);
                                 setTestCompleted(false); 
                                Swal.fire({
                                    title: '24h not yet finished',
                                    text: 'Please wait',
                                    icon: 'warning',
                                    confirmButtonText: 'Close'
                                  });
                                
                            }
                        }




                                } 
                                
         
           
      } else {
        Swal.fire({
          title: 'You must finish your course',
          text: 'Please complete all required modules and submodules.',
          icon: 'warning',
          confirmButtonText: 'Close'
        });
      }
    };
    

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {

            setCurrentQuestionIndex(currentQuestionIndex + 1);
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex+1);
        } else {
            localStorage.setItem('currentQuestionIndex',0)
            const savedCurrentQuestionIndex = parseInt( localStorage.getItem('currentQuestionIndex'));
                                console.log(savedCurrentQuestionIndex);
                                setCurrentQuestionIndex(savedCurrentQuestionIndex); 
                                setUserAnswers(Array(questions.length).fill(null));
            setIsActive(false);
            calculateScore();
            setShowTest(false);
            
            
        }
    };
    function saveAttemptTime() {
        const currentTime = new Date().getTime();
        localStorage.setItem('lastAttemptTime', currentTime);
    }
    const calculateScore = async () => {
      let correctCount = 0;
      questions.forEach((question, index) => {
        console.log(userAnswers)
          if (userAnswers[index] === question.correctOption) {
              correctCount++;
          }
      });
      if(questions.length === 0){

        questions.length  = localStorage.getItem('questions').length;

      }
      const scorePercentage = (correctCount / questions.length) * 100;
     
      console.log(scorePercentage)
      localStorage.setItem('st', "");
   
      setCompleted(false);
 if(scorePercentage>80){
   
  
    localStorage.setItem('name', "");
        setScore(Math.round(scorePercentage)); // Rounds the score to the nearest integer
    
      try {
        const response = await setEndFormation(Math.round(scorePercentage));
        console.log(response);
    } catch (error) {
        console.error('Failed ', error);
    }
      
      Swal.fire({
        title: `${title} - Result`,
        text: `Your score: ${Math.round(scorePercentage)}%`,
        icon: 'success',
        confirmButtonText: 'Close'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem('fois', "0");
            pauseTimer();
            navigate('/Home/Certificats');
        }
    });
}else{
    localStorage.setItem('st', "");
    const fois = localStorage.getItem('fois');
    if(Number(fois) === 3){
        Swal.fire({
            title: `${title} - Result failed`,
            text: `Your score: ${Math.round(scorePercentage)}%`,
            icon: 'failed',
            confirmButtonText: 'Close'
        }).then(async(result) => {
            if (result.isConfirmed) {
                localStorage.setItem('fois', "0");
                setTestCompleted(false); 
                localStorage.setItem('st', "");
                pauseTimer();
                const response = await deleteInscr();
                if (response.status === 'success') {
                    navigate('/Home/home1');
                } else {
                  console.error('Deletion failed');
                }  
            }
        }); 
    }else{
        pauseTimer();
        getTime();
        pauseTimer();
    saveAttemptTime();
    Swal.fire({
        title: `Retry after 24h `,
        text: `Your score: ${Math.round(scorePercentage)}% you must have >80%`,
        icon: 'failed',
        confirmButtonText: 'Close'
    }).then((result) => {
        if (result.isConfirmed) {
            setTestCompleted(false); 
            localStorage.setItem('st', "");
       
            pauseTimer();
            
        }
    }); 
}
}
  };

    const handleOptionChange = (index) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = index;
        localStorage.setItem('Answers', updatedAnswers);
        console.log(updatedAnswers)
        setUserAnswers(updatedAnswers);
    };

    const formatTime = () => {
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;
        return `${hours < 10 ? '0' + hours : hours}h : ${minutes < 10 ? '0' + minutes : minutes}min : ${seconds < 10 ? '0' + seconds : seconds}sec`;
    };
    const preventRightClick = (event) => {
        event.preventDefault();
    };
  
    const name = localStorage.getItem('name');
    const l = questions.length;
    return (
        <>

        <div className="bg-gray-200 h-full overflow-hidden" onContextMenu={preventRightClick}>
            <div className="sm:mx-6 md:ml-60 md:mr-4 md:mt-14 p-6">
                <div className="bg-white mb-2 ml-6 no-select" style={{ height: '500px' }}>
                          
                    <div className="py-2 px-12">

                                {showTest ? (
                                    <>
                                        <div className="text-center p-12 mt-4">
                                        <h3 className='font-bold'>Question {+currentQuestionIndex + 1} / {l}</h3>
                                        </div>
                                        <div className='px-6 ml-12 mt-2 mb-12 '>
                                             <h3 className='ml-8 mb-4'>{questions[currentQuestionIndex].questionText}</h3>
                                            <ul className='ml-12 mb-4'>
                                                {questions[currentQuestionIndex].options.map((option, index) => (
                                                    <li key={option.id}>
                                                        <label>
                                                            <input type="radio" name="answer" checked={userAnswers[currentQuestionIndex] === index} onChange={() => handleOptionChange(index)} />
                                                            {option.text}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="bg-orange-500 text-black px-6 py-1.5 text-xs font-bold mt-4 ml-8" onClick={nextQuestion}>
                                                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Test'}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-center p-8"><h2 className="font-bold mt-4">{title}</h2></div>
                                        <div className='px-12 ml-12 py-6'>
                                            <p>You have  {formatTime()} to complete the test</p>
                                            <br/>
                                            <ul className="text-left list-disc ml-12">
                                                <li>{questions.length} multiple-choice questions</li>
                                                <li>Answer all questions</li>
                                                <li>No penalty for incorrect answers</li>
                                                <li>If you navigate away from the test page during the test, you may lose your responses</li>
                                            </ul>
                                            <div className="text-center p-8">
                                                {name === title ? (
       <button className="bg-orange-500 text-black px-6 py-1.5 text-xs font-bold mr-8" onClick={startTest}>
       {Completed ? 'Continue Test' : 'Start Test'}
   </button>
   
  
    ) : (<></>)}


                                                
                                            </div>
                                        </div>
                                        
                                    </>
                                )}
                                  <div className="p-4 text-center font-bold  w-auto max-w-xs mx-auto mb-6"  style={{
            backgroundColor: '#f3f2f2'
          }}>
                            <>
    {name === title ?(
         
        <span className=''>Time Remaining <br/> {formatTime()}</span>
    
    ) : (<></>)}
</>

                            </div>
                            </div>
                        </div>
                    </div>
                </div>
           
        </>
    );
};

export default TestFinal;
