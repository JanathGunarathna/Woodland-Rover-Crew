import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyNavbar from "./MyNavbar";
import {
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Pencil,
} from "lucide-react";

const ProjectViewer = () => {
  const [projects, setProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const projectsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    updateVisibleProjects();
  }, [page, projects]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/project");
      const projectsData = Array.isArray(response.data)
        ? response.data
        : response.data?.data
        ? response.data.data
        : [];
      setProjects(projectsData);
      setError(null);
    } catch (error) {
      setError("Failed to fetch projects. Please try again later.");
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
    setLoading(false);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:8000/api/project/${projectId}`);
        fetchProjects(); // Refresh the projects list
      } catch (error) {
        setError("Failed to delete project. Please try again.");
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleEdit = (projectId) => {
    // Make sure we're using the correct route that matches the route defined in your router
    navigate(`/admin/edit-project/${projectId}`);
  };

  const updateVisibleProjects = () => {
    if (!Array.isArray(projects)) {
      setVisibleProjects([]);
      return;
    }
    const lastIndex = page * projectsPerPage;
    setVisibleProjects(projects.slice(0, lastIndex));
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const loadAll = () => {
    setPage(Math.ceil(projects.length / projectsPerPage));
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MyNavbar />

      <div className="pt-16 pb-8 bg-white">
        <div className="container mx-auto px-4 mt-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Our Projects
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                Discover our ongoing and upcoming projects that make a
                difference in the Kurunegala community.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/admin/add-project")}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </button>
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
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
            >
              {/* Admin actions overlay */}
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                  onClick={() => handleEdit(project.id)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  title="Edit project"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="relative h-48">
                <img
                  src={project.image || "/api/placeholder/400/320"}
                  alt={project.projectName}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status || "Planning"}
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

                <div className="flex gap-2 w-full mt-4">
                  <button
                    onClick={() =>
                      navigate(`/admin/registerDetails/${project.id}`)
                    }
                    className="flex-1 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    View Registrations
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

        {!loading && visibleProjects.length < projects.length && (
          <div className="text-center mt-12 space-x-4">
            <button
              onClick={loadMore}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Load More
            </button>
            <button
              onClick={loadAll}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Load All
            </button>
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
