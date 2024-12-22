import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar = () => {
  const [language, setLanguage] = useState("English"); // Default language is English
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  // Handle language selection
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsOpen(false); // Close the dropdown after selection
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between sticky top-0 z-10 items-center h-20 shadow-md bg-white">
      {/* Left side */}
      <div className="flex items-center gap-7 pl-11">
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-[#2D64C5] ml-2">
            ServiceSathi
          </h1>
        </Link>
        {/* Pages */}
        <ul className="flex gap-14 ml-[20rem]">
          <li className="cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/about">About Us</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>

      <div className="pr-12 text-sm">
        <div className="relative inline-block">
          {/* Button to toggle dropdown */}
          <button
            className="bg-white text-black border-2 border-black py-1.5 pl-3 pr-1 mr-6 rounded-full focus:outline-none"
            onClick={toggleDropdown}
          >
            {language} <span className="ml-2">&#9662;</span>{" "}
            {/* Arrow for dropdown */}
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-[7rem] bg-white shadow-lg rounded-md z-10">
              <ul className="text-black">
                <li
                  className="py-2 pl-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageChange("English")}
                >
                  English
                </li>
                <li
                  className="py-2 pl-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleLanguageChange("Nepali")}
                >
                  Nepali
                </li>
              </ul>
            </div>
          )}
        </div>

        <button className="text-black py-1.5 pl-3 pr-3 rounded-full border-2 border-black text-sm">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
