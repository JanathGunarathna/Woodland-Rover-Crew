import React from 'react';

const UnauthorizedPage = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Unauthorized Access</h1>
        <p className="mt-4 text-gray-600">You don't have permission to access this page.</p>
        <button 
          onClick={() =>(window.location.href = "/login") } 
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
  export default UnauthorizedPage;