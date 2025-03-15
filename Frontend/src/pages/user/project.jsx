import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import MyNavbar from './MyUserNavbar';
import { Calendar, MapPin, ArrowRight, UserCheck } from 'lucide-react';

const ProjectViewer = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/project');
      // Ensure we're working with an array
      const projectsData = Array.isArray(response.data) ? response.data : 
                          response.data?.data ? response.data.data : [];
      setProjects(projectsData);
      setError(null);
    } catch (error) {
      setError('Failed to fetch projects. Please try again later.');
      console.error('Error fetching projects:', error);
      setProjects([]); // Set empty array on error
    }
    setLoading(false);
  };
  
  // Function to handle registration for a project
  const handleRegister = (projectId) => {
    console.log("Project ID:", projectId);
    console.log("Navigating to:", `/user/ProjectRegister/${projectId}`);
    navigate(`/user/ProjectRegister/${projectId}`);
  };
  

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MyNavbar />
      
      <div className="pt-16 pb-8 bg-white">
        <div className="container mx-auto px-4 mt-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                Discover our ongoing and upcoming projects that make a difference in the Kurunegala community.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="text-red-600 bg-red-50 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={project.image || "/api/placeholder/400/320"}
                  alt={project.projectName}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {project.status || 'Planning'}
                </span>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mt-1">
                    {project.projectName}
                  </h3>
                </div>

                <p className="text-gray-600 mb-4">
                  {project.projectDescription}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{project.projectDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{project.projectLocation}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button className="flex-1 bg-gray-50 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  {/* Register button for all projects */}
                  <button 
                    onClick={() => handleRegister(project._id || project.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Register
                    <UserCheck className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center mt-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        )}
      </div>

      <footer className="bg-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Woodland District Rover Crew. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectViewer;