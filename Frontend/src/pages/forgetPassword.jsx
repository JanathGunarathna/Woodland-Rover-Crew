import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import LoginNavbar from "./loginNavbar";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to send OTP here
    navigate("/OtpPage");
  };

  return (
    <div className="min-h-screen bg-red-60 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-5">
          <img
            src="/images/woodland.jpg"
            alt="Woodland Rovers Logo"
            className="w-32 h-32 mb-2 border-4 rounded-xl shadow-xl object-cover"
          />
        </div>

        <div className="text-center mb-6">
          <div className="text-lg font-semibold text-gray-800">Forgot Password</div>
          <div className="text-base text-gray-600">Enter your email to receive an OTP</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-inp">
            <input
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Send OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;