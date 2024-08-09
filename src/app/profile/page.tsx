"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const logout = async () => {
    try {
      toast.success("Logout successful", { duration: 5000 });
      router.push("/logout");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, { duration: 5000 });
    }
  };

  const getUserDetails = async () => {
    const res = await axios.post("/api/users/me");
    console.log(res.data);
    setData(res.data.user._id);
    setUsername(res.data.user.username);
    setEmail(res.data.user.email);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-6">
        <h1 className="text-4xl font-bold text-white mb-4">Profile</h1>
        <hr className="border-t border-gray-700 w-full mb-4" />
        <p className="text-gray-400 mb-8">Profile page</p>
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">
            {data === "nothing" ? (
              "Nothing"
            ) : (
              <>
                <Link
                  href={`/profile/${data}`}
                  className="text-blue-500 text-lg hover:text-blue-400 underline"
                >
                  {data} <span className="text-sm text-green-600">Click</span>
                </Link>
                <div className="mt-2 text-gray-300">
                  <h1 className="text-xl">{username}</h1>
                  <h2 className="text-lg">{email}</h2>
                </div>
              </>
            )}
          </h2>
        </div>
        <hr className="border-t border-gray-700 w-full mt-8 mb-4" />
        <div className="space-y-4">
          <button
            onClick={logout}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-colors duration-300"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors duration-300"
          >
            Get User Details
          </button>
        </div>
      </div>
    </>
  );
}
