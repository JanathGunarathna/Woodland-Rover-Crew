import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyNavbar from './MyNavbar';
import { Download, Filter, Search, Users, ChevronDown, ChevronUp, FileText, Clipboard, ArrowLeft } from 'lucide-react';

const RegistrationDetails = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [showProjectStats, setShowProjectStats] = useState(false);
  const [projectStats, setProjectStats] = useState([]);
  
  // Fetch registrations and projects on component mount
  useEffect(() => {
    fetchData();
  }, []);
  
  // Calculate project statistics whenever registrations change
  useEffect(() => {
    if (registrations.length > 0 && projects.length > 0) {
      calculateProjectStats();
    }
  }, [registrations, projects]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all registrations
      const registrationsResponse = await axios.get('http://localhost:8000/api/register');
      const registrationsData = registrationsResponse.data?.data || [];
      
      // Fetch all projects to get their names
      const projectsResponse = await axios.get('http://localhost:8000/api/project');
      const projectsData = projectsResponse.data?.data || projectsResponse.data || [];
      
      setRegistrations(registrationsData);
      setProjects(projectsData);
      
      setError(null);
    } catch (err) {
      setError('Failed to load registration data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateProjectStats = () => {
    // Create a map to hold statistics for each project
    const stats = projects.map(project => {
      const projectRegistrations = registrations.filter(reg => reg.projectId == project.id);
      
      // Count registrations by scout level
      const byScoutLevel = {
        junior: projectRegistrations.filter(reg => reg.scoutLevel === 'junior').length,
        senior: projectRegistrations.filter(reg => reg.scoutLevel === 'senior').length,
        rover: projectRegistrations.filter(reg => reg.scoutLevel === 'rover').length,
        leader: projectRegistrations.filter(reg => reg.scoutLevel === 'leader').length
      };
      
      // Count registrations by payment method
      const byPaymentMethod = {
        cash: projectRegistrations.filter(reg => reg.paymentMethod === 'cash').length,
        bank: projectRegistrations.filter(reg => reg.paymentMethod === 'bank').length,
        online: projectRegistrations.filter(reg => reg.paymentMethod === 'online').length
      };
      
      // Count registrations by status
      const byStatus = {
        pending: projectRegistrations.filter(reg => reg.status === 'pending').length,
        confirmed: projectRegistrations.filter(reg => reg.status === 'confirmed').length,
        cancelled: projectRegistrations.filter(reg => reg.status === 'cancelled').length
      };
      
      // Calculate total amount collected
      const totalAmount = projectRegistrations.reduce((sum, reg) => sum + parseFloat(reg.paymentAmount || 0), 0);
      
      return {
        id: project.id,
        name: project.projectName,
        totalRegistrations: projectRegistrations.length,
        byScoutLevel,
        byPaymentMethod,
        byStatus,
        totalAmount
      };
    });
    
    setProjectStats(stats);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedRegistrations = () => {
    let sortableItems = [...registrations];
    
    // Filter by project if a project is selected
    if (selectedProject !== 'all') {
      sortableItems = sortableItems.filter(item => item.projectId == selectedProject);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      sortableItems = sortableItems.filter(item => 
        (item.fullName && item.fullName.toLowerCase().includes(term)) ||
        (item.school && item.school.toLowerCase().includes(term)) ||
        (item.contactNumber && item.contactNumber.includes(term))
      );
    }
    
    // Sort the filtered items
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableItems;
  };

  const getProjectNameById = (projectId) => {
    const project = projects.find(p => p.id == projectId);
    return project ? project.projectName : 'Unknown Project';
  };

  const exportToCSV = () => {
    const sortedRegistrations = getSortedRegistrations();
    if (sortedRegistrations.length === 0) return;
    
    // Create CSV headers
    const headers = [
      'ID', 'Project Name', 'Full Name', 'School', 'Contact Number', 
      'Scout Level', 'Payment Method', 'Amount', 'Status', 'Registration Date'
    ];
    
    // Map registrations to CSV rows
    const csvData = sortedRegistrations.map(reg => [
      reg.id,
      getProjectNameById(reg.projectId),
      reg.fullName,
      reg.school,
      reg.contactNumber,
      reg.scoutLevel,
      reg.paymentMethod,
      reg.paymentAmount,
      reg.status,
      new Date(reg.createdAt).toLocaleDateString()
    ]);
    
    // Combine headers and data
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    // Create a Blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'registration-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sortedRegistrations = getSortedRegistrations();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <MyNavbar />
      
      <div className="container mx-auto px-4 py-8 mt-8">
        <button 
          onClick={() => navigate('/admin/project')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Project Management
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Registration Details</h1>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => setShowProjectStats(!showProjectStats)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {showProjectStats ? 'Show Registrations' : 'Show Project Stats'}
                </button>
                
                <button
                  onClick={exportToCSV}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
            
            {!showProjectStats && (
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="md:w-1/3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by name, school, or contact..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                    >
                      <option value="all">All Projects</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.projectName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {showProjectStats ? (
              <div className="overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">Project Registration Statistics</h2>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider border-b">Project Name</th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600 uppercase tracking-wider border-b">Total Registrations</th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600 uppercase tracking-wider border-b">Scout Levels</th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600 uppercase tracking-wider border-b">Payment Methods</th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600 uppercase tracking-wider border-b">Status</th>
                      <th className="py-3 px-4 text-right font-medium text-gray-600 uppercase tracking-wider border-b">Total Amount (LKR)</th>
                      <th className="py-3 px-4 text-center font-medium text-gray-600 uppercase tracking-wider border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectStats.map((stat) => (
                      <tr key={stat.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">{stat.name}</td>
                        <td className="py-3 px-4 text-center border-b">{stat.totalRegistrations}</td>
                        <td className="py-3 px-4 text-center border-b">
                          <div className="flex flex-col text-sm">
                            <span>Junior: {stat.byScoutLevel.junior}</span>
                            <span>Senior: {stat.byScoutLevel.senior}</span>
                            <span>Rover: {stat.byScoutLevel.rover}</span>
                            <span>Leader: {stat.byScoutLevel.leader}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center border-b">
                          <div className="flex flex-col text-sm">
                            <span>Cash: {stat.byPaymentMethod.cash}</span>
                            <span>Bank: {stat.byPaymentMethod.bank}</span>
                            <span>Online: {stat.byPaymentMethod.online}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center border-b">
                          <div className="flex flex-col text-sm">
                            <span>Pending: {stat.byStatus.pending}</span>
                            <span>Confirmed: {stat.byStatus.confirmed}</span>
                            <span>Cancelled: {stat.byStatus.cancelled}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right border-b">
                          {stat.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-center border-b">
                          <button 
                            onClick={() => {
                              setSelectedProject(stat.id.toString());
                              setShowProjectStats(false);
                            }}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                    {projectStats.length === 0 && (
                      <tr>
                        <td colSpan="7" className="py-8 text-center text-gray-500">
                          No statistics available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
                <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th 
                        className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider border-b cursor-pointer"
                        onClick={() => handleSort('fullName')}
                      >
                        Full Name {sortConfig.key === 'fullName' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </th>
                      <th 
                        className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider border-b cursor-pointer"
                        onClick={() => handleSort('school')}
                      >
                        School {sortConfig.key === 'school' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </th>
                      <th 
                        className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider border-b cursor-pointer"
                        onClick={() => handleSort('contactNumber')}
                      >
                        Contact Number {sortConfig.key === 'contactNumber' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </th>
                      <th 
                        className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider border-b cursor-pointer"
                        onClick={() => handleSort('scoutLevel')}
                      >
                        Scout Level {sortConfig.key === 'scoutLevel' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </th>
                      <th 
                        className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider border-b cursor-pointer"
                        onClick={() => handleSort('paymentMethod')}
                      >
                        Payment Method {sortConfig.key === 'paymentMethod' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </th>
                      <th 
                        className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider border-b cursor-pointer"
                        onClick={() => handleSort('paymentAmount')}
                      >
                        Amount {sortConfig.key === 'paymentAmount' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </th>
                      <th 
                        className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider border-b cursor-pointer"
                        onClick={() => handleSort('status')}
                      >
                        Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </th>
                      <th 
                        className="py-3 px-4 text-left font-medium text-gray-600 uppercase tracking-wider border-b cursor-pointer"
                        onClick={() => handleSort('createdAt')}
                      >
                        Registration Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedRegistrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 border-b">{reg.fullName}</td>
                        <td className="py-3 px-4 border-b">{reg.school}</td>
                        <td className="py-3 px-4 border-b">{reg.contactNumber}</td>
                        <td className="py-3 px-4 border-b">{reg.scoutLevel}</td>
                        <td className="py-3 px-4 border-b">{reg.paymentMethod}</td>
                        <td className="py-3 px-4 border-b">{reg.paymentAmount}</td>
                        <td className="py-3 px-4 border-b">{reg.status}</td>
                        <td className="py-3 px-4 border-b">{new Date(reg.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {sortedRegistrations.length === 0 && (
                      <tr>
                        <td colSpan="8" className="py-8 text-center text-gray-500">
                          No registrations found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;