import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import DefaultProfilePicture from '../images/13392061.jpg';

const Settings = ({ onClose, user: initialUser }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    date: '',
    profession: '',
    speciality: '',
    university: '',
    linkedinUrl: '',
    countries: [],
    country: '',
    profilePicture: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);

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

  const getUserById = async (userId, token) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
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
        profession: user.profession,
        speciality: user.speciality,
        university: user.university,
        linkedinUrl: user.linkedinUrl,
        country: user.country,
        profilePicture: user.profilePicture || DefaultProfilePicture,
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
    setFormData({ ...formData, country: value });
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData(prevState => ({ ...prevState, profilePicture: reader.result }));
    };
    reader.onerror = (error) => {
      console.error('Error uploading profile image:', error);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      const userId = localStorage.getItem('userId');
      const response = await axios.put(`http://localhost:8080/users/update/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('User info updated successfully:', response.data);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-4xl p-8 bg-white shadow-md rounded-lg">
        <nav className="text-black-600 mt-10">
          <ol className="list-reset flex">
            <li><a href="/Home/home1" className="text-orange-600 hover:underline">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-black-500">Settings</li>
          </ol>
        </nav>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={formData.profilePicture || DefaultProfilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
            {isEditMode && (
              <label htmlFor="profile-image-upload" className="cursor-pointer px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-center">
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="sr-only"
                />
                Change Photo
              </label>
            )}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="fullName" className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></label>
              <input
                id="fullName"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                name="fullName"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm font-semibold text-gray-700">Username <span className="text-red-500">*</span></label>
              <input
                id="username"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                type="text"
                value={formData.username}
                onChange={handleChange}
                name="username"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
              <input
                id="email"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-sm font-semibold text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
              <input
                id="date"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                type="date"
                value={formData.date}
                onChange={handleChange}
                name="date"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="text-sm font-semibold text-gray-700">Country <span className="text-red-500">*</span></label>
              <select
                id="country"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                value={formData.country}
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
              <label htmlFor="profession" className="text-sm font-semibold text-gray-700">Profession <span className="text-red-500">*</span></label>
              <input
                id="profession"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                type="text"
                value={formData.profession}
                onChange={handleChange}
                name="profession"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="speciality" className="text-sm font-semibold text-gray-700">Speciality <span className="text-red-500">*</span></label>
              <input
                id="speciality"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                type="text"
                value={formData.speciality}
                onChange={handleChange}
                name="speciality"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="university" className="text-sm font-semibold text-gray-700">University <span className="text-red-500">*</span></label>
              <input
                id="university"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                type="text"
                value={formData.university}
                onChange={handleChange}
                name="university"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="linkedinUrl" className="text-sm font-semibold text-gray-700">LinkedIn URL <span className="text-red-500">*</span></label>
              <input
                id="linkedinUrl"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                name="linkedinUrl"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="submit" className="px-6 py-2 rounded-md bg-orange-500 hover:bg-blue-600 text-white font-semibold">Save</button>
            <button type="button" className="px-6 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-semibold" onClick={onClose}>Cancel</button>
          </div>
        </form>
        {showSuccess && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md text-center">
            Settings updated successfully!
          </div>
        )}
      </div>
    </>
  );
};

export default Settings;
