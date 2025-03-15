import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Alert } from '../../components/ui/AlertDescription';
import axios from 'axios';
import MyNavbar from './MyNavbar';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [project, setProject] = useState({
    projectName: "",
    projectDate: "",
    projectTime: "",
    projectLocation: "",
    projectDescription: "",
    status: ""
  });

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      console.log(`Fetching project with ID: ${id}`);
      const response = await axios.get(`http://localhost:8000/api/project/${id}`);
      console.log("Project data received:", response.data);
      
      // Set all project fields from the response data
      setProject({
        projectName: response.data.projectName || "",
        projectDate: response.data.projectDate || "",
        projectTime: response.data.projectTime || "",
        projectLocation: response.data.projectLocation || "",
        projectDescription: response.data.projectDescription || "",
        status: response.data.status || ""
      });
      setError("");
    } catch (err) {
      console.error('Error fetching project:', err);
      setError("Failed to load project details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!project.projectName || !project.projectDate || !project.projectTime) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/project/${id}`, project);
      setSuccess("Project updated successfully!");
      setTimeout(() => navigate('/admin/projects'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project. Please try again.");
      console.error('Error updating project:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MyNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MyNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/admin/project')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </button>

          {error && (
            <Alert variant="destructive" className="mb-4">
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
              {success}
            </Alert>
          )}

          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Project</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={project.projectName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="text"
                    name="projectDate"
                    value={project.projectDate}
                    onChange={handleChange}
                    placeholder="e.g., March 15-17, 2024"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    name="projectTime"
                    value={project.projectTime}
                    onChange={handleChange}
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="projectLocation"
                  value={project.projectLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={project.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Status</option>
                  <option value="Planning">Planning</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="projectDescription"
                  value={project.projectDescription}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/projects')}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;