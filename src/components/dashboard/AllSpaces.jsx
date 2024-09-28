'use client';

import React from 'react';
import { ClipboardIcon, PencilIcon } from '@heroicons/react/outline';

// Mock data
const spaces = [
  {
    id: 1,
    name: 'Space One',
    reviews: 23,
    logo: 'https://via.placeholder.com/50', // Placeholder image
  },
  {
    id: 2,
    name: 'Space Two',
    reviews: 15,
    logo: 'https://via.placeholder.com/50',
  },
];

const AllSpaces = () => {
  return (
    <div className="container mx-auto">
      {spaces.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            No Space Found
          </h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex items-center">
            <span className="mr-2">Create Your First Space</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              {/* Logo and Name */}
              <div className="flex items-center">
                <img
                  src={space.logo}
                  alt={`${space.name} logo`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{space.name}</h3>
                  <p className="text-sm text-gray-500">
                    {space.reviews} Reviews
                  </p>
                </div>
              </div>

              {/* Icons */}
              <div className="flex space-x-4">
                {/* Copy Icon */}
                <ClipboardIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
                {/* Edit Icon */}
                <PencilIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSpaces;
