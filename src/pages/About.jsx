import React from 'react';
import { FaUsers, FaRegLightbulb, FaStar } from "react-icons/fa";


const About = () => {
  return (
    <div className="animated-gradient min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 pt-16">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to GatherUp 🎉</h1>
        <p className="text-gray-600 text-lg mb-6">
          GatherUp is your one-stop platform for seamless event management. Whether you're organizing a corporate conference,
          a grand wedding, or a casual meetup, we make planning effortless and efficient.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
            <FaUsers className="text-blue-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-600">Built to connect organizers and attendees effortlessly.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
            <FaRegLightbulb className="text-yellow-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Smart & Efficient</h3>
            <p className="text-gray-600">Manage events with advanced tools and real-time insights.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
            <FaStar className="text-purple-500 text-4xl mb-3" />
            <h3 className="text-xl font-semibold mb-2">Top-notch Experience</h3>
            <p className="text-gray-600">Enjoy a smooth and premium event organizing journey.</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Why Choose GatherUp? 🤔</h2>
          <p className="text-gray-600 text-lg">
            ✨ Hassle-free event planning <br />
            🚀 Easy collaboration with team members <br />
            🎯 User-friendly and time-saving <br />
            📊 Smart analytics for better decision-making
          </p>
        </div>
      </div>
    </div>
  );
}

export default About
