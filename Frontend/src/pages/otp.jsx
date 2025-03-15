import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import LoginNavbar from "./loginNavbar";

const OtpPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your OTP verification logic here
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-red-60 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-end">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-lg font-semibold text-gray-800">OTP Verification</div>
          <div className="text-base text-gray-600">Please enter the code we have sent you.</div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <input
            type="tel"
            maxLength={1}
            className="w-12 h-12 border border-gray-300 rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            maxLength={1}
            className="w-12 h-12 border border-gray-300 rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            maxLength={1}
            className="w-12 h-12 border border-gray-300 rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            maxLength={1}
            className="w-12 h-12 border border-gray-300 rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Verify
        </button>

        <div className="text-center mt-4">
          <span className="text-gray-600">You don't receive the code?</span>
          <a href="#" className="text-blue-600 hover:underline ml-2">
            Resend
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;