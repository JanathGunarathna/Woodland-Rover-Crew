import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import LoginNavbar from "./loginNavbar";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'teacher',
    address: '',
    roverRegistrationNumber: '',
    idNumber: '',
    crewOrSchool: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Remove confirmPassword from data sent to server
    const submitData = { ...formData };
    delete submitData.confirmPassword;

    try {
      const response = await axios.post("http://localhost:8000/api/account", submitData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.response?.data?.message || error.response?.data?.error || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component remains the same...
  const inputClassName = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <LoginNavbar />
      <div className="flex items-center justify-center px-4 py-12">      
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Create Account</h2>
          </div>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
            <p className="font-medium">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        
          <div className="rounded-md shadow-sm space-y-6">
            <div>
              <label htmlFor="name" className={labelClassName}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClassName}
                required
                disabled={isLoading}
                aria-label="Name"
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClassName}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClassName}
                required
                disabled={isLoading}
                aria-label="Email"
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClassName}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClassName}>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="address" className={labelClassName}>Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={inputClassName}
                disabled={isLoading}
                aria-label="Address"
              />
            </div>

            <div>
              <label htmlFor="roverRegistrationNumber" className={labelClassName}>
                Rover Registration Number
              </label>
              <input
                type="text"
                id="roverRegistrationNumber"
                name="roverRegistrationNumber"
                value={formData.roverRegistrationNumber}
                onChange={handleChange}
                className={inputClassName}
                disabled={isLoading}
                aria-label="Rover registration number"
              />
            </div>

            <div>
              <label htmlFor="idNumber" className={labelClassName}>ID Number</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className={inputClassName}
                disabled={isLoading}
                aria-label="ID number"
              />
            </div>

            <div>
              <label htmlFor="crewOrSchool" className={labelClassName}>Crew or School</label>
              <select
                id="crewOrSchool"
                name="crewOrSchool"
                value={formData.crewOrSchool}
                onChange={handleChange}
                className={inputClassName}
                required
                disabled={isLoading}
                aria-label="Crew or school"
              >
                <option value="crew">Crew</option>
                <option value="school">School</option>
              </select>
            </div>

            <div>
              <label htmlFor="role" className={labelClassName}>Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={inputClassName}
                required
                disabled={isLoading}
                aria-label="Role"
              >
                <option value="admin">Student</option>
                <option value="teacher">Teacher</option>
                <option value="leader">Leader</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateAccount;