import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { updateUser, getUserById } from '../services/UsersService';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Settings = ({ onClose, user: initialUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    date: '',
    student: '',
    speciality: '',
    university: '',
    linkedinUrldent: '',
    countries: [],
    selectedCountry: '',
    profileImage: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getUser();
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const countriesData = response.data.map(country => ({
        name: country.name.common,
        code: country.cca2
      }));
      setFormData(prevState => ({ ...prevState, countries: countriesData }));
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("User token is missing");
        return;
      }

      const userId = localStorage.getItem('userId');
      const user = await getUserById(userId, token);
      setFormData(prevState => ({
        ...prevState,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        date: user.date,
        student: user.student,
        speciality: user.speciality,
        university: user.university,
        linkedinUrldent: user.linkedinUrldent,
        selectedCountry: user.country,
        profileImage: user.profileImage,
      }));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("User is not authorized. Please log in again.");
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeCountry = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, selectedCountry: value });
  };

  const handleProfileImageChange = (event) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFormData(prevState => ({ ...prevState, profileImage: reader.result }));
    };

    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!initialUser) {
      console.error("No user data available to update");
      return;
    }

    const response = await updateUser(initialUser.id, formData);
    if (response.status === 'success') {
      navigate('/Home');
    } else {
      alert(`Failed to update user: ${response.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[800px] px-10 py-8">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <form onSubmit={handleSubmit}>  
          <div className="grid grid-cols-1 lg:grid-cols-2 landscape gap-x-8 gap-y-4 font-bold mt-8 max-md:max-w-full mb-6">
            <div className="ant-col full-width">
              <div className='upload-profile-picture'>
                <input 
                  accept="image/*" 
                  type="file" 
                  autoComplete="off"  
                  tabIndex="-1" 
                  style={{ display: 'none' }} 
                  onChange={handleProfileImageChange}
                  disabled={!isEditMode} 
                />
                <img 
                  src={formData.profileImage || "https://www.orangedigitalcenters.com:12345/api/v1/odcCountry/MA/627e3de1691a42003b5698ac/IMG-20220506-WA0071.jpg"} 
                  style={{ 
                    maxWidth: '180px', 
                    maxHeight: '180px', 
                    width: '180px', 
                    height: '180px', 
                    objectFit: 'cover', 
                    outline: 'none' 
                  }} 
                  alt="Profile Picture"
                />
              </div>  
              {!isEditMode && (
                <button type="button" className="ant-btn full-width profile-button mt-20 mr-20" onClick={() => setIsEditMode(true)}>
                  <span>Editer profil</span>
                </button>
              )}
              {isEditMode && (
                <div>
                  <label htmlFor="profileImage" className="text-sm text-black">
                    Profile Image
                  </label>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 landscape gap-x-8 gap-y-4 font-bold mt-8 max-md:max-w-full mb-6">
            </div>
            <div className="flex flex-col max-md:max-w-full">
              <label htmlFor="fullname" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">Full name</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="fullname"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                name="fullName"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="username" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                <span className="grow text-black">User name</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="username"
                className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="text"
                value={formData.username}
                onChange={handleChange}
                name="username"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                <span className="grow text-black">Email</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="email"
                className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                <span className="grow text-black">Date de naissance</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="date"
                className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="date"
                value={formData.date}
                onChange={handleChange}
                name="date"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                <span className="grow text-black"> Countries </span>
                <span className="text-orange-500">*</span>
              </label>
              <select
                id="countries"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                value={formData.selectedCountry}
                onChange={handleChangeCountry}
                required
              >
                <option value="">Select your country</option>
                {formData.countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="student" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                <span className="grow text-black">Statut étudiant</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="student"
                className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="text"
                value={formData.student}
                onChange={handleChange}
                name="student"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="speciality" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                <span className="grow text-black">Speciality</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="speciality"
                className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="text"
                value={formData.speciality}
                onChange={handleChange}
                name="speciality"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="university" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                <span className="grow text-black">University</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="university"
                className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="text"
                value={formData.university}
                onChange={handleChange}
                name="university"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="linkedinUrl" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                <span className="grow text-black">Linkedin</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="linkedinUrl"
                className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                name="linkedinUrl"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-sm font-bold flex items-center justify-center h-12 px-6 rounded-md border border-transparent bg-orange-500 text-white hover:bg-orange-400 transition duration-200 ease-in-out mt-4"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;
