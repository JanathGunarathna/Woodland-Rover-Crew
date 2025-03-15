import React from "react";
import MyNavbar from "./MyUserNavbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-red-60 py-16">
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <MyNavbar />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Logo and Primary Navigation Section */}
          <div className="flex flex-col items-center mb-12">
            {/* Updated image source to use local image */}
            <img
              src="/images/woodland.jpg"
              alt="Woodland Rovers Logo"
              className="w-32 h-32 mb-6 rounded-full shadow-lg object-cover"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Woodland District Rover Crew
            </h1>
            <nav className="bg-white rounded-full shadow-md px-8 py-3 w-full max-w-4xl">
              <ul className="flex justify-center space-x-12">
                <li>
                  <a
                    href="/"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/project"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Project
                  </a>
                </li>
                <li>
                  <a
                    href="/event"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Event
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden mb-16">
            <img
              src="\images\rover.jpg"
              alt="Scouting Activities"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
              <h2 className="text-4xl font-bold mb-4">
                Welcome to Woodland District Rover Crew
              </h2>
              <p className="text-xl mb-8">
                Serving Since 1928 | Kurunegala, Sri Lanka
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full 
                             transform transition hover:-translate-y-1 shadow-lg"
                type="button"
                onClick={() => (window.location.href = "/contact")}
              >
                Join Our Crew
              </button>
            </div>
          </div>

          {/* Legacy Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Our Legacy of Leadership
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Established in 1928, the Woodland District Rover Crew stands as
              one of the oldest active rover crews in Kurunegala, Sri Lanka. We
              are dedicated to fostering leadership, community service, and the
              timeless values of scouting. Through our various activities and
              initiatives, we continue to shape responsible citizens and honor
              our century-old tradition of excellence in scouting.
            </p>
          </div>

          {/* Quick Links or Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-3">Activities</h4>
              <p className="text-gray-600">
                Explore our regular scouting activities and community service
                projects.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-3">Events</h4>
              <p className="text-gray-600">
                Stay updated with our upcoming events and gatherings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-3">Join Us</h4>
              <p className="text-gray-600">
                Learn how to become a part of our prestigious crew.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 mt-16 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
            <p>© 2024 Woodland District Rover Crew. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
