import React from "react";
import home from "../assets/home.png";
import { data } from "../assets/data";
import { testimonial } from "../assets/testimonials";
import CardComponents from "../components/CardComponents";
import Testimonial from "../components/Testimonial";

const HomePage = () => {
  return (
    <div className="main">
      {/* Upper Content */}
      <div className="ml-4 flex items-center justify-center mt-2 h-[40vh] w-[97vw] ">
        <div className="border font-primary border-gray-500 h-full w-full flex ml-8">
          {/* First child div */}
          <div className="w-[68%] bg-[#0A1F44] text-white">
            <p className="text-3xl font-extrabold ml-16 mt-10">
              “Your Trusted Partner for Every Home Need”
            </p>
            <p className="text-base font-serif ml-16 mt-6">
              Transform your home into a haven with Service Sathi — your trusted
              partner for reliable, top-notch <br /> household services. From
              meticulous cleaning to expert repairs, we deliver convenience,
              quality, and <br />
              peace of mind tailored to your unique needs. Experience the ease
              of living with professionals who care <br /> as much about your
              home as you do.
            </p>
            <button className="ml-16 mt-5 bg-[#2D64C5] text-white px-3 py-1 rounded-full">
              Discover How We Do It
              <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </div>

          {/* Second child div */}
          <div className="w-[35%] border overflow-hidden">
            <img
              src={home}
              alt="Picture"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <i className="absolute mt-8 -ml-20 fa-solid fa-magnifying-glass text-gray-600"></i>
        <input
          className="ml-16 mt-8 py-2 border border-gray-400 rounded-full text-right pr-4"
          placeholder="Search for Services"
        />
      </div>

      {/*Service Section */}
      <div className="mt-8 mb-20">
        <div>
          <p className="ml-20 font-semibold text-2xl">Services Offered</p>
        </div>
        <div className="ml-24 mt-10 flex flex-wrap gap-x-44 gap-y-12">
          {[
            "Plumbing Services",
            "House Cleaning Services",
            "Electrical Services",
            "Carpentry Services",
            "Home Maintenance Services",
            "Gardening Services",
            "Air Conditioning & Heating (HVAC) Services",
          ].map((service) => (
            <button
              key={service}
              className="border border-gray-500 bg-[#EFF6FC] text-base px-3 py-2 rounded-full whitespace-nowrap h-[48px] flex items-center justify-center"
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 mb-20">
        <div>
          <p className="ml-20 font-semibold text-2xl mb-8">Latest Picks</p>
        </div>
        <div className="flex overflow-auto ml-[4.2rem]">
          {data.map((item, index) => (
            <CardComponents
              key={index}
              name={item.name}
              price={item.price}
              button={item.button}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      <div className="ml-20 mt-5 mb-16">
        <p className="text-[#A33928] text-3xl font-bold">
          Interested in Our Subscription Plans?
        </p>
        <p className="mt-5 font-sans text-xl">
          {" "}
          Get access to exclusive benefits and regular maintenance tailored to
          your needs. Choose a plan that suits your lifestyle and let us handle
          the rest !
        </p>
        <button className="bg-[#0A1F44] text-white p-2 mt-5">
          {" "}
          View Plans{" "}
        </button>
      </div>

      <div className="ml-20 mb-10">
        <p className="font-bold text-2xl"> Customer Reviews </p>
      </div>
      <div>
        <div className="flex overflow-auto ml-[4.2rem] mb-16">
          {testimonial.map((item, index) => (
            <Testimonial
              key={index}
              name={item.name}
              rating={item.rating}
              comment={item.comment}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
