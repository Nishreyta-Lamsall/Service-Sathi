import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom for navigation
import Loader from "react-spinners/ClipLoader"; // Import a loader component (adjust based on your implementation)

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State to track validation error
  const navigate = useNavigate(); // Initialize useNavigate for React Router

  const handleSubmit = () => {
    if (!email) {
      setError("Please enter your email address.");
      setTimeout(() => {
        setError(""); // Hide error after 2 seconds
      }, 2000);
      return; // Stop further execution if email is missing
    }

    setError(""); // Clear error if email is provided
    setLoading(true); // Start loading state

    // Debugging: Log start time
    const startTime = new Date();
    console.log("Request started at:", startTime.toISOString());

    // Proceed with the API request after validation
    axios
      .post(
        `http://localhost:8000/api/v1/users/forget-password`, // Ensure API_URL is correctly set
        { email },
        { withCredentials: true }
      )
      .then((response) => {
        // Debugging: Log time after response
        const endTime = new Date();
        console.log("Response received at:", endTime.toISOString());
        console.log("Request duration:", endTime - startTime, "ms");
        console.log("Response received:", response); // Debugging line to check response

        navigate(`/resetpassword?email=${encodeURIComponent(email)}`); // Redirect to reset password page
      })
      .catch((error) => {
        // Debugging: Log error response
        const errorTime = new Date();
        console.log("Error occurred at:", errorTime.toISOString());
        console.log("Error duration:", errorTime - startTime, "ms");
        console.error("Error occurred:", error); // Debugging line to print error

        // Check if error message indicates email not found
        if (error.response?.data?.message === "No user found") {
          setError("No user found with this email address.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false); // Stop loading once request is done
      });
  };

  return (
    <div className=" flex items-center justify-center flex-col border border-gray-400 mt-36 py-16 px-20 w-[50%] ml-96">
      <h1 className="text-lg mb-4 font-normal">
        Enter your email to get the code to reset password.
      </h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-[85%] mb-4 mx-auto rounded-lg text-gray-700 bg-gray-50 px-4 py-3 border-2 outline-none"
      />
      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p> // Display error message if email is missing or invalid
      )}
      <button
        onClick={handleSubmit}
        className="text-black text-sm rounded-full border-2 border-black shadow-lg px-3 py-2 mt-3"
        disabled={loading} // Disable button when loading
      >
        Submit
      </button>
      {loading && (
        <div className="mt-4">
          <Loader className="animate-spin" size={40} color="#000" />
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
