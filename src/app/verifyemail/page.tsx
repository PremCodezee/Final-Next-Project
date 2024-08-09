"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function page() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const onVerify = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      // redirect to login page after 10sec

      console.log("Response", response);
      setVerified(true);
      toast.success("Email verified successfully", { duration: 5000 });
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log("Error", error.response.data);
      toast.error("Error verifying email", { duration: 5000 });
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // const { query } = router;
    // const urlTokenTwo = query.token;
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      onVerify();
    }
  }, [token]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Link href="/login">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors">
          Go to Login Page
        </button>
      </Link>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Verify Email</h1>

        <h2
          className={`p-2 ${
            token ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-800"
          } rounded-md shadow-md`}
        >
          {token ? `${token}` : "No token found"}
        </h2>

        {verified && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold text-green-600">
              Email Verified
            </h2>
            <h3 className="text-lg text-green-400">Go to Login Page</h3>
          </div>
        )}

        {error && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold bg-red-500 text-white py-2 px-4 rounded-md shadow-md">
              Error
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
