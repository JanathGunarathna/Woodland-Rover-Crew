// addProject.jsx - Corrected navigation and form handling
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Fixed import
import { Save } from 'lucide-react';
import axios from 'axios';
import MyNavbar from "./MyNavbar";

const API_BASE_URL = 'http://localhost:8000/api/project';

const ProjectForm = ({ project, onSubmit, onDelete, mode = "create" }) => {
  const [formData, setFormData] = useState(project || {
    projectName: "",
    projectDate: "",
    projectTime: "",
    projectLocation: "",
    projectDescription: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Properly initialized

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
  
    if (!formData.projectName || !formData.projectDate || !formData.projectTime) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }
  
    try {
      let response;
      
      if (mode === "create") {
        // Create new project
        response = await axios.post(`${API_BASE_URL}`, formData);
      } else {
        // Update existing project
        response = await axios.put(`${API_BASE_URL}/${project.id}`, formData);
      }
      
      if (response.data.status) {
        setSuccess(mode === "create" ? "Project created successfully!" : "Project updated successfully!");
        
        // If there's an onSubmit callback provided, call it
        if (onSubmit) {
          onSubmit(response.data);
        }
        
        // Navigate to project listing page
        navigate("/admin/project");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <MyNavbar />
        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {mode === "create" ? "Create New Project" : "Edit Project"}
          </h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name 
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    name="projectDate"
                    value={formData.projectDate}
                    onChange={handleChange}
                    placeholder="e.g., March 15-17, 2024"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    name="projectTime"
                    value={formData.projectTime}
                    onChange={handleChange}
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="projectLocation"
                    value={formData.projectLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/admin/project")} // Direct navigation rather than history.back()
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                disabled={isSubmitting}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? "Saving..." : (mode === "create" ? "Create Project" : "Save Changes")}
              </button> 
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;