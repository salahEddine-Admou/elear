import React, { useState, useEffect } from "react";
import loginimg from '../images/loginUI.png';
import alertimg from '../images/alert.svg';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Importez useNavigate

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [address, setAddress] = useState('');
    const [student, setStudent] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [university, setUniversity] = useState('');
    const [linkedinUrldent, setlinkedinUrldent] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleFullnameChange = (event) => {
        setFullname(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleStudentChange = (event) =>{
        setStudent(event.target.value);
    };

    const handleSpecialityChange = (event) =>{
        setSpeciality(event.target.value);
    };
    const handleUniversityChange = (event) =>{
        setUniversity(event.target.value);
    };
    const handlelinkedinUrldentChange = (event) =>{
        setlinkedinUrldent(event.target.value);
    };
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };
    
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

   
    
    const navigate = useNavigate(); 

    //Elle permet de parcourir la liste de tous les pays
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {
                const countriesData = Object.values(response.data);
                setCountries(countriesData);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/add', {
                
                fullName :fullname,
                username:username,
                password:password,
                email:email,
                address:address,
                student :student,
                speciality:speciality,
                university:university,
                linkedinUrldent:linkedinUrldent,
                countries:countries,
                selectedCountry:selectedCountry,
                "role":"USER"
            });
    
            // Check if the login was successful
            if (response.status === 200) {
                console.log('Login successful');
                // Extract the token from the response
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
        <div className="bg-white flex gap-5 max-md:flex-col max-md:gap-0 ">
            <div className="w-[45%] max-md:ml-0 max-md:w-full bg-orange-500 items-start">
                <img src={loginimg} alt="Login" className="max-md:ml-0 max-md:w-full items-start h-full" />
            </div>
            <div className="flex flex-col ml-5 w-[40%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col self-stretch px-5  my-auto mt-8 max-md:max-w-full">
                    <h2 className="text-2xl font-bold tracking-normal leading-8 max-md:mr-2.5 max-md:max-w-full  ">
                        <span className="text-black">Register</span>
                    </h2>
                    <form onSubmit={handleSubmit}>
                        
                        <div className="flex flex-col justify-center font-bold mt-8 max-md:max-w-full mb-6">
                            <div className="flex flex-col max-md:max-w-full">
                                <label htmlFor="fullname" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                                    <span className="grow text-black">Full name</span>
                                    <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    id="fullname"
                                    className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                    type="text"
                                    value={fullname}
                                    onChange={handleFullnameChange}
                                    required
                                />
                            </div>
                            <br/>
                            <div className="flex flex-col max-md:max-w-full">
                                <label htmlFor="username" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                                    <span className="grow text-black">User name</span>
                                    <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    id="username"
                                    className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                            </div>
                            <br/>
                            <div className="flex flex-col max-md:max-w-full">
                                <label htmlFor="email" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                                    <span className="grow text-black">Email</span>
                                    <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col justify-center mt-6 font-bold tracking-normal whitespace-nowrap max-md:max-w-full">
                                <div className="flex flex-col max-md:max-w-full">
                                    <label htmlFor="password" className="flex gap-1.5 self-start text-sm">
                                        <span className="grow text-black">Birth date</span>
                                        <span className="text-orange-500">*</span>
                                    </label>
                                    <input
                                        id="date"
                                        className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                        type="date"
                                        value={date}
                                        onChange={handleDateChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col max-md:max-w-full">
                                <label htmlFor="country" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                                        <span className="grow text-black">Countries</span>
                                        <span className="text-orange-500">*</span>
                                        </label>
                                        <select
                                id="country"
                                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                required
                            >
                                <option value="">Sélectionner un pays</option>
                                {countries.map(country => (
                                    <option key={country.name.common} value={country.name.common}>
                                        {country.name.common}
                                    </option>
                                ))}
                            </select>
                            </div>
                            <div className="flex flex-col max-md:max-w-full">
                                <label htmlFor="student" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                                    <span className="grow text-black">Student</span>
                                    <span className="text-orange-500">*</span>
                                </label>
                                <select
                                    id="student"
                                    className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                    type="student"
                                    value={student}
                                    onChange={handleStudentChange}
                                    required
                                    >
                                    <option value="student">Étudiant</option>
                                    <option value="professional">Professionnel</option>
                                    <option value="recentGraduate">Jeune diplômé</option>
                                    <option value="jobSeeker">À la recherche d'opportunité</option>
                                    <option value="techEnthusiast">Passionné de nouvelles technologies</option>
                                    <option value="entrepreneur">Entrepreneur</option>
                                </select>   
                            </div>
                            <div className="flex flex-col max-md:max-w-full">
                                <label htmlFor="speciality" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                                    <span className="grow text-black">Speciality</span>
                                    <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    id="speciality"
                                    className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                    type="speciality"
                                    value={speciality}
                                    onChange={handleSpecialityChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col max-md:max-w-full">
                                <label htmlFor="university" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                                    <span className="grow text-black">University</span>
                                    <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    id="university"
                                    className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                    type="university"
                                    value={university}
                                    onChange={handleUniversityChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col max-md:max-w-full">
                                <label htmlFor="linkedinUrldent" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                                    <span className="grow text-black">linkedinUrldent</span>
                                    <span className="text-orange-500"></span>
                                </label>
                                <input
                                    id="linkedinUrldent"
                                    className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                    type="linkedinUrldent"
                                    value={linkedinUrldent}
                                    onChange={handlelinkedinUrldentChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col justify-center mt-6 font-bold tracking-normal whitespace-nowrap max-md:max-w-full">
                                <div className="flex flex-col max-md:max-w-full">
                                    <label htmlFor="password" className="flex gap-1.5 self-start text-sm">
                                        <span className="grow text-black">Password</span>
                                        <span className="text-orange-500">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
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
                            <div className="flex flex-col justify-center mt-6 font-bold tracking-normal whitespace-nowrap max-md:max-w-full">
                                <div className="flex flex-col max-md:max-w-full">
                                    <label htmlFor="password" className="flex gap-1.5 self-start text-sm">
                                        <span className="grow text-black">Retype Password</span>
                                        <span className="text-orange-500">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-md:max-w-full"
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center mt-6 max-w-full text-sm tracking-normal leading-6 text-center text-black whitespace-nowrap w-[182px] ">
                                <button type="submit" className="justify-center px-2 py-2 bg-orange-500 max-md:px-2 mt-2">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Register;
