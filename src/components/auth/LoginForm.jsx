"use client"; 

import { signIn } from "next-auth/react";

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Sign In</h2>

        <div className="mb-4">
          <button
            className="bg-black text-white w-full py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300 mb-4"
            onClick={() => signIn("github")}
          >
            Sign in with GitHub
          </button>

          <button
            className="bg-red-500 text-white w-full py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </button>
        </div>

        <div className="text-center text-gray-600">
          <p>By signing in, you agree to our terms and policies.</p>
        </div>
      </div>
    </div>
  );
}
