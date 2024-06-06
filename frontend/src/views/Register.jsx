import React, { useState, useEffect } from "react";
import loginimg from '../images/loginUI.png';
import alertimg from '../images/alert.svg';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [address, setAddress] = useState('');
    const [profession, setProfession] = useState(''); 
    const [speciality, setSpeciality] = useState('');
    const [university, setUniversity] = useState('');
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]); 

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                const countriesData = response.data.map(country => ({
                    name: country.name.common
                }));
                setCountries(countriesData);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== retypePassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/users/add', {
                fullName: fullname,
                username: username,
                password: password,
                email: email,
                profession: profession,
                date: date,
                address: address,
                speciality: speciality,
                university: university,
                country: country,
                role: "USER"
            });

            if (response.status === 200) {
                console.log('Registration successful');
                navigate('/');
            } else {
                setError('Failed to register, please try again.');
            }
        } catch (error) {
            setError('Failed to register, please try again.');
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="flex bg-white h-screen overflow-hidden">
            <div className="w-1/3">
                <img src={loginimg} alt="Login" className="w-full object-cover" />
            </div>
            <div className="w-2/3 h-fit flex items-center justify-center p-1">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                    <div>
                            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                            <input id="fullname" type="text" value={fullname} onChange={e => setFullname(e.target.value)} required className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 py-2 px-4" />
                        </div>
                    <form className="grid grid-cols-2 gap-2">

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username <span className="text-red-500">*</span></label>
                            <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} required className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 py-2 px-4" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 py-2 px-4" />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Birth Date <span className="text-red-500">*</span></label>
                            <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required min='1970-01-01' max='2008-12-31' className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 py-2 px-4" />
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
                            <select id="country" value={country} onChange={e => setCountry(e.target.value)} required className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 py-2 px-4">
                                <option value="">Select a country</option>
                                {countries.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Profession </label>
                            <input id="profession" type="text" value={profession} onChange={e => setProfession(e.target.value)} required className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 py-2 px-4" />
                        </div>
                        <div>
                            <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">Speciality </label>
                            <input id="speciality" type="text" value={speciality} onChange={e => setSpeciality(e.target.value)}  className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 py-2 px-4" />
                        </div>
                        <div>
                            <label htmlFor="university" className="block text-sm font-medium text-gray-700">University </label>
                            <input id="university" type="text" value={university} onChange={e => setUniversity(e.target.value)} required className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 py-2 px-4" />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input id="address" type="text" value={address} onChange={e => setAddress(e.target.value)} className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 py-2 px-4" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
                            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 py-2 px-4" />
                        </div>
                        <div>
                            <label htmlFor="retypePassword" className="block text-sm font-medium text-gray-700">Retype Password <span className="text-red-500">*</span></label>
                            <input id="retypePassword" type="password" value={retypePassword} onChange={e => setRetypePassword(e.target.value)} required className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 py-2 px-4" />
                        </div>
                        {error && (
                            <div className="mt-4 p-2 bg-red-100 text-red-700 border-2 border-red-300 rounded flex items-center">
                                <img src={alertimg} alt="Error" className="w-5 h-5 mr-2" />
                                <p>{error}</p>
                            </div>
                        )}

                    </form>
                    <form onSubmit={handleSubmit}>
                            <button type="submit" className="w-full py-2 px-4 mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold rounded-md">
                                Register
                            </button>
                        </form>
                    <div className="mt-1 text-center">
                        <p className="text-sm text-black-900">
                            Already have an account?{" "}
                            <button 
                                onClick={() => navigate('/')}
                                className="text-orange-500 hover:underline hover:text-orange-700 font-bold"
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Register;