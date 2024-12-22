import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner"; // Import toast for notifications

const Register = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Spread the existing form data
      [name]: value, // Update the specific field
    });
  };

  const validateForm = () => {
    let formErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    // Username validation
    if (!formData.username) {
      toast.error("Please enter username"); // Show toast error for username
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formData.email) {
      toast.error("Please enter email"); // Show toast error for email
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address"); // Show toast error for invalid email
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      toast.error("Please enter password"); // Show toast error for password
      isValid = false;
    } else if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long"); // Show toast error for short password
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      toast.error("Please confirm your password"); // Show toast error for confirm password
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      toast.error("Passwords do not match"); // Show toast error for password mismatch
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before proceeding
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies and credentials
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.text(); // Use .text() to handle empty response body
        const errorMessage = errorResponse
          ? errorResponse
          : "Registration failed. Please try again.";

        // Show toast for server-side error (e.g., "Email already exists")
        if (errorMessage.includes("Email already exists")) {
          toast.error("Email already exists");
        } else {
          toast.error(errorMessage);
        }

        throw new Error(errorMessage);
      }

      const data = await response.json(); // Only call .json() if the response is valid JSON
      console.log("Registration successful:", data);

      // Check if the user is verified
      if (data.isVerified) {
        navigate("/home"); // Redirect to the home page if already verified
      } else {
        // Show a confirmation message or any necessary feedback before redirecting
        toast.success("Registration successful! Please verify your account.");

        // Set a timeout to redirect to the VerifyAccount page after 2 seconds
        setTimeout(() => {
          localStorage.setItem("isRegistered", "true"); // Store registration status
          navigate("/verifyaccount"); // Redirect to the verify account page
        }, 2000); // 2000 milliseconds = 2 seconds
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Optional: Display error feedback to the user
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="border font-primary border-gray-500 -mt-16 h-[30rem] w-[40rem] flex">
        {/* First child div */}
        <div className="flex-1 bg-[#0A1F44] text-white text-5xl flex flex-col items-center justify-center">
          {/* Text Section */}
          <div className="flex-grow flex items-center justify-center">
            <p className="text-[2rem] -mt-20">
              Welcome <br />
              <span className="inline-block mt-3">to Service Sathi</span>
            </p>
          </div>
        </div>
        {/* Second child div */}
        <div className="flex-1 border">
          <div className="text-center mt-8">
            <p className="text-3xl font-medium"> Signup </p>
          </div>
          <div className="text-sm ml-10 mt-5 text-slate-900">
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <label htmlFor="username" className="block">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="px-3 py-1 w-60 mt-2 border text-gray-800 border-black"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}

              {/* Email */}
              <label htmlFor="email" className="block mt-4">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-3 py-1 w-60 mt-2 border text-gray-800 border-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              {/* Password */}
              <label htmlFor="password" className="block mt-4">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="px-3 py-1 w-60 mt-2 border text-gray-800 border-black"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              {/* Confirm Password */}
              <label htmlFor="confirmPassword" className="block mt-4">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="px-3 py-1 w-60 mt-2 border text-gray-800 border-black"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-1 mt-4 ml-20 border bg-[#2D64C5] rounded-3xl text-white"
              >
                {loading ? "Submitting..." : "Signup"}
              </button>
            </form>
            <div className="mt-5 ml-5">
              <p className="text-black">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#2D64C5] underline cursor-pointer hover:text-blue-800"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add the Toaster component */}
      <Toaster />
    </div>
  );
};

export default Register;
