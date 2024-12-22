import React from 'react'
import facebook from "../assets/facebook.png"
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";

const Footer = () => {
  return (
    <div className="h-[35vh] bg-[#0A1F44] flex justify-center items-center">
      {/* Container for all the contents */}
      <div className="flex justify-between items-start w-full max-w-7xl px-2 -mt-14">
        {/* Left Section */}
        <div>
          <p className="text-white text-3xl font-bold">Service Sathi</p>
        </div>

        {/* Middle Section */}
        <div className="text-white underline -ml-32">
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="text-white -ml-32 -mr-32">
          <ul>
            <li>+977 9876445678</li>
            <li>Balaju, Kathmandu</li>
            <li className="ml-12">Nepal</li>
          </ul>
        </div>

        {/* Input Section */}
        <div>
          <input
            className="border border-gray-500 bg-slate-50 py-7 px-20 rounded-lg text-sm"
            placeholder="Write your reviews"
          />
        </div>
        <div className="flex w-6 h-6 space-x-3 mt-7 mr-10 -ml-36">
          <img src={instagram} alt="instagram" />
          <img src={facebook} alt="facebook" />
          <img src={twitter} alt="twitter" />
          <img src={linkedin} alt="linkedin" />
        </div>
      </div>

      <div className="block mt-14 relative">
        <button className="absolute px-2 py-1 bg-[#1F468B] text-white rounded-lg -ml-[14.5rem] text-sm">
          Submit
        </button>
        <hr className='absolute h-3 border-red-300'/>
        <p className='absolute -ml-[48rem] mt-12 font-regular text-sm text-slate-100'> © 2024 Service Sathi. All rights reserved.  </p>
      </div>
    </div>
  );
}

export default Footer