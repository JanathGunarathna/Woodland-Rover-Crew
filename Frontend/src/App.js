import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page imports
import Home from './pages/admin/Home';
import UserHome from './pages/user/userHome';
import About from './pages/admin/about';
import UserAbout from './pages/user/userAbout';
import Project from './pages/admin/project';
import AddProject from './pages/admin/addProject';
import EditProject from './pages/admin/editProject';
//import AddEvent from './pages/admin/addEvent';
import UserProject from './pages/user/project';
import Event from './pages/admin/event';
import UserEvent from './pages/user/userEvent';
import Contact from './pages/admin/contact';
import UserContact from './pages/user/userContact';
import UserProfile from './pages/user/userProfile';
import CreateAccount from './pages/createAccount';
import Login from './pages/login';
import ForgetPassword from './pages/forgetPassword';
import OtpPage from './pages/otp';
import LoginNavbar from './pages/loginNavbar';
import './index.css';
import WelcomePage from './pages/welcome';
import ProjectRegister from './pages/user/eventRegister';
import RegistrationDetails from './pages/admin/registrationDetails';

const baseUrl = "http://localhost:5000/api";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-red-60 py-16">
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
          {!['/login', '/create-account', '/forgetPassword', '/OtpPage'].includes(window.location.pathname) && <LoginNavbar />}
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<WelcomePage/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/OtpPage" element={<OtpPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Home />} />
            <Route path="/admin/about" element={<About />} />
            <Route path="/admin/project" element={<Project />} />
            <Route path="/admin/event" element={<Event />} />
            <Route path="/admin/contact" element={<Contact />} />
            <Route path="/admin/add-project" element={<AddProject />} />
            <Route path="/admin/edit-project/:id" element={<EditProject />} />
            {/* <Route path="/admin/add-event" element={<AddEvent />} /> */}
            <Route path ='/admin/registerDetails/:id' element={<RegistrationDetails />} />

            {/* User Routes */}
            <Route path="/user" element={<UserHome />} />
            <Route path="/user/about" element={<UserAbout />} />
            <Route path="/user/project" element={<UserProject />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/event" element={<UserEvent />} />
            <Route path="/user/contact" element={<UserContact />} />
            <Route path="/user/ProjectRegister/:projectId" element={<ProjectRegister />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
export { baseUrl };