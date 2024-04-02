import React, { useState } from "react";
import loginimg from '../images/loginUI.png';
import alertimg from '../images/alert.svg';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Importez useNavigate

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Utilisez le hook useNavigate

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: username,
                password: password,
            });
    
            // Check if the login was successful
            if (response.status === 200) {
                console.log('Login successful');
                // Extract the token from the response
                const { token } = response.data;
                // Store the token in local storage
                localStorage.setItem('userToken', token);
                // Navigate to the home page
                navigate('/');
                return;
            } else if (response.status === 401) {
                setError('Unauthorized: Invalid username or password');
                return;
            }
    
            throw new Error('Failed to login');
        } catch (error) {
            setError('Failed to login, please try again.');
        }
    };
    

    return (
        <div className="bg-white flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="w-[45%] max-md:ml-0 max-md:w-full bg-orange-500 items-start">
                <img src={loginimg} alt="Login" style={{ height: "100vh", width: "auto" }} />
            </div>
            <div className="flex flex-col ml-5 w-[40%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col self-stretch px-5 pb-16 my-auto max-md:mt-10 max-md:max-w-full">
                    <h2 className="text-3xl font-bold tracking-normal leading-8 max-md:mr-2.5 max-md:max-w-full">
                        <span className="text-orange-500">Welcome again</span>
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <p className="mt-2.5 mr-5 text-lg tracking-normal leading-6 text-zinc-400 max-md:mr-2.5 max-md:max-w-full">
                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
                        </p>
                        <div className="flex flex-col justify-center font-bold mt-10 max-md:max-w-full">
                            <div className="flex flex-col max-md:max-w-full">
                                <label htmlFor="username" className="flex gap-1.5 self-start text-lg leading-6 whitespace-nowrap">
                                    <span className="grow text-black">Username</span>
                                    <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    id="username"
                                    className="justify-center px-4 py-3.5 mt-3 text-lg leading-6 text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col justify-center mt-6 font-bold tracking-normal whitespace-nowrap max-md:max-w-full">
                                <div className="flex flex-col max-md:max-w-full">
                                    <label htmlFor="password" className="flex gap-1.5 self-start text-lg leading-6">
                                        <span className="grow text-black">Password</span>
                                        <span className="text-orange-500">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        className="justify-center px-4 py-3.5 mt-3 text-lg leading-6 text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                            </div>
                            {error && <div className="flex gap-2 max-md:flex-wrap mt-6 text-sm tracking-normal leading-4 text-black max-md:max-w-full">
                                <img src={alertimg} className="shrink-0 aspect-square w-[31px]" alt="Error Icon" />
                                <div className="grow justify-center self-start py-1 w-fit">
                                    {error}
                                </div>
                            </div>}
                            <div className="flex flex-col justify-center mt-6 max-w-full text-lg tracking-normal leading-6 text-center text-black whitespace-nowrap w-[182px]">
                                <button type="submit" className="justify-center px-7 py-3.5 bg-orange-500 max-md:px-5">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
