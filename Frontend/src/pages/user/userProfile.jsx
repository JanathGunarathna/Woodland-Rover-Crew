import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  ArrowLeft } from 'lucide-react';
import MyNavbar from "./MyUserNavbar";

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const EnvelopeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const CreditCardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const SchoolIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const UserProfilePage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
    roverRegistrationNumber: '',
    idNumber: '',
    crewOrSchool: '',
    role: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user ID from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        if (!storedUser || !storedUser.id) {
          setError('User not logged in');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:8000/api/account/${storedUser.id}`);
        
        if (response.data && response.data.result && response.data.result.status) {
          setUserData(response.data.result.data);
        } else {
          setError('Failed to load user data');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error loading user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePictureUpload = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading user profile...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-8">
      <MyNavbar />
      <div className="flex flex-col md:flex-row items-center mb-6">
        <div className="relative mr-4 mb-4 md:mb-0">
          {profilePicture ? (
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon />
            </div>
          )}
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 16v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1m9 6V4m-9 0L9 8m5-4v8"></path>
            </svg>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{userData.name}</h2>
          <p className="text-gray-500">{userData.email}</p>
          <p className="text-blue-600 mt-1 capitalize">{userData.role}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <LocationIcon className="w-6 h-6 text-gray-400 mr-2 flex-shrink-0" />
          <span className="break-words">{userData.address}</span>
        </div>
        <div className="flex items-center">
          <CreditCardIcon className="w-6 h-6 text-gray-400 mr-2 flex-shrink-0" />
          <span className="break-words">{userData.roverRegistrationNumber}</span>
        </div>
        <div className="flex items-center">
          <EnvelopeIcon className="w-6 h-6 text-gray-400 mr-2 flex-shrink-0" />
          <span className="break-words">{userData.idNumber}</span>
        </div>
        <div className="flex items-center">
          <SchoolIcon className="w-6 h-6 text-gray-400 mr-2 flex-shrink-0" />
          <span className="break-words">{userData.crewOrSchool}</span>
        </div>
        <button 
                  onClick={() => navigate('/user')}
                  className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </button>
      </div>
    </div>
  );
};

export default UserProfilePage;