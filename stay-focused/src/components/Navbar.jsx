import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const pages = ['Home', 'ToDoList', 'ChatBot', 'Pomodoro', 'Summariser', 'TextToSpeech', 'BionicText'];

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-purple-900 p-4 font-ubuntu font-normal flex justify-between items-center">
      <div className="md:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-center">
      <img src={require('../resources/mind.png')} alt="Mind" className="h-16" />
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gradient-to-r from-black via-gray-900 to-purple-900 w-2/5 z-50">
          <div className="flex justify-end p-4">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          </div>
          <div className="flex flex-col items-start p-4">
            {pages.map(page => (
              <Link key={page} to={`/${page.toLowerCase()}`} className="text-white text-lg font-roboto">{page}</Link>
            ))}
          </div>
        </div>
      )}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
        {pages.map(page => (
                    <Link key={page} to={`/${page.toLowerCase()}`} className="text-white text-lg font-roboto hover:text-white hover:font-semibold hover:underline">
                    <span className="glow-on-hover">{page}</span>
                  </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
