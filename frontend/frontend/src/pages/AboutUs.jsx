import React from "react";

const AboutUs = () => {
  return (
    <div className="ml-5">
      <div className="h-[27vh] w-[97vw] bg-[#0A1F44] text-white mb-10 mt-6">
        <p className=" text-white  text-3xl font-extrabold ml-10 pt-5">
          {" "}
          Welcome to Service Sathi{" "}
        </p>
        <p className="text-base font-serif ml-10 mt-6">
          Every home deserves to be a haven of comfort and care. That’s why
          we’re dedicated to providing seamless, dependable household services
          that fit your lifestyle. From sparkling clean spaces to perfectly
          executed repairs, our skilled professionals ensure every job is done
          with precision and care. “Service Sathi” was founded with one goal in
          mind: to take the stress out of managing your home. With our
          personalized approach and unwavering commitment to quality, we strive
          to make your daily life easier, leaving you more time for the things
          that matter most.
        </p>
      </div>
      <div className="flex items-start">
        <div className="ml-5">
          <p className="text-xl font-bold mb-3">What Makes Us Different?</p>
          <p className="text-lg text-[#5731A4] font-bold mb-1">Expert Team:</p>
          <p className="text-base text-[#595454] mb-3">
            Handpicked, trained professionals delivering precise, high-quality
            work.
          </p>
          <p className="text-lg text-[#5731A4] font-bold mb-1">
            Customer-Centric:
          </p>
          <p className="text-base text-[#595454] mb-3">
            Services tailored to your unique needs, prioritizing your
            satisfaction.
          </p>
          <p className="text-lg text-[#5731A4] font-bold mb-1">
            Reliable & Trusted:
          </p>
          <p className="text-base text-[#595454] mb-3">
            Your home is in safe, skilled hands with Service Sathi.
          </p>
        </div>

        <div className="border border-gray-600"></div>
      </div>
    </div>
  );
};

export default AboutUs;
