import React from 'react'

const Testimonial = ({ id, name, rating, image, comment }) => {
  return (
    <div className="flex items-start p-4 rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Avatar */}
      <img
        className="rounded-full w-16 h-16 object-cover"
        src={image}
        alt={name}
      />

      {/* Content */}
      <div className="ml-4">
        {/* Name */}
        <p className="font-bold text-lg text-gray-800">{name}</p>

        {/* Star Rating */}
        <div className="flex items-center mt-1 text-yellow-500">
          {rating}
        </div>

        {/* Comment */}
        <p className="text-sm text-gray-600 mt-2">{comment}</p>
      </div>
    </div>
  );
};

export default Testimonial