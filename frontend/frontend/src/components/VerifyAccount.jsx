import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection
import { API_URL } from "../../server";

const VerifyAccount = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [loadingResendOtp, setLoadingResendOtp] = useState(false); // Corrected - Define loadingResendOtp state
  const navigate = useNavigate(); // React Router hook for navigation

  // Handle OTP input change and focus the next or previous input
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow single digit numbers
    if (value === "" || value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus the next input after typing a valid number
      if (value !== "" && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Handle backspace to focus the previous input when a digit is deleted
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const otpValue = otp.join(""); // Join the OTP inputs into a single string

      const response = await axios.post(
        `${API_URL}/users/verify`,
        { otp: otpValue },
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        toast.success(response.data.message); // Success message from backend
        navigate("/"); // Redirect to the home page
      } else {
        throw new Error(response.data.message); // Error message from backend
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid OTP. Please try again."; // Error handling
      toast.error(errorMessage); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoadingResendOtp(true); // Set loading to true for Resend OTP button
    try {
      // Call the API to resend the OTP
      const response = await axios.post(
        `${API_URL}/users/resent-otp`,
        {},
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        toast.success("OTP has been resent!"); // Success message from backend
      } else {
        throw new Error(response.data.message); // Error message from backend
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error in resending OTP. Please try again."; // Error handling
      toast.error(errorMessage); // Show error toast
    } finally {
      setLoadingResendOtp(false); // Reset the loading state after the API call
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-44">
      <Toaster position="top-center" /> {/* Sonner toast container */}
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Enter your OTP here!
      </h1>
      <div className="flex space-x-6 text-sm">
        {/* OTP Input Fields */}
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text" // Use text input to apply maxLength
            maxLength={1} // Only one character per input
            value={value}
            onChange={(e) => handleChange(e, index)} // Handle input change
            onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace
            className="w-16 h-16 text-3xl font-bold text-center bg-white border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
          />
        ))}
      </div>
      <div className="flex items-center space-x-6 mt-6">
        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading} // Disable button when loading
          className={`px-4 py-2 rounded-full shadow-lg focus:outline-none transition-all duration-300 ${
            loading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* Resend OTP Button */}
        <button
          onClick={handleResendOtp}
          disabled={loadingResendOtp} // Disable the button when loading
          className={`px-4 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 focus:outline-none transition-all duration-300 ${
            loadingResendOtp
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "hover:bg-red-700"
          }`}
        >
          {loadingResendOtp ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyAccount;
