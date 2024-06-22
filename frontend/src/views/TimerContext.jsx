import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTest } from '../services/UsersService'; // Make sure the path is correct based on your project structure

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showTest, setShowTest] = useState(false); // State to manage the visibility of the test

    useEffect(() => {
        const fetchInitialTimer = async () => {
            try {
                const response = await getTest();
                setTimer(response.timeLimit * 60); // Initialize timer with seconds
            } catch (error) {
                console.error('Failed to fetch initial timer', error);
            }
        };
        fetchInitialTimer();
    }, []);

    useEffect(() => {
        let interval = null;
        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
            setIsActive(false);
            // Perform any additional actions when timer hits zero
        }
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [isActive, timer]);

    const startTimer = () => setIsActive(true);
    const pauseTimer = () => setIsActive(false);
    const resetTimer = async () => {
        // Optional: Add reset functionality if needed
        setIsActive(false);
        try {
            const response = await getTest();
            setTimer(response.timeLimit * 60); // Initialize timer with seconds
        } catch (error) {
            console.error('Failed to fetch initial timer', error);
        }
    };

    return (
        <TimerContext.Provider value={{
            timer, isActive, startTimer, pauseTimer, resetTimer,
            currentQuestionIndex, setCurrentQuestionIndex,
            userAnswers, setUserAnswers,
            showTest, setShowTest
        }}>
            {children}
        </TimerContext.Provider>
    );
};
