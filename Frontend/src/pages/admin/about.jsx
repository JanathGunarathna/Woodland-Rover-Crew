import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import MyNavbar from "./MyNavbar";
// import poorna from "leaders/poorna.jpeg";
// import mudith from "leaders/mudith.jpg";
// import praboda from 'leaders/praboda.jpeg';

const About = () => {
  const leaders = [
    {
      name: "Poorna Madusanka",
      role: "Crew Leader",
      since: "2016",
      description: "Leading with dedication and innovation in scouting excellence.",
      image: "/images/poorna.jpeg"
    },
    {
      name: "Mudith Perera",
      role: "Assistant Crew Leader", 
      since: "2017",
      description: "Specialized in youth development and community engagement.",
      image: "/images/mudith.jpg"
    },
    {
      name: "Praboda Gamlath",
      role: "Training Coordinator",
      since: "2020",
      description: "Expert in scout craft and outdoor skills development.",
      image: "/images/praboda.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-red-60 py-16">
      <div className="container mx-auto px-4">
      <MyNavbar />
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Woodland District Rover Crew
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Established in 1928, we are one of the oldest active rover crews in Kurunegala, 
            Sri Lanka, dedicated to fostering leadership and community service.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700">
              To be the leading force in developing responsible citizens through scouting 
              excellence, fostering leadership, and maintaining our century-old legacy of 
              service in the Kurunegala region.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              To uphold and promote scouting values while actively engaging in community 
              service, developing young leaders, and continuing our rich tradition of 
              excellence in the scouting movement.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6">
            <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Heritage & Tradition</h3>
            <p className="text-gray-600">
              Proudly serving since 1928, we maintain and honor our century-old legacy 
              of scouting excellence.
            </p>
          </div>
          <div className="text-center p-6">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Leadership Development</h3>
            <p className="text-gray-600">
              We focus on nurturing young leaders through mentorship, training, and 
              hands-on experience in scout craft.
            </p>
          </div>
          <div className="text-center p-6">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
            <p className="text-gray-600">
              Our commitment to community service and local initiatives helps build 
              a stronger Kurunegala.
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 relative">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                />
                </div>
                <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{leader.role}</p>
                <p className="text-gray-600 text-sm mb-2">Since {leader.since}</p>
                <p className="text-gray-700">{leader.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Our Founder</h2>
          <div className="max-w-md mx-auto">
            <img
              src="/images/thummodara.jpeg"
              alt="Sir Thummodara"
              className="w-32 h-34 rounded-full mx-auto mb-4 shadow-lg"
            />
            <h3 className="text-xl font-semibold mb-2">Sir Thummodara</h3>
            <p className="text-gray-600 mb-4">Founder, Established in 1928</p>
            <p className="text-gray-700">
              A visionary leader who established the Woodland District Rover Crew 
              with the mission to develop young leaders and serve the community of Kurunegala.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;