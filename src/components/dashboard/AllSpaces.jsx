
import { ClipboardIcon, EyeIcon, PencilIcon } from '@heroicons/react/outline';
import { getAllSpaces } from '@/lib/actions';
// import { getSession } from '@/lib/auth';
import Link from 'next/link';
import { getSession } from '@/app/api/auth/[...nextauth]/route';
import CopyBtn from './CopyBtn';

const AllSpaces = async() => {

  // let spaces = [];
  const session = await getSession();

    const {result, spaces} = await getAllSpaces(session.user._id);
  

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
              key={space._id}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              {/* Logo and Name */}
              <div className="flex items-center">
                <img
                  src={space.logo}
                  alt={`${space.domainName} logo`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl text-black font-semibold">{space.domainName}</h3>
                  <p className="text-sm text-gray-500">
                    {space.reviews ? space.reviews : 0} Reviews
                  </p>
                </div>
              </div>

              {/* Icons */}
              <div className="flex space-x-4">
                {/* Copy Icon */}
                <CopyBtn spacename={space.domainName}/>
                {/* Edit Icon */}
                <Link href={`spacereviews/${space._id}`}>
                <EyeIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSpaces;
