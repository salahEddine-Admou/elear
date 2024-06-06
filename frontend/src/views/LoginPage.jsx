import React, { useState } from "react";
import loginimg from '../images/loginUI.png';
import alertimg from '../images/alert.svg';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

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

            if (response.status === 200) {
                console.log('Login successful');
                const { token, message, id, fullName } = response.data;

                localStorage.setItem('userToken', token);
                localStorage.setItem('userRole', message);
                localStorage.setItem('userId', id);
                localStorage.setItem('fullName', fullName);

                if (message === 'ADMIN') {
                    navigate('/Home/dashbord');
                } else {
                    navigate('/Home/home1');
                }
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
        <div className="bg-white flex gap-5 max-md:flex-col max-md:gap-0 h-screen">
            <img src={loginimg} alt="Login" className="h-full w-auto max-md:w-full max-md:h-60 object-cover" />

            <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full p-6">
                <div className="flex flex-col self-stretch my-auto max-md:mt-10">
                    <h2 className="text-3xl font-bold tracking-normal leading-8 text-orange-500">
                        Welcome to ODC E-learning platform
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <p className="mt-1.5 text-lg tracking-normal leading-6 text-zinc-600">
                        Ready to keep pushing your boundaries? Sign in and dive back into the engaging courses you love. There's always more to learn!
                        </p>
                        <div className="flex flex-col justify-center font-bold mt-6">
                            <div className="flex flex-col">
                                <label htmlFor="username" className="flex gap-1.5 text-lg leading-6">
                                    <span className="text-black">Username</span>
                                    <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    id="username"
                                    className="px-4 py-3.5 mt-3 text-lg leading-6 text-black bg-white border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col justify-center mt-6">
                                <label htmlFor="password" className="flex gap-1.5 text-lg leading-6">
                                    <span className="text-black">Password</span>
                                    <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    id="password"
                                    className="px-4 py-3.5 mt-3 text-lg leading-6 text-black bg-white border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            {error && (
                                <div className="flex gap-2 mt-6 text-sm text-red-600">
                                    <img src={alertimg} className="w-8" alt="Error Icon" />
                                    <span>{error}</span>
                                </div>
                            )}
                            <div className="flex flex-col justify-center mt-6 space-y-4">
                                <button type="submit" className="px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md">
                                    Login
                                </button>
                                <p className="text-center text-sm text-gray-600">
                                    Don't have an account? <Link to="/register" className="text-orange-500 hover:text-orange-600 font-semibold">Create one</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
