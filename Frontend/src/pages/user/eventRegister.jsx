import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyNavbar from './MyUserNavbar';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

const ProjectRegister = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    school: '',
    scoutLevel: 'junior', // Default value
    paymentMethod: 'cash', // Default value
    transactionId: '',
    amount: '',
    contactNumber: ''
  });

  // Fetch project details based on projectId
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/project/${projectId}`);
        setProject(response.data);
      } catch (err) {
        setError('Failed to load project details. Please try again.');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Combine form data with project ID
      const registrationData = {
        ...formData,
        projectId: projectId
      };

      // Send registration data to backend
      await axios.post('http://localhost:8000/api/register', registrationData);
      
      // Show success message
      setSuccess(true);
      
      // Reset form (optional)
      setFormData({
        fullName: '',
        school: '',
        scoutLevel: 'junior',
        paymentMethod: 'cash',
        transactionId: '',
        amount: '',
        contactNumber: ''
      });

      // Automatically navigate back after success (optional)
      setTimeout(() => {
        navigate('/user/project');
      }, 3000);
    } catch (err) {
      setError('Failed to submit registration. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    navigate('/user/projects');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MyNavbar />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MyNavbar />
      
      <div className="container mx-auto px-4 py-8 mt-8">
        <button 
          onClick={goBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </button>

        {success ? (
          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-4">
                Thank you for registering for {project?.projectName}. You will be redirected back to the projects page shortly.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto">
            <div className="p-6 md:p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Register for Event
              </h1>
              
              {project && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">{project.projectName}</h2>
                  <p className="text-gray-600 mt-1">{project.projectDate} • {project.projectLocation}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-start">
                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Personal Information */}
                  <div>
                    <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">
                      Full Name *
                    </label>
                    <input 
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="school" className="block text-gray-700 font-medium mb-1">
                      School *
                    </label>
                    <input 
                      type="text"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Enter your school name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-1">
                      Contact Number *
                    </label>
                    <input 
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Enter your contact number"
                    />
                  </div>

                  <div>
                    <label htmlFor="scoutLevel" className="block text-gray-700 font-medium mb-1">
                      Scout Level *
                    </label>
                    <select
                      id="scoutLevel"
                      name="scoutLevel"
                      value={formData.scoutLevel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    >
                      <option value="junior">Junior Scout</option>
                      <option value="senior">Senior Scout</option>
                      <option value="rover">Rover Scout</option>
                      <option value="leader">Scout Leader</option>
                    </select>
                  </div>

                  {/* Payment Information */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Details</h3>
                    
                    <div className="mb-4">
                      <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-1">
                        Payment Method *
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      >
                        <option value="cash">Cash</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="online">Online Payment</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">
                        Amount (LKR) *
                      </label>
                      <input 
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Enter payment amount"
                      />
                    </div>

                    {formData.paymentMethod !== 'cash' && (
                      <div>
                        <label htmlFor="transactionId" className="block text-gray-700 font-medium mb-1">
                          Transaction ID {formData.paymentMethod !== 'cash' ? '*' : ''}
                        </label>
                        <input 
                          type="text"
                          id="transactionId"
                          name="transactionId"
                          value={formData.transactionId}
                          onChange={handleChange}
                          required={formData.paymentMethod !== 'cash'}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          placeholder="Enter transaction reference"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium 
                    ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'} 
                    transition-colors`}
                  >
                    {submitting ? 'Submitting...' : 'Complete Registration'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRegister;