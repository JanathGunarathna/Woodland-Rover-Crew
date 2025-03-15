import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNavbar from "./loginNavbar";

const WelcomePage = () => {
  // Rest of the component remains the same
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-red-50 to-white">
      <LoginNavbar />
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {/* Logo Section */}
          <div className="flex justify-center mb-5">
            <img
              src="/images/woodland.jpg"
              alt="Woodland Rovers Logo"
              className="w-32 h-32 mb-2 border-4 rounded-xl shadow-xl object-cover"
            />
          </div>

          {/* Title Section */}
          <div className="text-center mb-6">
            <div className="text-xl font-semibold text-gray-800">
              WoodLand Rover Crew
            </div>
            <div className="text-lg text-gray-600">Welcome Back, Rovers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
