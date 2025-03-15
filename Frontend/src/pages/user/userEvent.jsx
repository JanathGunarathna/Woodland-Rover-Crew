import React, { useState } from 'react';
import MyNavbar from './MyUserNavbar';
import { Calendar, MapPin, Clock, Users, ArrowRight, AlertCircle } from 'lucide-react';
import { Dialog } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';

const Event = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Annual Scout Leadership Camp",
      date: "June 15-20, 2024",
      time: "8:00 AM - 5:00 PM",
      location: "Woodland Scout Center, Kurunegala",
      category: "Leadership",
      description: "A 5-day intensive leadership development program featuring outdoor activities, team challenges, and skill-building workshops.",
      image: "/images/event1.jpg",
      capacity: 50,
      registered: 35,
      registration_deadline: "June 1, 2024",
      price: "Rs. 2500",
      highlights: [
        "Leadership skill development",
        "Team building activities",
        "Outdoor survival skills",
        "First aid training",
        "Community service project"
      ]
    },
    {
      id: 2,
      title: "Environmental Conservation Workshop",
      date: "July 8, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Ethagala Forest Reserve",
      category: "Environment",
      description: "Join us for a day of environmental conservation activities and learn about sustainable practices.",
      image: "/images/event2.jpg",
      capacity: 30,
      registered: 12,
      registration_deadline: "July 1, 2024",
      price: "Rs. 1000",
      highlights: [
        "Tree planting session",
        "Wildlife conservation talk",
        "Recycling workshop",
        "Nature photography",
        "Environmental impact assessment"
      ]
    },
    {
      id: 3,
      title: "Community First Aid Training",
      date: "July 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "City Hall, Kurunegala",
      category: "Training",
      description: "Essential first aid training for community members and scouts, certified by the Red Cross.",
      image: "/images/event3.jpg",
      capacity: 40,
      registered: 25,
      registration_deadline: "July 10, 2024",
      price: "Rs. 1500",
      highlights: [
        "Basic life support",
        "Emergency response",
        "Wound care",
        "CPR certification",
        "Practical scenarios"
      ]
    }
  ];

  const openRegistration = (event) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
  };

  const RegistrationDialog = ({ isOpen, onClose, event }) => {
    if (!event) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <h3 className="text-2xl font-bold mb-4">Register for {event.title}</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" className="mt-1 w-full p-2 border rounded-md" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 w-full p-2 border rounded-md" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" className="mt-1 w-full p-2 border rounded-md" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input type="number" className="mt-1 w-full p-2 border rounded-md" required />
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-4">
                  Registration fee: {event.price}
                </p>
                
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Confirm Registration
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MyNavbar />
      
      {/* Header Section */}
      <div className="pt-16 pb-8 bg-white">
        <div className="container mx-auto px-4 mt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Join us in our upcoming events and activities. Register early to secure your spot!
          </p>
        </div>
      </div>

      {/* Event Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            All Events
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            Leadership
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            Training
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            Environment
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                {/* Event Image */}
                <div className="md:w-2/5">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Event Content */}
                <div className="md:w-3/5 p-6">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-blue-600">{event.category}</span>
                    <h3 className="text-xl font-semibold text-gray-900 mt-1">{event.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-4">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.registered}/{event.capacity} Registered</span>
                    </div>
                  </div>

                  {/* Registration Status and Button */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Registration Deadline:</span>
                      <span className="text-sm font-medium">{event.registration_deadline}</span>
                    </div>
                    
                    {event.registered < event.capacity ? (
                      <button
                        onClick={() => openRegistration(event)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        Register Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg flex items-center justify-center cursor-not-allowed"
                      >
                        Event Full
                        <AlertCircle className="w-4 h-4 ml-2" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Dialog */}
      <RegistrationDialog
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        event={selectedEvent}
      />

      {/* Footer */}
      <footer className="bg-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Woodland District Rover Crew. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Event;