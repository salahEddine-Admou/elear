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

  const [profileImage, setProfileImage] = useState("");

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
<<<<<<< Updated upstream
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
                            <picture 
                              src={profileImage || "https://www.orangedigitalcenters.com:12345/api/v1/odcCountry/MA/627e3de1691a42003b5698ac/IMG-20220506-WA0071.jpg"} 
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
                          {/* Bouton "Editer profil" */}
                          {!isEditMode && (
                            <button type="button" className="ant-btn full-width profile-button mt-20 mr-20" onClick={() => setIsEditMode(true)}>
                                <span>Editer profil</span>
                              </button>
                          )}
                          {/* Champ de téléchargement de l'image du profil */}
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
                          className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                          type="text"
                          value={userData.fullName}
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
                          value={userData.username}
                          onChange={handleChange}
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
                          value={userData.email}
                          onChange={handleChange}
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
                          value={userData.date}
                          onChange={handleChange}
                          required
                          minDate={new Date('2008-01-01')}
                          maxDate={new Date('1970-12-31')}
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
                        value={userData.countries} // Utilisation de formData.selectedCountry
                        onChange={handleChangeCountry} // Utilisation de handleChangeCountry pour mettre à jour le pays sélectionné
                        required
                      >
                        <option value="">Sélectionner un pays</option>
                        {formData.countries.map(country => (
                          <option key={country.name.common} value={country.name.common}>
                            {country.name.common}
                          </option>
                        ))}
                        </select>
                      </div>
                      <div className="flex flex-col">
                      <label htmlFor="student" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                          <span className="grow text-black">Student</span>
                          <span className="text-orange-500">*</span>
                      </label>
                      <select
                        id="student"
                        className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                        value={userData.student}
                        onChange={handleChange}
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
                      <div className="flex flex-col">
                      <label htmlFor="speciality" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                          <span className="grow text-black">Speciality</span>
                          <span className="text-orange-500">*</span>
                      </label>
                      <input
                          id="speciality"
                          className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                          type="speciality"
                          value={userData.speciality}
                          onChange={handleChange}
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
                          type="university"
                          value={userData.university}
                          onChange={handleChange}
                          required
                      />
                      </div>
                      {/* <div className="flex flex-col">
                      <label htmlFor="linkedinUrl" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                          <span className="grow text-black">LinkedinUrl</span>
                          <span className="text-orange-500"></span>
                      </label>
                      <input
                          id="linkedinUrl"
                          className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                          type="linkedinUrl"
                          value={userData.linkedinUrl}
                          onChange={handleChange}
                          required
                      />
                      </div> */}
                      <div className="flex flex-col">
                      <label htmlFor="linkedinUrl" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                        <span className="grow text-black">LinkedinUrl</span>
                        <span className="text-orange-500">*</span>
                      </label>
                      <input
                        id="linkedinUrl"
                        className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                        type="text" // Changement du type en "text"
                        value={userData.linkedinUrldent}
                        onChange={handleChange}
                        required
                      />
                    </div>
                      <div className="flex flex-col">
                      <label htmlFor="password" className="flex gap-1.5 self-start text-sm  whitespace-nowrap">
                          <span className="grow text-black">Password</span>
                          <span className="text-orange-500">*</span>
                      </label>
                      <input
                          id="password"
                          className="justify-center px-4 py-2.5 mt-3 text-sm  text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                          type="password"
                          value={userData.password}
                          onChange={handleChange}
                          required
                          autoComplete="current-password" 
                      />

                      </div>
                  </div>
                  <div className="flex  mt-6">
                  </div>
        {/* <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-md mt-4">
          Modify
        </button> */}
        <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Modify
            </button>
            <button
              type="submit"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
      </form>
        {showSuccess && (
          <div className="success-dialog px-4 py-4 w-[80%]" onClick={() => setShowSuccess(false)}>
            <div className="">
              <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SVG icon */}
              </svg>
=======
          <div className="grid grid-cols-1 lg:grid-cols-2 landscape gap-x-8 gap-y-4 font-bold mt-8 max-md:max-w-full mb-6">
            <div className="ant-col full-width">
>>>>>>> Stashed changes
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 landscape gap-x-8 gap-y-4 font-bold mt-8 max-md:max-w-full mb-6"></div>
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
                autoComplete="name"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="username" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">User name</span>
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
                autoComplete="username"
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
                autoComplete="email"
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
                autoComplete="bday"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="student" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">Student</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="student"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="text"
                value={formData.student}
                onChange={handleChange}
                name="student"
                autoComplete="organization-title"
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
                autoComplete="organization-title"
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
                autoComplete="organization"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="linkedinUrldent" className="flex gap-1.5 self-start text-sm whitespace-nowrap">
                <span className="grow text-black">LinkedIn URL</span>
                <span className="text-orange-500">*</span>
              </label>
              <input
                id="linkedinUrldent"
                className="justify-center px-4 py-2.5 mt-3 text-sm text-black bg-white border-solid border-[3px] border-stone-300 max-w-full"
                type="url"
                value={formData.linkedinUrldent}
                onChange={handleChange}
                name="linkedinUrldent"
                autoComplete="url"
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
                value={formData.selectedCountry}
                onChange={handleChangeCountry}
                required
                autoComplete="country"
              >
                {formData.countries.map(country => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;
