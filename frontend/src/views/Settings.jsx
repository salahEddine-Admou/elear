import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import DefaultProfilePicture from '../images/13392061.jpg'; // Import the default image

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
    profilePicture: '', // Add this line
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
        profilePicture: user.profilePicture || DefaultProfilePicture, // Use default image if no profile picture is set
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
      setFormData(prevState => ({ ...prevState, profilePicture: reader.result })); // Update profilePicture
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
      setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[800px] px-10 py-8">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 font-bold mt-8 max-md:max-w-full mb-6">
            <div className="ant-col full-width">
              <div className="upload-profile-picture">
                <img
                  src={formData.profilePicture || DefaultProfilePicture} // Use default profile picture if none is set
                  alt="Profile Picture"
                  className="w-18 h-18 rounded-full object-cover"
                />
                {isEditMode && (
                  <label htmlFor="profile-image-upload" className="upload-button cursor-pointer inline-block px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
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
            </div>
            <div className="flex flex-col">
              <label htmlFor="fullName" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">Full Name</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="fullName"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                name="fullName"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="username" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">Username</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="username"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="text"
                value={formData.username}
                onChange={handleChange}
                name="username"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">Email</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="email"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">Date of Birth</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="date"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="date"
                value={formData.date}
                onChange={handleChange}
                name="date"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">Country</span>
                <span className="text-orange-500">*</span>
              </label>
              <select
                id="country"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
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
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 font-bold mt-8 max-md:max-w-full">
            <div className="flex flex-col">
              <label htmlFor="profession" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">Profession</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="profession"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="text"
                value={formData.profession}
                onChange={handleChange}
                name="profession"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="speciality" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">Speciality</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="speciality"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="text"
                value={formData.speciality}
                onChange={handleChange}
                name="speciality"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="university" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">University</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="university"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="text"
                value={formData.university}
                onChange={handleChange}
                name="university"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="linkedinUrl" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">LinkedIn URL</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="linkedinUrl"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                name="linkedinUrl"
              />
            </div>
          </div>
          <div className="mt-8">
            <button type="submit" className="px-4 py-2 rounded-md bg-orange-500 hover:bg-blue-600 text-white">
              Save
            </button>
            <button type="button" className="ml-4 px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
        {showSuccess && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
            Settings updated successfully!
          </div>
        )}
      </div>
    </>
  );
};

export default Settings;
