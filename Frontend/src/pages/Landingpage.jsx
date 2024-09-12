// import React from "react";
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const LandingPage=()=>{
    return(
        <>
        <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-indigo-600">AlumniConnect</h1>
            </div>
            <div className="flex space-x-4 items-center">
              <a href="#" className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#features" className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Features
              </a>
              <a href="#mentorship" className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Mentorship
              </a>
              <a href="#contact" className="text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold">
            Connect. Collaborate. Succeed.
          </h1>
          <p className="mt-4 text-lg">
            Strengthening bonds between alumni and students of the Technical Education Department. Unlock valuable opportunities, mentorship, and guidance.
          </p>
          <a
            href="#features"
            className="mt-8 inline-block bg-white text-indigo-600 font-bold py-3 px-6 rounded-md hover:bg-indigo-50 transition duration-300"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Platform Features</h2>
            <p className="mt-4 text-lg text-gray-500">
              Empowering students with guidance from seasoned professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Centralized Alumni Database</h3>
              <p className="text-gray-600">
                Keep track of alumni's career paths, achievements, and expertise in a unified database.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Mentorship Programs</h3>
              <p className="text-gray-600">
                Connect students with experienced alumni for one-on-one mentorship sessions.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Career Guidance</h3>
              <p className="text-gray-600">
                Offer students real-world advice and career direction from those who’ve walked the path.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section id="mentorship" className="py-16 bg-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Mentorship Opportunities</h2>
          <p className="mt-4 text-lg text-gray-500">
            Alumni are eager to help you succeed. Get paired with a mentor today!
          </p>
          <a
            href="#"
            className="mt-8 inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Become a Mentee
          </a>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-extrabold">Ready to Grow Your Network?</h2>
        <p className="mt-4 text-lg">
          Join a thriving community of alumni and students. Start connecting today.
        </p>
        <Link
          to="/getstarted"
          className="mt-8 inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-indigo-400">AlumniConnect</h1>
            <p className="text-sm">© 2024 Technical Education Dept. of Rajasthan</p>
          </div>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-indigo-400 hover:text-indigo-300">LinkedIn</a>
            <a href="#" className="text-indigo-400 hover:text-indigo-300">Facebook</a>
            <a href="#" className="text-indigo-400 hover:text-indigo-300">Twitter</a>
          </div>
        </div>
      </footer>
    </div>

        </>
    )
}
export default LandingPage;
