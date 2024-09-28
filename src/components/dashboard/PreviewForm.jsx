'use client'
import { useState } from "react";

const PreviewForm = ({ data, logoPreview }) => {

    const [rating, setRating] = useState(0); // Track the current rating
  const [hover, setHover] = useState(null);

    return (
      <div className="p-4 space-y-6">
        {/* Logo */}
        {logoPreview && (
          <div className="flex justify-center">
            <img src={logoPreview} alt="Logo" className="w-32 h-32 object-cover rounded-md" />
          </div>
        )}
  
        {/* Heading */}
        {data.heading && (
          <h2 className="text-2xl font-bold text-center text-black">{data.heading}</h2>
        )}
  
        {/* Message */}
        {data.message && (
          <p className="text-center text-gray-600">{data.message}</p>
        )}
  
        {/* Questions */}
        <div>
          {data.questions.map((q, index) => (
            <div key={index} className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                {q.question}
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
        </div>
  
        {/* Star Rating */}
        <div className="flex justify-center space-x-2">
      {/* Create 5 stars for the rating */}
      {Array.from({ length: 5 }).map((_, i) => {
        const ratingValue = i + 1;

        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 cursor-pointer ${ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
            fill="currentColor" // Change to 'currentColor' for proper color fill based on classes
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={() => setRating(ratingValue)} // Set the rating when clicked
            onMouseEnter={() => setHover(ratingValue)} // Set hover effect
            onMouseLeave={() => setHover(null)} // Remove hover effect when not hovering
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3l1.55 4.53L18 9l-3.9 2.85L15.1 16 12 12.9 8.9 16 9.9 11.9 6 9l4.45-.47L12 3z"
            />
          </svg>
        );
      })}
      {/* Optional: Display the current rating value */}
      <p className="ml-2 text-gray-700">{rating} out of 5 stars</p>
    </div>
  
        {/* Write a Review */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Write a Review
          </label>
          <textarea className="w-full mt-2 p-2 border border-gray-300 rounded-lg"></textarea>
        </div>
  
        {/* Extra Info */}
        <div className="mt-4">
          {data.extraInfo.includes('name') && (
            <div className="mt-4">
              <label className="block text-sm font-medium">Name</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
            </div>
          )}
          {data.extraInfo.includes('email') && (
            <div className="mt-4">
              <label className="block text-sm font-medium">Email</label>
              <input type="email" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
            </div>
          )}
          {data.extraInfo.includes('social') && (
            <div className="mt-4">
              <label className="block text-sm font-medium">Social Link</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
            </div>
          )}
          {data.extraInfo.includes('number') && (
            <div className="mt-4">
              <label className="block text-sm font-medium">Phone Number</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-lg" />
            </div>
          )}
        </div>
  
        {/* Submit Button */}
        <div className="mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
            Submit
          </button>
        </div>
      </div>
    );
  };
  
  export default PreviewForm;
  