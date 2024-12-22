import React from "react";

const CardComponents = ({ image, name, price, id, button }) => {
  return (
    <div className="min-w-[180px] p-4 rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
      <img
        className="rounded-lg w-full h-auto object-cover"
        src={image}
        alt={name}
      />
      <div className="mt-3 px-2">
        <p className="font-bold text-base text-gray-800">{name}</p>
        <p className="font-semibold text-sm text-[#C127AC] mt-1">{price}</p>
        <button className="mt-3 bg-[#1F468B] text-white text-sm font-semibold py-2 rounded-full w-full hover:bg-[#163d6b] transition-all">
          {button}
        </button>
      </div>
    </div>
  );
};

export default CardComponents;
